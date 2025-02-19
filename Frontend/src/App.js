import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import SignUpPage from "./components/Signup";
import ProductsPage from "./components/Products";
import AdminPage from "./components/admin";
import CheckoutPage from "./components/checkout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const emptyCart = () => {
    setCartItems([]);
  };

  const handleCartOpen = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);

      if (existingItem) {
        // Update the quantity of the existing item
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to the cart with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) =>
      newQuantity <= 0
        ? prevItems.filter((item) => item._id !== itemId) // Remove item if quantity is zero
        : prevItems.map((item) =>
            item._id === itemId ? { ...item, quantity: newQuantity } : item
          )
    );
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== itemId)
    );
  };

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogOut() {
    setIsLoggedIn(false);
  }

  return (
    <Router>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogOut={handleLogOut}
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCartOpen={handleCartOpen}
        isCartOpen={isCartOpen}
      />
      <div className="home-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home isLoggedIn={isLoggedIn} addToCart={handleAddToCart} />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={
              <Login
                onLogin={handleLogin}
                isLoggedIn={isLoggedIn}
                onLogOut={handleLogOut}
              />
            }
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/products"
            element={
              <ProductsPage
                isLoggedIn={isLoggedIn}
                addToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/admin"
            element={<AdminPage isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cartItems={cartItems}
                onEmptyCart={emptyCart}
                isLoggedIn={isLoggedIn}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
