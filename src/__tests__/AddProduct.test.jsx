import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddProduct from "../pages/AddProduct";
import { ProductsProvider } from "../context/ProductsContext";
import * as api from "../api/products";

vi.mock("../api/products");

const seed = [
  {
    id: "1",
    name: "Highland Roast",
    description: "Smooth",
    price: 1200,
    location: "Kenya",
  },
];

beforeEach(() => {
  vi.clearAllMocks();
  api.getProducts.mockResolvedValue(seed.map((p) => ({ ...p })));
});

afterEach(() => {
  vi.restoreAllMocks();
});

function renderAdmin() {
  return render(
    <ProductsProvider>
      <AddProduct />
    </ProductsProvider>
  );
}

describe("Admin Portal", () => {
  it("shows the Add form by default", async () => {
    renderAdmin();
    expect(
      await screen.findByRole("heading", { name: /add coffee/i })
    ).toBeInTheDocument();
  });

  it("editing a coffee fills the TOP panel (not a second inline form)", async () => {
    api.updateProduct.mockResolvedValue({ id: "1", price: 1500 });
    renderAdmin();
    await screen.findByText("Highland Roast");

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));

    // Top panel switches to edit mode, prefilled, with a single form on screen.
    expect(
      screen.getByRole("heading", { name: /edit highland roast/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/coffee name/i)).toHaveValue("Highland Roast");
    expect(screen.getAllByLabelText(/price/i)).toHaveLength(1);

    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "1500" },
    });
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    await waitFor(() =>
      expect(api.updateProduct).toHaveBeenCalledWith(
        "1",
        expect.objectContaining({ price: 1500 })
      )
    );

    // After saving it returns to Add mode.
    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: /add coffee/i })
      ).toBeInTheDocument()
    );
  });

  it("Cancel returns to Add mode without saving", async () => {
    renderAdmin();
    await screen.findByText("Highland Roast");

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(
      screen.getByRole("heading", { name: /edit highland roast/i })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(
      screen.getByRole("heading", { name: /add coffee/i })
    ).toBeInTheDocument();
    expect(api.updateProduct).not.toHaveBeenCalled();
  });
});
