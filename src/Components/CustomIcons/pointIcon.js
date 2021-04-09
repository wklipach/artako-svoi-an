import React from 'react';
import { useTheme } from '../../lib/theme';

function PointIcon() {
  const { secondaryColor } = useTheme();

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.04297"
        y="0.68811"
        width="26.3478"
        height="26.3478"
        rx="13.1739"
        stroke={secondaryColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.8823 8.6978L19.6769 9.49241C19.9082 9.72368 19.9082 10.0973 19.6769 10.3285L14.3637 15.6418L12.7329 14.0111L18.0462 8.6978C18.157 8.58676 18.3074 8.52435 18.4643 8.52435C18.6211 8.52435 18.7715 8.58676 18.8823 8.6978ZM9.76803 16.8278C9.76803 15.8434 10.5626 15.0488 11.547 15.0488C12.5314 15.0488 13.326 15.8434 13.326 16.8278C13.326 18.1383 12.2645 19.1998 10.954 19.1998C10.0586 19.1998 9.12759 18.7372 8.58203 18.0138C9.08015 18.0138 9.76803 17.6046 9.76803 16.8278Z"
        fill={secondaryColor}
      />
    </svg>
  );
}

export default PointIcon;
