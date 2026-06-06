import { useEffect, useId, useRef } from "react";

/**
 * Controlled search input.
 * - useRef: gives focus to the field as soon as the page loads.
 * - useId: generates a stable id to link the label and input (a11y).
 */
function SearchBar({ value, onChange }) {
  const inputRef = useRef(null);
  const inputId = useId();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="search-bar">
      <label htmlFor={inputId} className="search-bar__label">
        Search products
      </label>
      <input
        id={inputId}
        ref={inputRef}
        type="search"
        placeholder="Type a product name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
