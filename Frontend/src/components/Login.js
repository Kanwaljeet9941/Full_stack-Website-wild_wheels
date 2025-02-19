import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaUser, FaLock } from "react-icons/fa";
import "./loginSignup.css";

function LoginPage({ onLogin, isLoggedIn, onLogOut }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);
        if (isLoggedIn) onLogOut();
        onLogin();
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const userResponse = await fetch(
          `http://localhost:8000/api/v1/users/${userId}`
        );
        if (userResponse.ok) {
          const userData = await userResponse.json();
          if (userData.data.user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/products");
          }
        }
      } else {
        setError("Login Failed");
      }
    } catch (error) {
      setError("Error during login");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <FaUser />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <FaLock />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <Link to="/signup" className="link-to-signup">
        Create an account?
      </Link>
    </div>
  );
}

export default LoginPage;
