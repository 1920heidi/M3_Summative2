import { useId, useState } from "react";

const LOCATIONS = ["Kenya", "Ethiopia", "Rwanda", "Ghana", "Israel"];

/**
 * Reusable coffee product form used for both "Add" and "Edit".
 * - useState: controlled inputs.
 * - useId: unique ids tying each <label> to its field.
 */
function ProductForm({
  initialValues = {
    name: "",
    description: "",
    price: "",
    location: LOCATIONS[0],
  },
  onSubmit,
  submitLabel = "Submit",
}) {
  const [name, setName] = useState(initialValues.name);
  const [description, setDescription] = useState(initialValues.description);
  const [price, setPrice] = useState(initialValues.price);
  const [location, setLocation] = useState(initialValues.location);
  const [error, setError] = useState("");

  const nameId = useId();
  const descId = useId();
  const priceId = useId();
  const locationId = useId();

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || price === "" || Number(price) < 0) {
      setError("Please enter a valid coffee name and a non-negative price.");
      return;
    }
    setError("");
    onSubmit({
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      location,
    });
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor={nameId}>Coffee Name</label>
        <input
          id={nameId}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor={descId}>Description</label>
        <textarea
          id={descId}
          rows="2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor={priceId}>Price (KES)</label>
        <input
          id={priceId}
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor={locationId}>Location</label>
        <select
          id={locationId}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          {LOCATIONS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit">{submitLabel}</button>
    </form>
  );
}

export default ProductForm;
