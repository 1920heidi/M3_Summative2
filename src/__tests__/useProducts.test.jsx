import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useProducts } from "../hooks/useProducts";
import * as api from "../api/products";

// Mock the whole API layer so the hook is tested in isolation.
vi.mock("../api/products");

const initial = [
  { id: 1, name: "Highland Roast", price: 1200, location: "Kenya" },
];

beforeEach(() => {
  vi.clearAllMocks();
  api.getProducts.mockResolvedValue(initial);
});

describe("useProducts", () => {
  it("READ: loads products on mount", async () => {
    const { result } = renderHook(() => useProducts());
    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.products).toEqual(initial);
  });

  it("CREATE: addProduct posts and appends the new product", async () => {
    const created = { id: 2, name: "Mouse", price: 800, image: "" };
    api.createProduct.mockResolvedValue(created);

    const { result } = renderHook(() => useProducts());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.addProduct({ name: "Mouse", price: 800, image: "" });
    });

    expect(api.createProduct).toHaveBeenCalled();
    expect(result.current.products).toHaveLength(2);
    expect(result.current.products[1]).toEqual(created);
  });

  it("UPDATE: editProduct patches and merges the change", async () => {
    api.updateProduct.mockResolvedValue({ id: 1, price: 60000 });

    const { result } = renderHook(() => useProducts());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.editProduct(1, { price: 60000 });
    });

    expect(api.updateProduct).toHaveBeenCalledWith(1, { price: 60000 });
    expect(result.current.products[0].price).toBe(60000);
  });

  it("DELETE: removeProduct deletes and drops it from state", async () => {
    api.deleteProduct.mockResolvedValue(1);

    const { result } = renderHook(() => useProducts());
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.removeProduct(1);
    });

    expect(api.deleteProduct).toHaveBeenCalledWith(1);
    expect(result.current.products).toHaveLength(0);
  });

  it("surfaces an error when the read fails", async () => {
    api.getProducts.mockRejectedValue(new Error("network down"));
    const { result } = renderHook(() => useProducts());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("network down");
  });
});
