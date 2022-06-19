import { useCollection } from "../../hooks/useCollection";
import { ProductsList } from "./ProductsList";
import { useCartContext } from "../../hooks/useCartContext";

//styles
import "./Home.css";

export default function Home() {
  const { documents, error } = useCollection("artworks");
  const { state } = useCartContext();

  console.log("Home Component:", state);

  let products;
  if (state) {
    products = state;
  }
  if (documents) {
    products = documents.map((document) => {
      return { ...document, count: 0 };
    });
  }

  return (
    <div className="home-container">
      {error && <p>{error}</p>}
      {products && <ProductsList products={products} />}
    </div>
  );
}
