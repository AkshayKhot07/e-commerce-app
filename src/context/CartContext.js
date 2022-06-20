import { createContext, useReducer } from "react";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "UPDATED_ARTWORKSINVENTORY":
      return action.payload;
    case "RESET_ARTWORKSINVENTORY":
      return null;
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, null);

  console.log("CartContextProvider:", state);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
