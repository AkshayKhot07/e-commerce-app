import { useState, useEffect } from "react";
import { projectStorage } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";

import "./AddArtwork.css";

export default function AddArtwork() {
  const [artworkTitle, setArtworkTitle] = useState("");
  const [artworkPrice, setArtworkPrice] = useState("");
  const [artworkImage, setArtworkImage] = useState(null);
  const [artworkImageError, setArtworkImageError] = useState(null);
  const { addDocument, deleteDocument, response } = useFirestore("artworks");

  const handleSubmit = async (e) => {
    e.preventDefault();

    //upload artwork image to firebase storage
    const uploadPath = `artworks/${artworkImage.name}`;
    const img = await projectStorage.ref(uploadPath).put(artworkImage);
    const imgUrl = await img.ref.getDownloadURL();

    console.log(artworkTitle, artworkPrice, imgUrl);

    //add artwork to firestore
    await addDocument({
      artworkTitle,
      artworkPrice,
      photoURL: imgUrl,
      count: 0,
    });

    const artWorkFile = document.querySelector(".artwork-file");
    artWorkFile.value = null;
  };

  const handleFileChange = (e) => {
    setArtworkImage(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setArtworkImageError("Please select a file");
      return;
    }

    if (!selected.type.includes("image")) {
      setArtworkImageError("Selected file must be an image");
      return;
    }

    // if (selected.size > 100000) {
    //   setArtworkImageError("Image file must be less than 100kb");
    //   return;
    // }

    setArtworkImageError(null);
    setArtworkImage(selected);

    console.log("art work updated");
  };

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setArtworkTitle("");
      setArtworkPrice("");
      setArtworkImage(null);
    }
  }, [response.success]);

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
          {artworkImageError && (
            <div className="error">{artworkImageError}</div>
          )}
        </label>
        {response.isPending && <button disabled>Loading</button>}
        {!response.isPending && <button>Submit</button>}
      </form>
    </div>
  );
}
