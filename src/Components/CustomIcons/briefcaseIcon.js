import React from 'react';
import PropTypes from 'prop-types';

function MessageIcon({ fill }) {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7637 6.23834C10.7637 5.96234 10.9877 5.73834 11.2637 5.73834H14.2637C14.5397 5.73834 14.7637 5.96234 14.7637 6.23834V7.73834H10.7637V6.23834ZM7.76367 21.7383H17.7637V7.73834H16.7637V6.23834C16.7637 4.86034 15.6417 3.73834 14.2637 3.73834H11.2637C9.88567 3.73834 8.76367 4.86034 8.76367 6.23834V7.73834H7.76367V21.7383ZM19.7637 7.73834V21.7383C21.4177 21.7383 22.7637 20.3923 22.7637 18.7383V10.7383C22.7637 9.08434 21.4177 7.73834 19.7637 7.73834ZM2.76367 10.7383C2.76367 9.08434 4.10967 7.73834 5.76367 7.73834V21.7383C4.10967 21.7383 2.76367 20.3923 2.76367 18.7383V10.7383Z"
        fill={fill}
      />
      <mask
        id="mask0"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="2"
        y="3"
        width="21"
        height="19"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.7637 6.23834C10.7637 5.96234 10.9877 5.73834 11.2637 5.73834H14.2637C14.5397 5.73834 14.7637 5.96234 14.7637 6.23834V7.73834H10.7637V6.23834ZM7.76367 21.7383H17.7637V7.73834H16.7637V6.23834C16.7637 4.86034 15.6417 3.73834 14.2637 3.73834H11.2637C9.88567 3.73834 8.76367 4.86034 8.76367 6.23834V7.73834H7.76367V21.7383ZM19.7637 7.73834V21.7383C21.4177 21.7383 22.7637 20.3923 22.7637 18.7383V10.7383C22.7637 9.08434 21.4177 7.73834 19.7637 7.73834ZM2.76367 10.7383C2.76367 9.08434 4.10967 7.73834 5.76367 7.73834V21.7383C4.10967 21.7383 2.76367 20.3923 2.76367 18.7383V10.7383Z"
          fill={fill}
        />
      </mask>
    </svg>
  );
}

MessageIcon.defaultProps = {
  fill: 'white',
};

MessageIcon.propTypes = {
  fill: PropTypes.string,
};

export default MessageIcon;