import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // 'success' or 'error'
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg("");
    setMsgType("");

    try {
  await sendPasswordResetEmail(auth, email);
  setMsg("🔐 If an account exists for this email, a password reset link has been sent.");
  setMsgType("success");
} catch (error) {
  if (error.code === "auth/invalid-email") {
    setMsg("❌ Invalid email address.");
  } else {
    setMsg("❌ Failed to send reset email. Try again later.");
  }
  setMsgType("error");
}

  };

  return (
    <div className="auth-container">
      <form onSubmit={handleReset} className="auth-card">
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>

        {msg && (
          <div
            className="message"
            style={{
              marginTop: "15px",
              textAlign: "center",
              color: msgType === "success" ? "green" : "red",
            }}
          >
            <p style={{ marginBottom: "10px" }}>{msg}</p>
            {msgType === "success" && (
              <button
                type="button"
                onClick={() => navigate("/login")}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Go to Login
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
