import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="container-fluid homepage-bg d-flex align-items-center justify-content-center vh-100">
      <div className="card homepage-card text-center p-4">
        <div className="welcome-text mb-2">Welcome to</div>
        <h1 className="connect-title mb-4">CONNECT-ME</h1>

        <div className="d-flex flex-column gap-3">
          <button className="btn custom-btn">Login</button>
          <button className="btn custom-btn">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
