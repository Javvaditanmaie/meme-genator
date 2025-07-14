import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/LoginSignup.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const redirectTo = params.get("redirect")
    ? decodeURIComponent(params.get("redirect"))
    : "/edit";

  const login = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("✅ Logged in successfully!");
      setMessageType("success");

      // Delay so user sees message
      setTimeout(() => {
        navigate(redirectTo);
      }, 1500);
    } catch (err) {
      setMessage("❌ Invalid email or password.");
      setMessageType("error");
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="auth-container">
      <form onSubmit={login} className="auth-card">
        <h2>Login</h2>

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={togglePassword} className="eye-toggle" title="Toggle password">
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {message && (
          <p className={`message ${messageType}`} style={{ marginTop: "10px" }}>
            {message}
          </p>
        )}

        <button type="submit" className="submit-btn">Login</button>

        <div className="switch mt-3">
          Forgot your password?{" "}
          <button type="button" onClick={() => navigate("/forgot-password")}>
            Reset Here
          </button>
        </div>

        <div className="switch mt-2">
          Don't have an account?{" "}
          <button type="button" onClick={() => navigate(`/signup?redirect=${encodeURIComponent(redirectTo)}`)}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
