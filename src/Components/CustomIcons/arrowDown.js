import React from 'react';

function ArrowDown({ color }) {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.94531 1.32947L7.35997 6.5033L12.7736 1.32947"
        stroke={color ? color : 'white'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowDown;
