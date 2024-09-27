import React from 'react';

const getBootstrapColor = (color) => {
  const colorMap = {
    primary: 'var(--bs-primary)',
    secondary: 'var(--bs-secondary)',
    success: 'var(--bs-success)',
    danger: 'var(--bs-danger)',
    warning: 'var(--bs-warning)',
    info: 'var(--bs-info)',
    light: 'var(--bs-light)',
    dark: 'var(--bs-dark)',
  };

  return colorMap[color] || color;
};

const Logo = ({ color = 'primary' }) => {
  const fillColor = getBootstrapColor(color);

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill={fillColor}
    >
      <circle cx="50" cy="50" r="50" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="36"
        fontWeight="bold"
        fill="#ffffff"
      >
        JF
      </text>
    </svg>
  );
};

export default Logo;
