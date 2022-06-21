import { useCartContext } from "../../hooks/useCartContext";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

//styles
import "./Cart.css";

export default function Cart() {
  const { state, dispatch } = useCartContext();
  const { user } = useAuthContext();
  const { addDocument } = useFirestore("usersartworks");
  let [products, setProducts] = useState(null);
  const history = useHistory();

  if (!products) {
    products = state;
  }
  let productsTotalPrice;
  let productsFiltered;
  if (products) {
    productsFiltered = products.filter((product) => product.count > 0);
    productsTotalPrice = productsFiltered
      .map((product) => product.artworkPrice * product.count)
      .reduce((acc, current) => {
        return acc + current;
      }, 0);
  }

  console.log("CARTS Section Filtered:", {
    productsFiltered,
    uid: user.uid,
  });

  const handleClick = (e, artwork) => {
    if (e.target.innerText === "+") {
      setProducts(
        products.map((product) => {
          if (product.id === artwork.id) {
            return {
              ...product,
              count: product.count + 1,
            };
          }
          return product;
        })
      );
    }

    if (e.target.innerText === "-") {
      setProducts(
        products.map((product) => {
          if (product.id === artwork.id) {
            return {
              ...product,
              count: product.count - 1,
            };
          }
          return product;
        })
      );
    }
  };

  console.log("Carts Section Non Filtered:", products);

  //Checkout
  const handleCheckout = async () => {
    history.push("/checkout");

    if (user) {
      await addDocument({
        productsFiltered,
        orderDate: new Date().toLocaleString(),
        uid: user.uid,
      });
      setProducts(null);
      dispatch({ type: "RESET_ARTWORKSINVENTORY" });
    }
  };

  useEffect(() => {
    dispatch({
      type: "UPDATED_ARTWORKSINVENTORY",
      payload: products,
    });
  }, [products]);

  console.log("CARTS SECTION UPDATED_ARTWORKSINVENTORY:", products);

  return (
    <div className="cart-section">
      <h2>CART</h2>
      {!productsFiltered && <p>Cart is Empty...</p>}
      {productsFiltered && productsFiltered.length === 0 && (
        <p>Cart is Empty...</p>
      )}
      {productsFiltered &&
        productsFiltered.map((product) => (
          <div key={product.id} className="product-container">
            <div className="product-details">
              <img
                src={product.photoURL}
                alt="product image"
                className="product-image"
              />
              <div className="product-title-price">
                <h4 className="product-title">{product.artworkTitle}</h4>
                <p className="product-price">Price: ₹{product.artworkPrice}</p>
              </div>
            </div>

            <div className="product-cartcount">
              <button
                className="cart-minus-btn"
                onClick={(e) => handleClick(e, product)}
              >
                -
              </button>
              <span className="cart-count">{product.count}</span>
              <button
                className="cart-plus-btn"
                onClick={(e) => handleClick(e, product)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      {productsFiltered && productsFiltered.length > 0 && (
        <div className="product-total-price">
          <p>Total Price: ₹ {productsTotalPrice}</p>
          <button className="checkout-btn" onClick={handleCheckout}>
            CHECKOUT
          </button>
        </div>
      )}
    </div>
  );
}
