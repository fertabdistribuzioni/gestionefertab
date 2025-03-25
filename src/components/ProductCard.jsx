import { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "/firebase_config.js";
import DeleteIcon from "../assets/deleteIcon.svg"

function handleRedirection(link) {
    window.open(link, '_blank');
}

function ProductCard({ productId, productImg, productName, productDescription, productPrice, productAmount, prodLink, removeProduct }) {
    const [loading, setLoading] = useState(false);
    const [isTextLong, setIsTextLong] = useState(false); 
    const [isExpanded, setIsExpanded] = useState(false);
    const descriptionRef = useRef(null);

    const checkIfTextIsLong = () => {
        if (descriptionRef.current) {
            const isLong = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
            setIsTextLong(isLong);
        }
    };

    useEffect(() => {
        checkIfTextIsLong();
    }, [productName, productDescription]);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const handleImageClick = () => {
        if (isExpanded) {
            setIsExpanded(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            //! ad oggi è impossibile eliminare l'immagine da imgBB tramite l'API
            await deleteDoc(doc(db, "products", productId));
            removeProduct(productId);
            alert("Prodotto eliminato con successo!");
        } catch (error) {
            alert("Errore durante l'eliminazione del prodotto.", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`prodCard ${isExpanded ? 'expanded' : ''}`}>
            {removeProduct && (
                <button className="deleteButton" onClick={handleDelete} disabled={loading}>
                <img src={DeleteIcon} alt="Elimina" draggable="false" />
                </button>
            )}
            <img className='productImage' src={productImg} loading="lazy" alt="Immagine prodotto" onClick={handleImageClick} />
            <div className="prodBody">
                <div className="prodInfo">
                    <h4>{productName}</h4>
                    <p className='prodDescription' ref={descriptionRef}>{productDescription}</p>
                </div>
                <div className="prodBottom">
                    {isTextLong && !isExpanded && ( <button className="textButton" onClick={toggleDescription}>Mostra più</button> )}
                    {isExpanded && ( <button className="textButton" onClick={toggleDescription}>Mostra meno</button> )}
                    <div className="prodBuy">
                        <div className="prodBuyInfo">
                            <h4>{productPrice}€</h4>
                            {productAmount === "1" ? "Al pezzo" : `${productAmount} pezzi`}
                        </div>
                        <button onClick={() => handleRedirection(prodLink)}>Acquista</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    productId: PropTypes.string,
    productImg: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    productDescription: PropTypes.string.isRequired,
    productPrice: PropTypes.string.isRequired,
    productAmount: PropTypes.string.isRequired,
    prodLink: PropTypes.string.isRequired,
    removeProduct: PropTypes.func,
};

export default ProductCard
