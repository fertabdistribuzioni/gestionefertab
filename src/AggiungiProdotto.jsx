import { useState, useRef } from "react";
import './App.css';
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase_config";
import ProductCard from "./components/ProductCard";
import FooterBar from "./components/FooterBar";
import imgPlaceHolder from "./assets/imgPlaceholder.svg"

const AggiungiProdotto = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [prodLink, setprodLink] = useState("");

  const fileInputRef = useRef(null);

  const handleReset = () => {
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductAmount("");
    setprodLink("");
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      setImage(file);
    } else {
      alert("Per favore, seleziona un file immagine.");
      setImage(null); 
    }
  };

  const convertToWebP = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => (img.src = e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const width = img.width;
        const height = img.height;

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const webpDataUrl = canvas.toDataURL("image/webp");
        fetch(webpDataUrl)
          .then((res) => res.blob())
          .then(resolve)
          .catch(reject);
      };
    });
  };

  const handleUpload = async () => {
    if (!image || !productName || !productDescription || !productPrice || !productAmount || !prodLink) {
      alert("Inserisci tutti i dati per aggiungere il prodotto!");
      return;
    }

    setLoading(true);

    try {
      const webpBlob = await convertToWebP(image);
      const formData = new FormData();
      formData.append("image", webpBlob, "image.webp");

      const apiKey = "c96f28573fabd70f90c7a87aa3379d8d";
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData, { headers: { "Content-Type": "multipart/form-data" } });

      const uploadedImageUrl = response.data.data.url;

      const productCollection = collection(db, "products");
      await addDoc(productCollection, {
        productName,
        productDescription,
        productPrice,
        productAmount,
        prodLink,
        productImg: uploadedImageUrl,
      });

      alert("Prodotto aggiunto con successo!");

      handleReset();
    } catch (error) {
      alert("Errore durante il caricamento: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNumericInput = (e, setter, allowComma = false) => {
    const value = e.target.value;
    // Se allowComma è true, consente numeri con una sola virgola (per il prezzo)
    if (allowComma) {
      if (/^\d*[,]?\d*$/.test(value)) {
        setter(value);
      }
    } else {
      // Se allowComma è false, consente solo numeri senza virgola (per il numero di pezzi)
      if (/^\d*$/.test(value)) {
        setter(value);
      }
    }
  };
  const isFormEmpty = () => {
    return !productName && !productDescription && !productPrice && !productAmount && !prodLink && !image;
  };
  const isFormFull = () => {
    return !productName || !productDescription || !productPrice || !productAmount || !prodLink || !image;
  };
  const isLoadButtonDisabled = isFormFull() || loading;

  return (
    <>
      <div id="aggiungiProdotto">
        <div id="spazioAggiunta">
          <h3>Aggiunta prodotto</h3>
          <div id="form">
            <label htmlFor="productName">Nome prodotto</label>
            <div className="descriptionedInput">
              <input type="text" id="productName" placeholder="Nome prodotto" value={productName} onChange={(e) => setProductName(e.target.value)} maxLength={30} autoComplete="off" disabled={loading} />
              <p className="smallText">{productName.length}/{30}</p>
            </div>

            <label htmlFor="productDescription">Descrizione prodotto</label>
            <div className="descriptionedInput">
              <textarea id="productDescription" placeholder="Descrizione prodotto" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} maxLength={130} autoComplete="off" disabled={loading} />
              <p className="smallText">{productDescription.length}/{130}</p>
            </div>

            <label htmlFor="productPrice">Prezzo prodotto</label>
            <input type="text" id="productPrice" placeholder="Prezzo prodotto" value={productPrice} onInput={(e) => handleNumericInput(e, setProductPrice, true)} maxLength={7} autoComplete="off" disabled={loading} />

            <label htmlFor="productAmount">Numero pezzi</label>
            <input type="text" id="productAmount" placeholder="Numero pezzi" value={productAmount} onInput={(e) => handleNumericInput(e, setProductAmount)} maxLength={6} autoComplete="off" disabled={loading} />

            <label htmlFor="prodLink">Link Amazon</label>
            <input type="url" id="prodLink" placeholder="Link Amazon" value={prodLink} onChange={(e) => setprodLink(e.target.value)} autoComplete="off" disabled={loading} />

            <label htmlFor="productImage">Immagine prodotto</label>
            <button className="secondaryButton" onClick={() => document.getElementById('productImage').click()}>
              <p className={image ? "inputImageLoaded" : ""}>{image ? image.name : "Seleziona immagine"}</p>
            </button>
            <input type="file" id="productImage" accept="image/*" onChange={handleImageChange} ref={fileInputRef} autoComplete="off" disabled={loading} />
          </div>
        </div>
        <div id="newProduct">
          <h3>Anteprima:</h3>
          <ProductCard
            key="preview"
            productImg={image ? URL.createObjectURL(image) : imgPlaceHolder} 
            productName={productName || "Nome Prodotto"}
            productDescription={productDescription || "Descrizione del prodotto"}
            productPrice={productPrice || "0.00"}
            productAmount={productAmount || "0"}
            prodLink={prodLink || "#"} 
          />
          <div id="aggiungi-annulla">
            <button className="secondaryButton" onClick={handleReset} disabled={isFormEmpty()}>Annulla</button>
            <button id="loadButton" onClick={handleUpload} disabled={isLoadButtonDisabled}>
              {loading ? "Attendere..." : "Aggiungi"}
            </button>
          </div>
        </div>
      </div>
      <FooterBar />
    </>
  );
};

export default AggiungiProdotto
