import { Link } from "react-router-dom";

// Customer-facing coffee card: name, description, location, price + Buy Now.
function ProductCard({ product }) {
  const { id, name, description, location, price } = product;

  function handleBuy() {
    window.alert(`Thank you! You added "${name}" to your order.`);
  }

  return (
    <div className="product-card">
      <h3 className="product-card__name">
        <Link to={`/shop/${id}`}>{name}</Link>
      </h3>
      <p className="product-card__desc">{description}</p>
      <p className="product-card__origin">Location: {location}</p>
      <p className="product-card__price">KES {price}</p>
      <div className="product-card__actions">
        <button onClick={handleBuy}>Buy Now</button>
      </div>
    </div>
  );
}

export default ProductCard;
