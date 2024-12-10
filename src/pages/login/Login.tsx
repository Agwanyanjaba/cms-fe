import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // React Router hook for navigation

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
      username: email, // Map email to "username"
      password: password,
    };

    try {
      const response = await fetch("http://localhost:9999/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const result = await response.json();

      // Store the session token (or other data) in localStorage
      if (result.token) {
        localStorage.setItem("authToken", result.token); // Or use sessionStorage if it's a temporary session
        console.log("Login successful, token stored:", result.token);
      } else {
        throw new Error("No token received from server.");
      }

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
      <div className="login-container">
        <div className="login-card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
  );
};

export default Login;
