import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext.js";
import { CartContextProvider } from "./context/CartContext.js";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
