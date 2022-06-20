import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useCartContext } from "./hooks/useCartContext";

//pages and components
import Navbar from "./components/Navbar";
import AddArtwork from "./pages/addartwork/AddArtwork";
import Signup from "./pages/signup/Signup.js";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home.js";
import Cart from "./pages/cart/Cart.js";
import Checkout from "./pages/checkout/Checkout";

//styles
import "./App.css";

export default function App() {
  const { authIsReady, user } = useAuthContext();
  const { state } = useCartContext();

  console.log("App state:", state);

  let products;
  let productsCount;
  if (state) {
    products = state;
    productsCount = products.filter((product) => product.count > 0);
  }

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <div className="container">
            <Navbar />

            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/checkout">
                {!user && <Redirect to="/login" />}
                {user && <Checkout />}
              </Route>
              <Route path="/addartwork">
                {!user && <Redirect to="/" />}
                {user && user.uid !== "4aBmeX3p2JSfaabIr6NoiVGNsIp1" && (
                  <Redirect to="/" />
                )}
                {user && user.uid === "4aBmeX3p2JSfaabIr6NoiVGNsIp1" && (
                  <AddArtwork />
                )}
              </Route>
              <Route path="/signup">
                {user && <Redirect to="/" />}
                {user && productsCount && productsCount.length > 0 && (
                  <Redirect to="/cart" />
                )}
                {!user && <Signup />}
              </Route>
              <Route path="/login">
                {user && productsCount && productsCount.length > 0 && (
                  <Redirect to="/cart" />
                )}
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}
