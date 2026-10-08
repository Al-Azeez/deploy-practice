import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        mode === "signup"
          ? `${API_URL}/auth/signup`
          : `${API_URL}/auth/login`;

      const response = await axios.post(endpoint, form);

      setMessage(response.data.message);
      setShowSuccess(true);

      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="app">
      <div className="card">
        <div className="logo">M</div>

        <h1>MERN Auth</h1>

        <p className="subtitle">
          MongoDB Atlas + Express + React + Node
        </p>

        <div className="tabs">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => {
              setMode("login");
              setMessage("");
            }}
          >
            Login
          </button>

          <button
            className={mode === "signup" ? "active" : ""}
            onClick={() => {
              setMode("signup");
              setMessage("");
            }}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="submit" type="submit">
            {mode === "signup"
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        {message && !showSuccess && (
          <p className="error">{message}</p>
        )}
      </div>

      {showSuccess && (
        <div className="overlay">
          <div className="success-box">
            <div className="check">✓</div>

            <h2>Alhamdulillah! 🎉</h2>

            <p>
              You have successfully completed the
              MongoDB connection and authentication.
            </p>

            <p>
              <strong>
                Deployment concept successfully completed! 🚀
              </strong>
            </p>

            <button
              onClick={() => {
                setShowSuccess(false);
                setMode("login");
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;