import { useState } from "react";
import "./auth.css";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔐 handle login
  const handleLogin = async () => {
    try {
      // basic validation
      if (!form.email || !form.password) {
        alert("Please fill all fields");
        return;
      }

      const res = await login(form);

      console.log("Login success:", res);

      // redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert(
        err?.response?.data?.message || "Invalid email or password"
      );
    }
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

        <button className="auth-button" onClick={handleLogin}>
          Login
        </button>

        <p className="auth-link">
          Don't have an account?{" "}
          <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
}