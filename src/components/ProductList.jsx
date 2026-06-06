import ProductCard from "./ProductCard";

// Renders the grid of product cards (or an empty-state message).
function ProductList({ products }) {
  if (products.length === 0) {
    return <p className="empty-state">No products found.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
