import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductForm from "../components/ProductForm";

function fill(label, value) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

describe("ProductForm", () => {
  it("submits the entered values with price coerced to a number", () => {
    const onSubmit = vi.fn();
    render(<ProductForm onSubmit={onSubmit} submitLabel="Submit" />);

    fill(/coffee name/i, "Highland Roast");
    fill(/description/i, "Smooth medium roast");
    fill(/price/i, "1200");
    fill(/location/i, "Ethiopia");
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Highland Roast",
      description: "Smooth medium roast",
      price: 1200,
      location: "Ethiopia",
    });
  });

  it("shows a validation error and does not submit when invalid", () => {
    const onSubmit = vi.fn();
    render(<ProductForm onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(/valid coffee name/i);
  });

  it("prefills inputs from initialValues (edit mode)", () => {
    render(
      <ProductForm
        initialValues={{
          name: "Morning Bold",
          description: "Dark roast",
          price: 1400,
          location: "Rwanda",
        }}
        onSubmit={() => {}}
        submitLabel="Save Changes"
      />
    );
    expect(screen.getByLabelText(/coffee name/i)).toHaveValue("Morning Bold");
    expect(screen.getByLabelText(/price/i)).toHaveValue(1400);
    expect(screen.getByLabelText(/location/i)).toHaveValue("Rwanda");
  });
});
