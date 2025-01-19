import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          username: username.trim(),
          password: password.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Check response and handle token
      if (response.data && response.data.jwt) {
        console.log("Login successful, received token:", response.data.jwt);
        localStorage.setItem("token", response.data.jwt); // Save token
        alert("Login Successful!");
        navigate("/ide"); // Redirect to IDE page
      } else {
        console.error("Unexpected response:", response);
        alert("Invalid Credentials or Unexpected Response.");
      }
    } catch (err) {
      // Log error details for debugging
      console.error("Login Error:", err);
      if (err.response && err.response.status === 401) {
        alert("Invalid Credentials. Please try again.");
      } else {
        alert("An error occurred during login. Please check the console for details.");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <Link to="/register"> Don't have an account? Register</Link>
      </form>
    </div>
  );
}

export default Login;
