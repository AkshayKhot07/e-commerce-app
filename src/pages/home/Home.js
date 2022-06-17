import { useCollection } from "../../hooks/useCollection";
import { useCartContext } from "../../hooks/useCartContext";

import { ProductsList } from "./ProductsList";

import "./Home.css";

export default function Home() {
  const { documents, error } = useCollection("artworks");
  const { cartCount, dispatch } = useCartContext();
  // const [countItem, setCountItem] = useState(0);

  console.log(documents);

  let products;
  if (documents) {
    products = documents.map((document) => {
      return { ...document, count: 0 };
    });
  }

  console.log(products);

  /*
  const handleCount = (e, id) => {
    if (e.target.innerText === "+") {
      setCountItem(countItem + 1);
    }
    if (e.target.innerText === "-" && countItem > 0) {
      setCountItem(countItem - 1);
    }

    documents.map((document) => {
      if (document.id === id) {
        document.count = countItem;
      }
    });
  };
  */

  // const allArtworks = Array.from(
  //   document.querySelectorAll(".artwork-container")
  // );

  // const handleIncrement = (id, e) => {
  //   console.log(e.target);
  //   console.log(id);
  //   dispatch({ type: "CART_INCREMENT" });
  // };

  // const handleDecrement = (id, e) => {
  //   console.log(e.target);
  //   console.log(id);

  //   dispatch({ type: "CART_DECREMENT" });
  // };

  // const changeCount = (e) => {
  //   if (e == "+") {
  //     setCountItem(countItem + 1);
  //   }

  //   if (e == "-" && countItem > 0) {
  //     setCountItem(countItem - 1);
  //   }
  // };

  return (
    <div className="home-container">
      {error && <p>{error}</p>}
      {products && <ProductsList products={products} />}
    </div>
  );
}
