import React from 'react';
import PropTypes from 'prop-types';

function DownloadIcon({ fill }) {
  return (
    <svg
      width="26"
      height="24"
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.2841 5.17705V16.2597L7.21166 11.4179C6.80628 11.0309 6.14105 11.0309 5.73567 11.4179C5.3303 11.8048 5.3303 12.4299 5.73567 12.8168L12.5855 19.3553C12.9909 19.7422 13.6457 19.7422 14.0511 19.3553L20.9009 12.8168C21.3063 12.4299 21.3063 11.8048 20.9009 11.4179C20.7067 11.2321 20.443 11.1277 20.1681 11.1277C19.8931 11.1277 19.6295 11.2321 19.4353 11.4179L14.3629 16.2597V5.17705C14.3629 4.63136 13.8952 4.18488 13.3235 4.18488C12.7518 4.18488 12.2841 4.63136 12.2841 5.17705Z"
        fill={fill}
      />
      <line
        x1="7.46289"
        y1="22.0209"
        x2="19.1748"
        y2="22.0209"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

DownloadIcon.defaultProps = {
  fill: '#003166',
};

DownloadIcon.propTypes = {
  fill: PropTypes.string,
};

export default DownloadIcon;
