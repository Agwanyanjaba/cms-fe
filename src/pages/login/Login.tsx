import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../utils/AuthProvider.tsx";
import "./login.scss";

const Login = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9999";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = { username: email, password };

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const result = await response.json();

      if (result.token) {
        localStorage.setItem("authToken", result.token);
        console.log("Login successful, token stored:", result.token);

        const decodedToken: any = jwtDecode(result.token);
        console.log("Decoded token:", decodedToken);

        const user = {
          username: decodedToken.username,
          role: decodedToken.role,
        };
        console.log("Logging in user to AuthProvider:", user);

        auth.login(user); // Pass the user object to AuthProvider

        if (user.role === "STUDENT") {
          navigate("/student");
        } else {
          navigate("/");
        }
      } else {
        throw new Error("No token received from server.");
      }
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
