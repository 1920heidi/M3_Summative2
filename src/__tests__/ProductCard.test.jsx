import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const product = {
  id: 1,
  name: "Highland Roast",
  description: "Smooth medium roast",
  price: 1200,
  location: "Kenya",
};

function renderCard() {
  return render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ProductCard", () => {
  it("renders the coffee name, description, location and price", () => {
    renderCard();
    expect(screen.getByText("Highland Roast")).toBeInTheDocument();
    expect(screen.getByText("Smooth medium roast")).toBeInTheDocument();
    expect(screen.getByText(/Location: Kenya/)).toBeInTheDocument();
    expect(screen.getByText(/KES 1200/)).toBeInTheDocument();
  });

  it("links to the product detail page", () => {
    renderCard();
    expect(
      screen.getByRole("link", { name: "Highland Roast" })
    ).toHaveAttribute("href", "/shop/1");
  });

  it("shows a Buy Now button (no admin actions)", () => {
    renderCard();
    expect(screen.getByRole("button", { name: /buy now/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /edit/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /delete/i })
    ).not.toBeInTheDocument();
  });

  it("confirms the purchase when Buy Now is clicked", () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    renderCard();
    fireEvent.click(screen.getByRole("button", { name: /buy now/i }));
    expect(alertSpy).toHaveBeenCalledWith(
      expect.stringContaining("Highland Roast")
    );
  });
});
