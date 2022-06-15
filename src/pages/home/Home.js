import { useCollection } from "../../hooks/useCollection";

import "./Home.css";

export default function Home() {
  const { documents, error } = useCollection("artworks");

  console.log(documents);

  return (
    <div className="home-container">
      <div className="home">
        {error && <p>{error}</p>}
        {documents &&
          documents.map((document) => (
            <div key={document.id} className="artwork-container">
              <img
                src={document.photoURL}
                alt="artwork image"
                className="artwork-image"
              />
              <p className="artwork-title">{document.artworkTitle}</p>
              <div className="artwork-price-cart">
                <p className="artwork-price">₹{document.artworkPrice}</p>
                <div className="artwork-cart">
                  <button className="cart-minus-btn">-</button>
                  <span className="cart-count">0</span>
                  <button className="cart-plus-btn">+</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
