import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/LoginSignup.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 👈 error state
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const redirectTo = params.get("redirect")
    ? decodeURIComponent(params.get("redirect"))
    : "/edit";

  const login = async (e) => {
    e.preventDefault();
    setError(""); // reset on submit
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(redirectTo);
    } catch (err) {
      setError(err.message); // 👈 show error inside form
    }
  };

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
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>} {/* 👈 error here */}
        
        <button type="submit">Login</button>

        <div className="switch">
          Don't have an account?{" "}
          <button type="button" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};


export default Login;
