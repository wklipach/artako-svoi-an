import React from 'react';
import PropTypes from 'prop-types';

function StarIcon({ fill }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.23425 0.992432C6.93918 0.992432 0.378906 1.1198 0.378906 3.60379V13.8158C0.378906 16.2997 6.93918 16.4271 8.23425 16.4271C9.52932 16.4271 16.0896 16.2997 16.0896 13.8158V3.60379C16.0896 1.1198 9.52932 0.992432 8.23425 0.992432ZM14.3911 10.5462C13.9665 10.9284 11.801 11.6078 8.23425 11.6078C4.6675 11.6078 2.50197 10.9284 2.07736 10.5462V9.29361C4.20042 10.0791 7.36379 10.1428 8.23425 10.1428C9.10471 10.1428 12.2681 10.0791 14.3911 9.29361V10.5462ZM14.3911 7.38285C13.9665 7.76501 11.801 8.44439 8.23425 8.44439C4.6675 8.44439 2.50197 7.76501 2.07736 7.38285V5.36594C4.20042 6.15148 7.36379 6.21517 8.23425 6.21517C9.10471 6.21517 12.2681 6.15148 14.3911 5.36594V7.38285ZM8.1281 2.66966C11.3339 2.66966 13.3721 3.2004 14.0727 3.60379C13.3933 3.98594 11.3339 4.53794 8.1281 4.53794C4.92227 4.53794 2.88412 4.00717 2.18351 3.60379C2.86289 3.22163 4.92227 2.66966 8.1281 2.66966ZM8.23425 14.7499C4.6675 14.7499 2.50197 14.0705 2.07736 13.6883V12.4358C4.20042 13.2213 7.36379 13.285 8.23425 13.285C9.10471 13.285 12.2681 13.2213 14.3911 12.4358V13.6883C13.9665 14.0705 11.801 14.7499 8.23425 14.7499Z"
        fill={fill}
      />
    </svg>
  );
}

StarIcon.defaultProps = {
  fill: '#003166',
};

StarIcon.propTypes = {
  fill: PropTypes.string,
};

export default StarIcon;