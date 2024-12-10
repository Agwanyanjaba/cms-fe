import React, { useState } from "react";
import "./register.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here (e.g., API call)
    console.log("Email:", email, "Password:", password, "Role:", role);
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
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
              >
                <option value="Student">Student</option>
                <option value="Staff">Staff</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
  );
};

export default Register;
