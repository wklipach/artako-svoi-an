import React from 'react';
import PropTypes from 'prop-types';

function IdeaIcon({ fill }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.714 8C14.32 8 14 7.619 14 7.15V3.978L17.742 8H14.714ZM15 18H9C8.448 18 8 17.552 8 17C8 16.448 8.448 16 9 16H15C15.553 16 16 16.448 16 17C16 17.552 15.553 18 15 18ZM9 12H12C12.552 12 13 12.448 13 13C13 13.552 12.552 14 12 14H9C8.448 14 8 13.552 8 13C8 12.448 8.448 12 9 12ZM19.74 7.328L15.296 2.328C15.107 2.119 14.838 2 14.556 2H6.556C5.147 2 4 3.122 4 4.5V19.5C4 20.878 5.147 22 6.556 22H17.444C18.854 22 20 20.878 20 19.5V8C20 7.751 19.907 7.512 19.74 7.328Z"
        fill={fill}
      />
      <mask
        id="mask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="4"
        y="2"
        width="16"
        height="20"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.714 8C14.32 8 14 7.619 14 7.15V3.978L17.742 8H14.714ZM15 18H9C8.448 18 8 17.552 8 17C8 16.448 8.448 16 9 16H15C15.553 16 16 16.448 16 17C16 17.552 15.553 18 15 18ZM9 12H12C12.552 12 13 12.448 13 13C13 13.552 12.552 14 12 14H9C8.448 14 8 13.552 8 13C8 12.448 8.448 12 9 12ZM19.74 7.328L15.296 2.328C15.107 2.119 14.838 2 14.556 2H6.556C5.147 2 4 3.122 4 4.5V19.5C4 20.878 5.147 22 6.556 22H17.444C18.854 22 20 20.878 20 19.5V8C20 7.751 19.907 7.512 19.74 7.328Z"
          fill="white"
        />
      </mask>
    </svg>
  );
}

IdeaIcon.defaultProps = {
  fill: '#1684F2',
};

IdeaIcon.propTypes = {
  fill: PropTypes.string,
};

export default IdeaIcon;
