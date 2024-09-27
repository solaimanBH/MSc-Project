// src/components/shared/Logo.jsx
import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Logo = () => {
  return (
    <div className="logo text-center mb-4">
      <FaHeart size={40} color="#F05A7E" />
      <h4 className="mt-2">Jaago</h4>
    </div>
  );
};

export default Logo;
