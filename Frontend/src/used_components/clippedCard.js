import React from "react";
import "./clippedCard.css"; // External CSS file

const ClippedCard = ({ product, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(product);
  };
  return (
    <div className="clipped-card-container">
      <div className="image-section">
        <img
          src={`http://localhost:8000/uploads/${product.image}`} // Replace with your image URL
          alt={product.name}
          className="clipped-image"
        />
        <div className="image-text">{product.name}</div>
      </div>

      <div className="details-section">
        <ul className="details-list">
          <li className="details-category">{product.category}</li>
          <li>{product.description}</li>
        </ul>
      </div>

      <div className="price-section">
        <p className="price-label">ONLY</p>
        <p className="price-value">${product.price}</p>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ClippedCard;
