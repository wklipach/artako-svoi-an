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
        d="M13 5C13 5.553 12.552 6 12 6C11.448 6 11 5.553 11 5V3C11 2.447 11.448 2 12 2C12.552 2 13 2.447 13 3V5ZM7 12C7 9.243 9.243 7 12 7C14.757 7 17 9.243 17 12C17 13.579 16.246 15.062 15 15.996V20C15 21.103 14.103 22 13 22H11C9.897 22 9 21.103 9 20V15.996C7.753 15.062 7 13.579 7 12ZM21 11H19C18.447 11 18 11.447 18 12C18 12.553 18.447 13 19 13H21C21.553 13 22 12.553 22 12C22 11.447 21.553 11 21 11ZM3 11H5C5.552 11 6 11.447 6 12C6 12.553 5.552 13 5 13H3C2.448 13 2 12.553 2 12C2 11.447 2.448 11 3 11ZM7.6597 6.418L6.2207 5.028C5.8237 4.645 5.1917 4.657 4.8067 5.054C4.4227 5.45 4.4337 6.084 4.8307 6.468L6.2697 7.857C6.4647 8.045 6.7147 8.138 6.9647 8.138C7.2267 8.138 7.4877 8.035 7.6837 7.832C8.0677 7.436 8.0567 6.802 7.6597 6.418ZM17.7794 5.0297C18.1754 4.6467 18.8114 4.6577 19.1924 5.0537C19.5764 5.4497 19.5654 6.0837 19.1684 6.4667L17.7294 7.8567C17.5364 8.0437 17.2854 8.1377 17.0354 8.1377C16.7734 8.1377 16.5114 8.0347 16.3164 7.8317C15.9324 7.4357 15.9434 6.8017 16.3404 6.4187L17.7794 5.0297Z"
        fill={fill}
      />
      <mask
        id="mask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="2"
        y="2"
        width="20"
        height="20"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13 5C13 5.553 12.552 6 12 6C11.448 6 11 5.553 11 5V3C11 2.447 11.448 2 12 2C12.552 2 13 2.447 13 3V5ZM7 12C7 9.243 9.243 7 12 7C14.757 7 17 9.243 17 12C17 13.579 16.246 15.062 15 15.996V20C15 21.103 14.103 22 13 22H11C9.897 22 9 21.103 9 20V15.996C7.753 15.062 7 13.579 7 12ZM21 11H19C18.447 11 18 11.447 18 12C18 12.553 18.447 13 19 13H21C21.553 13 22 12.553 22 12C22 11.447 21.553 11 21 11ZM3 11H5C5.552 11 6 11.447 6 12C6 12.553 5.552 13 5 13H3C2.448 13 2 12.553 2 12C2 11.447 2.448 11 3 11ZM7.6597 6.418L6.2207 5.028C5.8237 4.645 5.1917 4.657 4.8067 5.054C4.4227 5.45 4.4337 6.084 4.8307 6.468L6.2697 7.857C6.4647 8.045 6.7147 8.138 6.9647 8.138C7.2267 8.138 7.4877 8.035 7.6837 7.832C8.0677 7.436 8.0567 6.802 7.6597 6.418ZM17.7794 5.0297C18.1754 4.6467 18.8114 4.6577 19.1924 5.0537C19.5764 5.4497 19.5654 6.0837 19.1684 6.4667L17.7294 7.8567C17.5364 8.0437 17.2854 8.1377 17.0354 8.1377C16.7734 8.1377 16.5114 8.0347 16.3164 7.8317C15.9324 7.4357 15.9434 6.8017 16.3404 6.4187L17.7794 5.0297Z"
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
