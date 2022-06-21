import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import NavbarCart from "./NavbarCart";
import Home from "../pages/home/Home";

//styles and images
import "./Navbar.css";

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
        <div className="navbar-cart">
          <NavLink to="/cart">
            <NavbarCart />
          </NavLink>
        </div>

        {/* <div className="cart-container">
          <img src={CartIcon} alt="cart icon" className="cart-icon" />
          <span className="items-count">0</span>
        </div> */}

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
            <h3 className="orders">
              <NavLink to="/orders">Orders</NavLink>
            </h3>
            <h3 className="logout" onClick={logout}>
              Logout
            </h3>
          </>
        )}
      </div>
    </div>
  );
}
