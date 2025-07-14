import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route,useLocation } from "react-router-dom";
import "./App.css";
import HomePage from './pages/Home';
import Editpage from './pages/edit';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from './pages/Login';
import Signup from './pages/Signup';
import SavedMemes from './pages/SavedMemes';
import ForgotPassword from "./pages/forgot-password"; 
const AppContent = () => {
  const location = useLocation();
  const showHeader = location.pathname === "/";
  return (
    <div className="container">
      {showHeader && <h1 className="text-center my-4">Meme Generator</h1>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit" element={
          <ProtectedRoute>
            <Editpage />
          </ProtectedRoute>
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/saved" element={<SavedMemes />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
