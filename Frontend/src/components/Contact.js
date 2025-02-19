import React from "react";
import { useState } from "react";
import LoginFirstPopup from "../used_components/popup";
import "./contact.css";

function ContactUsPage() {
  const [showPopup, setShowPopup] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <>
      <div className="contact-page">
        <header className="contact-header">
          <h1>Contact Us</h1>
        </header>
        <section className="contact-content">
          <h2>Get In Touch</h2>
          <p>
            Have questions or need assistance? We'd love to hear from you! Feel
            free to reach out using the form below or through our contact
            details.
          </p>

          <form
            className="contact-form"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              required
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              required
            ></textarea>

            <button type="submit" className="btn">
              Send Message
            </button>
          </form>

          <h2>Contact Details</h2>
          <p>Email: support@wildwheels.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Wild Wheels Road, Cycling City, CC 12345</p>
        </section>
      </div>
      <LoginFirstPopup
        isOpen={showPopup}
        messageMain={"Message Sent"}
        messageSecondary={"You can rest assure"}
        onClose={() => setShowPopup(false)}
      />
    </>
  );
}

export default ContactUsPage;
