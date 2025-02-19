import React, { useState } from "react";
import "./checout.css";
import LoginFirstPopup from "../used_components/popup";
import { useNavigate } from "react-router-dom";

function CheckoutPage({ cartItems, onEmptyCart, isLoggedIn }) {
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    onEmptyCart();
  };

  if (!isLoggedIn) {
    navigate("/");
  }
  // Sample cart items

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="checkout-page">
        <header className="checkout-header">
          <h1>Checkout</h1>
        </header>
        <section className="checkout-content">
          <h2>Your Items</h2>
          <ul className="checkout-items">
            {cartItems.map((item) => (
              <li key={item.id} className="checkout-item">
                <span className="item-name">{item.name}</span>
                <span className="item-quantity">x{item.quantity}</span>
                <span className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="total-amount">
            <h3>Total Amount:</h3>
            <p>${totalAmount.toFixed(2)}</p>
          </div>

          <h2>Shipping Address</h2>
          <form className="address-form" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Full Name"
              required
            />

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Street Address"
              required
            />

            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              required
            />

            <label htmlFor="state">State/Province:</label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="State/Province"
              required
            />

            <label htmlFor="zip">Zip/Postal Code:</label>
            <input
              type="text"
              id="zip"
              name="zip"
              placeholder="Zip/Postal Code"
              required
            />

            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Country"
              required
            />

            <button type="submit" className="btn">
              Proceed to Payment
            </button>
          </form>
        </section>
      </div>
      <LoginFirstPopup
        isOpen={showPopup}
        messageMain={"Order Confirmed"}
        messageSecondary={
          "Your order has been confirmed and will be shipped soon!"
        }
        onClose={() => setShowPopup(false)}
      />
    </>
  );
}

export default CheckoutPage;
