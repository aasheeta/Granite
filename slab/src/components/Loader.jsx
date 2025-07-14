// src/components/Loader.js
import React from 'react';
import './Loader.css'; // or inline styles if you prefer

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
