import { useParams, Link } from "react-router-dom";
import { useProductsContext } from "../context/ProductsContext";

// Customer-facing detail view for a single coffee (managed from Admin Portal).
function ProductDetail() {
  const { id } = useParams();
  const { products, loading } = useProductsContext();

  // json-server ids may be numbers or strings; compare loosely.
  const product = products.find((p) => String(p.id) === String(id));

  if (loading) return <p>Loading product...</p>;

  if (!product) {
    return (
      <section className="product-detail">
        <p>Product not found.</p>
        <Link to="/shop" className="btn">
          Back to Shop
        </Link>
      </section>
    );
  }

  function handleBuy() {
    window.alert(`Thank you! You added "${product.name}" to your order.`);
  }

  return (
    <section className="product-detail">
      <Link to="/shop" className="back-link">
        ← Back to Shop
      </Link>

      <div className="product-detail__panel">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Location: {product.location}</p>
        <p className="product-detail__price">KES {product.price}</p>
        <div className="product-detail__actions">
          <button onClick={handleBuy}>Buy Now</button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
