import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './Page.css';

import Login from './Login';
import Signup from './Signup';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid page-bg d-flex align-items-center justify-content-center vh-100">
      <div className="text-center p-4">
        <div className="welcome-text mb-2">Welcome to</div>
        <h1 className="connect-title mb-4">CONNECT-ME</h1>

        <div className="d-flex flex-column gap-3">
          <button className="custom-btn" onClick={() => navigate('/login')}>Login</button>
          <button className="custom-btn" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default HomePage;
