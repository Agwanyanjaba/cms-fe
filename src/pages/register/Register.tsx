import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";

// Store the base URL in .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9999"; // Default to localhost if not in .env

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(""); // Reset any previous error

    const data = {
      username: email,
      password,
      role,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(responseData.message || "Registration failed");
      }

      // If registration is successful, redirect to the login page
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="login-container">
        <div className="login-card">
          <h2>Create Account</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
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
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
              >
                <option value="STUDENT">Student</option>
                <option value="STAFF">Staff</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <button type="submit" className="login-button" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
  );
};

export default Register;
