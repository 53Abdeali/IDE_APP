import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        username,
        password,
      });
      alert("User Registered Successfully!");
    } catch (err) {
      alert("Some error occured...");
      console.error("Error Registering User", err);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Signup</button>
        <Link to="/login">Already have an account? Login</Link>
      </form>
    </div>
  );
}

export default Register;
