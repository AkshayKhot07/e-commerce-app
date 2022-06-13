import { useState } from "react";

import "./AddArtwork.css";

export default function AddArtwork() {
  const [artworkTitle, setArtworkTitle] = useState("");
  const [artworkPrice, setArtworkPrice] = useState("");
  const [artworkImage, setArtworkImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(artworkTitle, artworkPrice);
  };

  const handleFileChange = (e) => {
    setArtworkImage(null);
    let selected = e.target.files[0];
    console.log(selected);
  };

  return (
    <div className="add-artwork">
      <h2>Add Art Work</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Art Work Title:</span>
          <input
            type="text"
            required
            onChange={(e) => setArtworkTitle(e.target.value)}
            value={artworkTitle}
          />
        </label>
        <label>
          <span>Art Work Price:</span>
          <input
            type="number"
            required
            min="1"
            onChange={(e) => setArtworkPrice(e.target.value)}
            value={artworkPrice}
          />
        </label>
        <label>
          <span>Art Work Image:</span>
          <input
            type="file"
            required
            className="artwork-file"
            onChange={handleFileChange}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}
