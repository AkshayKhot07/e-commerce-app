import CartIcon from "../assets/cart-icon.svg";
import { useCartContext } from "../hooks/useCartContext";

export default function NavbarCart() {
  const { state } = useCartContext();

  console.log("Navbar Cart:", state);

  let totalCount;
  if (state) {
    totalCount = state.reduce(function (acc, obj) {
      return acc + obj.count;
    }, 0);
  }
  console.log(totalCount);

  return (
    <div className="cart-container">
      <img src={CartIcon} alt="cart icon" className="cart-icon" />
      <span className="items-count">{totalCount > 0 ? totalCount : 0}</span>
    </div>
  );
}
