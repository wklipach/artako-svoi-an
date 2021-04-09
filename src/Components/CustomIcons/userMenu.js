import React from 'react';
import PropTypes from 'prop-types';

function UserMenu({ fill }) {
  return (
    <svg
      width="5"
      height="21"
      viewBox="0 0 5 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.32031 2.21997C4.32031 3.32397 3.42431 4.21997 2.32031 4.21997C1.21631 4.21997 0.320312 3.32397 0.320312 2.21997C0.320312 1.11597 1.21631 0.219971 2.32031 0.219971C3.42431 0.219971 4.32031 1.11597 4.32031 2.21997Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.32031 10.22C4.32031 11.324 3.42431 12.22 2.32031 12.22C1.21631 12.22 0.320312 11.324 0.320312 10.22C0.320312 9.11597 1.21631 8.21997 2.32031 8.21997C3.42431 8.21997 4.32031 9.11597 4.32031 10.22Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.32031 18.22C4.32031 19.324 3.42431 20.22 2.32031 20.22C1.21631 20.22 0.320312 19.324 0.320312 18.22C0.320312 17.116 1.21631 16.22 2.32031 16.22C3.42431 16.22 4.32031 17.116 4.32031 18.22Z"
        fill={fill}
      />
    </svg>
  );
}

UserMenu.defaultProps = {
  fill: '#003166',
};

UserMenu.propTypes = {
  fill: PropTypes.string,
};

export default UserMenu;
