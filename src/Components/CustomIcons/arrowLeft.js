import React from 'react';

function ArrowLeft({ color }) {
  return (
    <svg
      width="7"
      height="11"
      viewBox="0 0 7 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.18454 1.01437L1.49414 5.51461L6.18454 10.0144"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowLeft;
