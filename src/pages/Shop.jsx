import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";
import { useProductsContext } from "../context/ProductsContext";
import { useDebounce } from "../hooks/useDebounce";

const LOCATIONS = ["Kenya", "Ethiopia", "Rwanda", "Ghana", "Israel"];

// Shop page: search + location filter sidebar, and a grid of coffee cards.
function Shop() {
  const { products, loading, error } = useProductsContext();
  const [search, setSearch] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const debouncedSearch = useDebounce(search, 250);

  function toggleLocation(location) {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  }

  const filtered = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());
    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(p.location);
    return matchesSearch && matchesLocation;
  });

  return (
    <section className="shop">
      <aside className="shop__sidebar">
        <SearchBar value={search} onChange={setSearch} />

        <div className="location-filter">
          <p className="location-filter__title">Filter by location</p>
          {LOCATIONS.map((location) => (
            <label key={location}>
              <input
                type="checkbox"
                checked={selectedLocations.includes(location)}
                onChange={() => toggleLocation(location)}
              />
              {location}
            </label>
          ))}
        </div>
      </aside>

      <div className="shop__main">
        <h2>Shop</h2>

        {loading && <p>Loading products...</p>}
        {error && (
          <p className="form-error" role="alert">
            Could not load products: {error}. Is the backend running
            (npm run server)?
          </p>
        )}

        {!loading && !error && <ProductList products={filtered} />}
      </div>
    </section>
  );
}

export default Shop;
