import { useCollection } from "../../hooks/useCollection";
import { ProductsList } from "./ProductsList";

//styles
import "./Home.css";

export default function Home() {
  const { documents, error } = useCollection("artworks");

  // console.log(documents);

  let products;
  if (documents) {
    products = documents.map((document) => {
      return { ...document, count: 0 };
    });
  }

  // console.log(products);

  return (
    <div className="home-container">
      {error && <p>{error}</p>}
      {products && <ProductsList products={products} />}
    </div>
  );
}
