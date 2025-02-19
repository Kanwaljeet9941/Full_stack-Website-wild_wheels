import React, { useState, useEffect } from "react";
import ClippedCard from "./../used_components/clippedCard";
import "./product.css";

function ProductsPage({ isLoggedIn, addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:8000/api/v1/products", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }); // Replace with your backend endpoint
        // console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();
        // console.log(data.data.products);
        setProducts(data.data.products); // Assuming the backend returns an array of products
        setLoading(false);
      } catch (err) {
        setError(err.message || "An error occurred while fetching products.");
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <>
        <p className="message-to-login">Please log in to view the products.</p>
      </>
    );
  }

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <ClippedCard
          key={product.name}
          product={product}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}

export default ProductsPage;
