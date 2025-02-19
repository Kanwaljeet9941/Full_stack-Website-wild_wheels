import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

function AdminPage({ isLoggedIn }) {
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(null);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/");
  }

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8000/api/v1/products", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const productsData = await response.json();
        setProducts(productsData.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProductForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", productForm.name);
    formData.append("price", productForm.price);
    formData.append("description", productForm.description);
    formData.append("category", productForm.category);
    if (productForm.image) {
      formData.append("image", productForm.image);
    }

    const method = isEditing ? "PATCH" : "POST";
    const url = isEditing
      ? `http://localhost:8000/api/v1/products/${isEditing}`
      : "http://localhost:8000/api/v1/products";

    const token = localStorage.getItem("token");

    try {
      await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      setProductForm({
        name: "",
        category: "",
        price: "",
        description: "",
        image: null,
      });
      setIsEditing(null);
      fetchProducts();
    } catch (error) {
      console.error("Error creating or updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId));
        fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditProduct = (product) => {
    setIsEditing(product._id);
    setProductForm(product);
  };

  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <h2>{isEditing ? "Edit Product" : "Create Product"}</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productForm.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={productForm.price}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={productForm.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={productForm.category}
          onChange={handleInputChange}
          required
        />
        <input type="file" name="image" onChange={handleImageChange} />
        <button type="submit" className="btn">
          {isEditing ? "Update Product" : "Create Product"}
        </button>
      </form>

      <h2>Product List</h2>
      <ul className="admin-product-list">
        {products.map((product) => (
          <li key={product._id} className="admin-product-list-item">
            <strong>{product.name}</strong> - ${product.price}
            {product.image && (
              <img
                src={`http://localhost:8000/uploads/${product.image}`} // Use dynamic image path
                alt={product.name}
                style={{ width: "100px" }}
              />
            )}
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <div className="btn-holder">
              <button
                onClick={() => handleEditProduct(product)}
                className="btn"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="btn"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
