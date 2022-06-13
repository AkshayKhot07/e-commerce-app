import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

//styles and images
import "./Navbar.css";
import CartIcon from "../assets/cart-icon.svg";

export default function Navbar() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <div className="navbar">
      <div className="navbar-title">
        <h2>
          <NavLink exact to="/">
            Art Collection
          </NavLink>
        </h2>
      </div>

      <div className="navbar-links">
        <div className="cart-container">
          <img src={CartIcon} alt="cart icon" className="cart-icon" />
          <span className="items-count">0</span>
        </div>

        {!user && (
          <>
            <h3 className="navbar-login">
              <NavLink to="/login">Login</NavLink>
            </h3>
            <h3 className="navbar-register">
              <NavLink to="/signup">Register</NavLink>
            </h3>
          </>
        )}

        {user && (
          <>
            <h3 className="orders">Orders</h3>
            <h3 className="logout" onClick={logout}>
              Logout
            </h3>
          </>
        )}
      </div>
    </div>
  );
}
