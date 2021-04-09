import React from 'react';

function ArrowUp({ color }) {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.94531 6.19434L7.35997 1.02051L12.7736 6.19434"
        stroke={color ? color : 'white'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ArrowUp;
