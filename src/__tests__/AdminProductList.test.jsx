import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminProductList from "../components/AdminProductList";
import { ProductsProvider } from "../context/ProductsContext";
import * as api from "../api/products";

// Mock the API so the provider/hook don't hit a real backend.
vi.mock("../api/products");

const seed = [
  {
    id: "1",
    name: "Highland Roast",
    description: "Smooth",
    price: 1200,
    location: "Kenya",
  },
  {
    id: "2",
    name: "Morning Bold",
    description: "Bold",
    price: 1400,
    location: "Ethiopia",
  },
];

beforeEach(() => {
  vi.clearAllMocks();
  api.getProducts.mockResolvedValue(seed.map((p) => ({ ...p })));
});

afterEach(() => {
  vi.restoreAllMocks();
});

function renderList(onEdit = () => {}) {
  return render(
    <ProductsProvider>
      <AdminProductList onEdit={onEdit} />
    </ProductsProvider>
  );
}

describe("AdminProductList", () => {
  it("lists all coffees once loaded", async () => {
    renderList();
    expect(await screen.findByText("Highland Roast")).toBeInTheDocument();
    expect(screen.getByText("Morning Bold")).toBeInTheDocument();
  });

  it("calls onEdit with the product when Edit is clicked", async () => {
    const onEdit = vi.fn();
    renderList(onEdit);
    await screen.findByText("Highland Roast");

    fireEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

    expect(onEdit).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1", name: "Highland Roast" })
    );
  });

  it("deletes a coffee after the user confirms", async () => {
    api.deleteProduct.mockResolvedValue("1");
    vi.spyOn(window, "confirm").mockReturnValue(true);
    renderList();
    await screen.findByText("Highland Roast");

    fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);

    await waitFor(() => expect(api.deleteProduct).toHaveBeenCalledWith("1"));
  });

  it("does not delete when the user cancels", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    renderList();
    await screen.findByText("Highland Roast");

    fireEvent.click(screen.getAllByRole("button", { name: /delete/i })[0]);

    expect(api.deleteProduct).not.toHaveBeenCalled();
  });
});
