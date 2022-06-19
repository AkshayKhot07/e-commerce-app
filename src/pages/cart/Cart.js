import { useCartContext } from "../../hooks/useCartContext";

//styles
import "./Cart.css";

export default function Cart() {
  const { state } = useCartContext();

  let products = state;
  if (products) {
    products = products.filter((product) => product.count > 0);
  }
  console.log("CARTS Section:", products);

  return (
    <div className="cart-section">
      <h2>CART</h2>
      {!products && <p>Cart is Empty...</p>}
      {products && products.length === 0 && <p>Cart is Empty...</p>}
      {products &&
        products.map((product) => (
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
              <button className="cart-minus-btn">-</button>
              <span className="cart-count">{product.count}</span>
              <button className="cart-plus-btn">+</button>
            </div>
          </div>
        ))}
      {products && products.length > 0 && (
        <div className="product-total-price">
          <p>Total Price: ₹ 1088</p>
        </div>
      )}
    </div>
  );
}
