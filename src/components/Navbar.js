import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

//styles and images
import "./Navbar.css";
import CartIcon from "../assets/cart-icon.svg";

export default function Navbar() {
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <div className="navbar-title">
        <h2>Art Collection</h2>
      </div>

      <div className="navbar-links">
        <div className="cart-container">
          <img src={CartIcon} alt="cart icon" className="cart-icon" />
          <span className="items-count">0</span>
        </div>

        {!user && (
          <>
            <h3 className="login">Login</h3>
            <h3 className="register">
              <NavLink to="/signup">Register</NavLink>
            </h3>
          </>
        )}

        {user && (
          <>
            <h3 className="orders">Orders</h3>
            <h3 className="logout">Logout</h3>
          </>
        )}
      </div>
    </div>
  );
}
