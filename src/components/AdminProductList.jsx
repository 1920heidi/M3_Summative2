import { useProductsContext } from "../context/ProductsContext";

// Admin-only management list. Edit is handled by the parent (top panel) via
// onEdit; this component just lists rows and handles delete (with confirm).
function AdminProductList({ onEdit }) {
  const { products, loading, removeProduct } = useProductsContext();

  if (loading) return <p>Loading coffees...</p>;
  if (products.length === 0) {
    return <p className="empty-state">No coffees yet. Add one above.</p>;
  }

  function handleDelete(product) {
    if (window.confirm(`Delete "${product.name}"? This cannot be undone.`)) {
      removeProduct(product.id);
    }
  }

  return (
    <div className="admin-list">
      <h3>Manage Coffees</h3>
      <ul className="admin-list__items">
        {products.map((product) => (
          <li key={product.id} className="admin-list__item">
            <div className="admin-list__row">
              <span className="admin-list__name">{product.name}</span>
              <span className="admin-list__price">KES {product.price}</span>
              <span className="admin-list__location">{product.location}</span>
              <div className="admin-list__actions">
                <button onClick={() => onEdit(product)}>Edit</button>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(product)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminProductList;
