import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  it("renders a labelled search input", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/search products/i)).toBeInTheDocument();
  });

  it("autofocuses the input on mount (useRef)", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByLabelText(/search products/i)).toHaveFocus();
  });

  it("calls onChange with the typed value", () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText(/search products/i), {
      target: { value: "laptop" },
    });
    expect(handleChange).toHaveBeenCalledWith("laptop");
  });
});
