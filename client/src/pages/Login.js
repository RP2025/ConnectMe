import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously
} from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAnonymousLogin = async () => {
    setError('');
    try {
      await signInAnonymously(auth);
      navigate('/create');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container-fluid page-bg d-flex align-items-center justify-content-center vh-100">
      <div className="text-center p-4">
        <div className="welcome-text mb-2">We are glad to have you here, HOPIN!!</div>
        <h1 className="connect-title mb-4">CONNECT-ME</h1>
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>Login</h2>
      <form onSubmit={handleEmailLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100 mb-3">
          Login with Email
        </button>
      </form>

      <hr />

      <button onClick={handleGoogleLogin} className="btn btn-danger w-100 mb-3">
        Login with Google
      </button>

      <button onClick={handleAnonymousLogin} className="btn btn-secondary w-100">
        Continue as Guest (Anonymous)
      </button>
    </div>
    </div>
    </div>
  );
};

export default Login;
