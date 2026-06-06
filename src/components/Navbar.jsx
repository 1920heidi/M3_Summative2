import { NavLink } from "react-router-dom";

// Top navigation: Home / Shop / Admin Portal, spread across the bar.
function Navbar() {
  return (
    <header className="navbar">
      <nav className="navbar__links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/admin">Admin Portal</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
