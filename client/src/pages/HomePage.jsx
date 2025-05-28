import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { signInAnonymously } from 'firebase/auth'; 

const HomePage = () => {
  const navigate = useNavigate();

  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously(auth); // use after initialization
      navigate('/create');
    } catch (err) {
      alert("Anonymous login failed: " + err.message);
    }
  };

  return (
    <div className="container-fluid page-bg d-flex align-items-center justify-content-center vh-100">
      <div className="text-center p-4">
        <div className="welcome-text mb-2">Welcome to</div>
        <h1 className="connect-title mb-4">CONNECT-ME</h1>

        <div className="d-flex flex-column gap-3">
          <button className="custom-btn" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="custom-btn" onClick={handleAnonymousLogin}>
            Join Anonymously
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
