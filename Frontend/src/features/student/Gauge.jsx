// Gauge.js
import React from 'react';

const Gauge = ({ label, value, min, max }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - ((value - min) / (max - min)) * circumference;

  return (
    <div style={{ display: 'inline-block', margin: '20px' }}>
      <svg width="120" height="60">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="#e0e0e0"
          strokeWidth="10"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={0}
          transform="rotate(-90 60 60)"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="#8884d8"
          strokeWidth="10"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
        />
        <text x="60" y="80" textAnchor="middle" fontSize="14">{label}</text>
      </svg>
    </div>
  );
};

export default Gauge;
