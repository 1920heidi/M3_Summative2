import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import * as api from "../api/products";

// Mock the API so routing tests don't hit a real backend.
vi.mock("../api/products");

beforeEach(() => {
  vi.clearAllMocks();
  api.getProducts.mockResolvedValue([
    {
      id: "1",
      name: "Highland Roast",
      description: "Smooth medium roast",
      price: 1200,
      location: "Kenya",
    },
  ]);
});

describe("App routing + navigation", () => {
  it("renders the Home landing page by default", async () => {
    render(<App />);
    expect(
      await screen.findByRole("heading", { name: /heidi's coffee shop/i })
    ).toBeInTheDocument();
  });

  it("navigates to the Shop page and shows fetched data", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("link", { name: /^shop$/i }));

    expect(
      screen.getByRole("heading", { name: /^shop$/i })
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText("Highland Roast")).toBeInTheDocument()
    );
  });

  it("navigates to the Admin Portal form", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Both the navbar and the hero link to the admin portal; click the navbar one.
    await user.click(
      screen.getAllByRole("link", { name: /admin portal/i })[0]
    );

    expect(
      screen.getByRole("heading", { name: /admin portal/i })
    ).toBeInTheDocument();
  });
});
