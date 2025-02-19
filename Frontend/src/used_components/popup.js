import React, { useEffect } from "react";
import "./popup.css";

function LoginFirstPopup({ isOpen, onClose, messageMain, messageSecondary }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <div className={`popup-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div
        className={`popup-content ${isOpen ? "slide-in" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{messageMain}</h2>
        <p>{messageSecondary}</p>
        <button className="close-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

export default LoginFirstPopup;
