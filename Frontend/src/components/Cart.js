import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginFirstPopup from "../used_components/popup";
import "./cart.css";

const Cart = ({
  cartItems,
  onUpdateQuantity,
  onRemoveFromCart,
  onCartOpen,
  isCartOpen,
}) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  function handleGoToCheckout() {
    if (cartItems.length > 0) {
      navigate("/checkout");
      onCartOpen();
    } else {
      setShowPopup(true);
    }
  }

  return (
    <>
      <div className={`cart-container ${isCartOpen ? "open" : "close"}`}>
        <div className="cart-close" onClick={onCartOpen}>
          &#x2715;
        </div>
        <h3>Your Cart</h3>
        <div className="cart-list-scroller">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                {/* <img src={item.imgae} alt={item.name} /> */}
                <p style={{ color: "var(--third-color)" }}>{item.name}</p>
                <p>Price: ${item.price}</p>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() =>
                      onUpdateQuantity(item._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>Quantity: {item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() =>
                      onUpdateQuantity(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <p>Subtotal: ${item.price * item.quantity}</p>
              </div>
            ))
          )}
        </div>
        <h4 className="cart-total">Total Price: ${totalPrice}</h4>
        <div className="cart-checkout" onClick={handleGoToCheckout}>
          Checkout
        </div>
      </div>
      <LoginFirstPopup
        isOpen={showPopup}
        messageMain={"No Items"}
        messageSecondary={"There are no items in the cart!"}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
};

export default Cart;
