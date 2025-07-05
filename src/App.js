import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from './pages/Home';
import Editpage from './pages/edit';
 import { AuthProvider } from "./context/AuthContext";
 import ProtectedRoute from "./components/ProtectedRoute";
import Login from './pages/Login';
 import Signup from './pages/Signup'
function App() {
  return (
   <AuthProvider>
    <BrowserRouter>
      <div className="container">
        <h1 className="text-center my-4">Meme Generator</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit" element={
              <ProtectedRoute>
                <Editpage />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </AuthProvider>
   
  );
}

export default App;
