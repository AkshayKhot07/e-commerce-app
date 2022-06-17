import { useState, useEffect } from "react";
import { useCartContext } from "../../hooks/useCartContext";

export const ProductsList = ({ products }) => {
  const [artworks, setArtworks] = useState(products);
  const { dispatch } = useCartContext();

  const handleClick = (e, product) => {
    if (e.target.innerText === "+") {
      setArtworks(
        artworks.map((artwork) => {
          if (artwork.id === product.id) {
            return {
              ...artwork,
              count: artwork.count + 1,
            };
          }
          return artwork;
        })
      );
    }

    if (e.target.innerText === "-") {
      setArtworks(
        artworks.map((artwork) => {
          if (artwork.id === product.id && product.count > 0) {
            return {
              ...artwork,
              count: artwork.count - 1,
            };
          }
          return artwork;
        })
      );
    }
  };

  useEffect(() => {
    dispatch({
      type: "UPDATED_ARTWORKSINVENTORY",
      payload: artworks,
    });
  }, [artworks]);

  console.log(artworks);

  return (
    <div className="home-artwork">
      {artworks.map((artwork) => (
        <div key={artwork.id} className="artwork-container" id={artwork.id}>
          <img
            src={artwork.photoURL}
            alt="artwork image"
            className="artwork-image"
          />
          <p className="artwork-title">{artwork.artworkTitle}</p>
          <div className="artwork-price-cart">
            <p className="artwork-price">₹{artwork.artworkPrice}</p>

            <div className="artwork-cart">
              <button
                className="cart-minus-btn"
                onClick={(e) => handleClick(e, artwork)}
              >
                -
              </button>
              <span className="cart-count">{artwork.count}</span>
              <button
                className="cart-plus-btn"
                onClick={(e) => handleClick(e, artwork)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
