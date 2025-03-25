import { useState, useEffect } from "react";
import "./App.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase_config.js";
import LoadingEffect from "./components/LoadingEffect.jsx";
import SearchBar from "./components/SearchBar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import FooterBar from "./components/FooterBar.jsx";

const EliminaProdotto = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productsRef = collection(db, "products");
      const querySnapshot = await getDocs(productsRef);
      const allProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id, // ID del documento
        ...doc.data(), // Dati del prodotto
      }));
      setProducts(allProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const removeProduct = (productId) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div id="products">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div id="productList">
          {loading ? (
            <LoadingEffect />
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                productId={product.id}
                productImg={product.productImg}
                productName={product.productName}
                productDescription={product.productDescription}
                productPrice={product.productPrice}
                productAmount={product.productAmount}
                prodLink={product.prodLink}
                showDeleteButton={true}
                removeProduct={removeProduct}
              />
            ))
          ) : (
            <p>Nessun prodotto trovato per &quot;{searchTerm}&quot;.</p>
          )}
        </div>
      </div>
      <FooterBar />
    </>
  );
};

export default EliminaProdotto