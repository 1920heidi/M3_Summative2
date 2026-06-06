import { Link } from "react-router-dom";

// Fallback route for unknown URLs.
function NotFound() {
  return (
    <section className="not-found">
      <h2>404 — Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn">
        Go Home
      </Link>
    </section>
  );
}

export default NotFound;
