import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import CreatePage from './CreatePage';
import Login from './Login';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
