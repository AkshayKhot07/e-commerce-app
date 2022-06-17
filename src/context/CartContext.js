import { createContext, useReducer } from "react";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "CART_INCREMENT":
      return {
        cartCount: state.cartCount + 1,
      };
    case "CART_DECREMENT":
      return {
        cartCount: state.cartCount - 1,
      };
    case "RESET":
      return {
        cartCount: 0,
      };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartCount: 0,
  });

  console.log("CartContextProvider", state);

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
