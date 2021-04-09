import React from 'react';
import { useTheme } from '../../lib/theme';

function PolygonIcon() {
  const { secondaryColor } = useTheme();
  return (
    <svg
      width="9"
      height="17"
      viewBox="0 0 9 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.02148 1.79413L7.92554 8.69811L1.02148 15.6022"
        stroke={secondaryColor}
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default PolygonIcon;
