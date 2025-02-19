import React, { useState } from "react";
import LoginFirstPopup from "../used_components/popup";
import "./card.css";

const Card = ({ product, addToCart, isLoggedIn }) => {
  const [flipped, setFlipped] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  const handleAddToCart = () => {
    if (isLoggedIn) {
      addToCart(product);
    } else {
      setShowPopup(true);
    }
  };
  console.log(product.image);

  return (
    <>
      <div className="card-container" onClick={handleClick}>
        <div className={`card ${flipped ? "flipped" : ""}`}>
          <div className="front">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="back">
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <h2>${product.price}</h2>
            <p>{product.description}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
      <LoginFirstPopup
        isOpen={showPopup}
        messageMain={"Login Required"}
        messageSecondary={"You need to be logged in to access this feature."}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
};

export default Card;
