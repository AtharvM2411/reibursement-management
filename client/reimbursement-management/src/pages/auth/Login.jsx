import { useState } from "react";
import "./auth.css";


export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Login</h2>

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

        <button className="auth-button">Login</button>

        <p className="auth-link">
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
}