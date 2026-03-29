import { useState } from "react";
import "./auth.css";
import { signup } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔐 handle signup
  const handleSignup = async () => {
    try {
      // basic validation
      if (!form.name || !form.email || !form.password) {
        alert("Please fill all fields");
        return;
      }

      const res = await signup({
        ...form,
        role: "EMPLOYEE", // 🔥 default role
      });

      console.log("Signup success:", res);

      alert("Signup successful! Please login.");

      // redirect to login
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      alert(
        err?.response?.data?.message || "Signup failed"
      );
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

        <button className="auth-button" onClick={handleSignup}>
          Signup
        </button>

        <p className="auth-link">
          Already have an account?{" "}
          <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
}