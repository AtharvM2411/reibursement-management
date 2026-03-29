import { useState } from "react";
import "./auth.css";
import { signup } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      if (!form.name || !form.email || !form.password || !form.role) {
        alert("Please fill all fields");
        return;
      }

      await signup(form);

      alert("Signup successful. Please login.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Signup failed");
    }
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
          value={form.name}
          onChange={handleChange}
        />

        <input
          className="auth-input"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="auth-input"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />

        {/* 🔥 ROLE SELECT */}
        <select
          className="auth-input"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="">Select Role</option>
          <option value="EMPLOYEE">Employee</option>
          <option value="MANAGER">Manager</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button className="auth-button" onClick={handleSignup}>
          Signup
        </button>

        <p className="auth-link">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}