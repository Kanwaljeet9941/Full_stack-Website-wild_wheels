import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./../used_components/card";

import "./home.css";

const products = [
  {
    name: "Mountain Bike",
    description: "High-performance bike",
    image: "/assets/Mountain Bike.jpg",
    price: 450,
  },
  {
    name: "Road Bike",
    description: "Lightweight road bike",
    image: "/assets/Road Bike.jpg",
    price: 600,
  },
  {
    name: "Hybrid Bike",
    description: "Versatile hybrid bike",
    image: "/assets/Hybrid Bike.jpg",
    price: 500,
  },
  {
    name: "Electric Bike",
    description: "Electric-assisted bike",
    image: "/assets/Electric Bike.jpg",
    price: 1200,
  },
];

export default function Home({ isLoggedIn, addToCart }) {
  const navigate = useNavigate();

  const handleExploreMore = () => {
    if (isLoggedIn) {
      navigate("/products"); // Navigate to the product list
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  };
  const handleNavigation = () => {
    navigate("/signup");
  };

  return (
    <div className="home-container">
      {/* Product List Section */}
      <div className="product-list-home">
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addToCart={addToCart}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="home-hero">
        <div className="hero-text">
          <p className="hero-slogan">
            Your One-Stop Shop for Everything You Need.
            <span>Shop Trends, Shop Smart.</span>
          </p>
          <div className="btns">
            <button className="explore-more-button" onClick={handleExploreMore}>
              Explore More
            </button>
            <button className="explore-more-button" onClick={handleNavigation}>
              sign up!
            </button>
          </div>
        </div>
        <div className="home-pic">
          <img src="/assets/cyc-1.png" alt="main-img" />
        </div>
      </div>
    </div>
  );
}
