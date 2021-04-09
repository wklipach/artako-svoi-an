import React from 'react';
import PropTypes from 'prop-types';

function CloseIcon({ fill }) {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.16654 7.33936C0.367759 7.54058 0.694869 7.54058 0.896089 7.33936L3.75237 4.48308L6.60865 7.33936C6.80987 7.54058 7.13698 7.54058 7.3382 7.33936C7.53942 7.13814 7.53942 6.81103 7.3382 6.60981L4.48192 3.75353L7.3382 0.897248C7.53942 0.696029 7.53942 0.368919 7.3382 0.167699C7.13698 -0.0335202 6.80987 -0.0335202 6.60865 0.167699L3.75237 3.02398L0.896089 0.167699C0.694869 -0.0335202 0.367759 -0.0335202 0.16654 0.167699C-0.0346798 0.368919 -0.0346798 0.696029 0.16654 0.897248L3.02282 3.75353L0.16654 6.60981C-0.0346798 6.81103 -0.0346798 7.13814 0.16654 7.33936Z"
        fill={fill}
      />
    </svg>
  );
}

CloseIcon.defaultProps = {
  fill: '#007AFF',
};

CloseIcon.propTypes = {
  fill: PropTypes.string,
};

export default CloseIcon;