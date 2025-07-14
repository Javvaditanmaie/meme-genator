import React, { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/LoginSignup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("username", username); // optional
      setMessage("✅ Account created successfully!");
      setMessageType("success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage("❌ " + getFriendlyError(err.message));
      setMessageType("error");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/edit");
    } catch (err) {
      setMessage("❌ Google sign-up failed.");
      setMessageType("error");
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const getFriendlyError = (msg) => {
    if (msg.includes("email-already-in-use")) return "Email already registered.";
    if (msg.includes("weak-password")) return "Password must be at least 6 characters.";
    return "Signup failed. Try again.";
  };

  return (
    <div className="auth-container">
      <form onSubmit={signup} className="auth-card">
        <h2>Sign Up</h2>

        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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
          <span onClick={togglePassword} className="eye-toggle">
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {message && <p className={`message ${messageType}`}>{message}</p>}

        <button type="submit">Sign Up</button>

        <div className="switch mt-2">
          Already have an account?{" "}
          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>

        <hr />

        <button type="button" className="google-btn" onClick={handleGoogleSignup}>
          🔒 Sign Up with Google
        </button>
      </form>
    </div>
  );
};

export default Signup;
