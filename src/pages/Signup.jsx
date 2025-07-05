import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useSearchParams } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [params] = useSearchParams();
  const redirectTo = params.get("redirect") || "/edit";
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate(redirectTo);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={signup} className="text-center mt-4">
      <h2>Signup</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
