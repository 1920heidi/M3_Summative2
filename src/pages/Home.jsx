import { Link } from "react-router-dom";

// Landing page hero describing the store.
function Home() {
  return (
    <section className="hero">
      <h1>Heidi&apos;s Coffee Shop</h1>
      <p className="hero__subtitle">Welcome to my coffee startup company. We ship rich Grade 1 coffee from different countries to give you variety.</p>
      <div className="hero__cta">
        <Link to="/shop" className="btn">
          Shop Coffee
        </Link>
      </div>
    </section>
  );
}

export default Home;
