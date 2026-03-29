import { useState } from "react";
import "./auth.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Signup</h2>

        <input
          className="auth-input"
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

        <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button className="auth-button">Signup</button>

        <p className="auth-link">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}