import React from 'react';

// A slightly different/smaller arrow for the "Learn More" button if needed
const ArrowRightIconSmall = ({ className = "w-4 h-4 ml-2", strokeWidth = 2 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={strokeWidth}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /> 
    {/* Using a different style of arrow: line with arrowhead */}
  </svg>
);

export default ArrowRightIconSmall;