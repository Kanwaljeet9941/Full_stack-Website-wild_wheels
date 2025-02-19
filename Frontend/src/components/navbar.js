import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaCartArrowDown } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Cart from "./Cart";
import "./navbar.css";

function Navbar({
  isLoggedIn,
  onLogOut,
  cartItems,
  onRemoveFromCart,
  onUpdateQuantity,
  isCartOpen,
  onCartOpen,
}) {
  const [user, setUser] = useState(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }
      const decoded = jwtDecode(token);
      console.log(decoded);

      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/users/${decoded.id}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(userData.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUser(null);
      }
    };

    fetchUserDetails();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogOut();
    setUser(null);
    setProfileDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Whild Wheels</h1>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <Link to="/products">Products</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {user?.role === "admin" && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}
      </ul>

      <div className="actions-container">
        {/* Profile Dropdown */}
        <div
          className="profile-container"
          onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
        >
          <FaUserCircle size={30} className="profile-icon" />
          {profileDropdownOpen && (
            <div className="profile-dropdown">
              {user ? (
                <>
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {user.role}
                  </p>
                  <button className="logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <p>
                  No user is logged in.{" "}
                  <Link to="/login" className="ask-to-login">
                    Login
                  </Link>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Cart Drawer */}
        <div className="cart-icon">
          {cartItems.length > 0 && (
            <div className="cart-items-count">{cartItems.length}</div>
          )}
          <FaCartArrowDown onClick={() => onCartOpen()} />
        </div>
        {isCartOpen && (
          <Cart
            cartItems={cartItems}
            onCartOpen={onCartOpen}
            isCartOpen={isCartOpen}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveFromCart={onRemoveFromCart}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
