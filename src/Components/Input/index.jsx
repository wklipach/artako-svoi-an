import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/Close';
import { useTheme } from '../../lib/theme';

function Input({
  name,
  type,
  value,
  onChange,
  label,
  first,
  last,
  unBordered,
  error,
  cleanButton,
  addOn,
  disabled,
  borderColor,
  activeBorderColor,
  labelColor,
  clearColor,
  removeBorderTop,
}) {
  const [focus, setFocus] = useState(false);
  const { primaryColor } = useTheme();

  function handleChange(e) {
    e.preventDefault();
    onChange(e);
  }

  return (
    <>
      <div
        className={`root ${focus ? 'active' : ''} ${
          unBordered ? 'unbordered' : ''
        }`}
      >
        <label
          htmlFor={name}
          label
          className={`label ${focus || value !== '' ? 'focused' : ''}`}
        >
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={handleChange}
          id={name}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder=""
          disabled={disabled}
        />
        {value !== '' && type !== 'password' && cleanButton && !addOn && (
          <div
            className="clear"
            onClick={() => onChange({ target: { value: '' } })}
          >
            <CloseIcon style={{ color: '#1A202E', width: 16, height: 16 }} />
          </div>
        )}
        {addOn && addOn}
      </div>
      <style jsx>{`
        .root {
          position: relative;
          height: 69px;
          width: 100%;
          border: 2px solid ${error ? '#F95B81' : '#c6d2e1'};
          border-radius: ${first ? '10px 10px' : '0px 0px'}
            ${last ? '10px 10px' : '0px 0px'};
          padding: 12px 20px;
          display: flex;
          align-items: flex-end;
          border-color: ${borderColor && borderColor};
          ${removeBorderTop && 'border-top: 0px;'}
        }

        .active {
          border-color: ${activeBorderColor ? activeBorderColor : '#1684f2'};
        }

        .unbordered {
          border-top: 0;
          border-left: 0;
          border-right: 0;
          border-radius: 0;
        }

        .label {
          cursor: pointer;
          position: absolute;
          left: 20px;
          right: 20px;
          bottom: 20px;
          background: transparent;
          transition: all 0.3s;
          touch-action: manipulation;
          color: ${labelColor ? labelColor : `${primaryColor}87`};
          font-weight: 500;
          font-size: 17px;
          line-height: 21px;
          overflow: hidden;
          max-width: 100%;
          white-space: pre;
        }

        .focused {
          bottom: 40px;
          font-size: 15px;
        }

        input {
          position: absolute;
          bottom: 6px;
          width: calc(100% - 40px);
          outline: 0;
          border: 0;
          background: transparent;
          height: 30px;
          font-weight: bold;
          font-size: 17px;
          line-height: 21px;
          color: ${primaryColor};
          -webkit-text-fill-color: ${primaryColor};
          opacity: 1;
        }

        input:disabled {
          color: ${primaryColor};
        }

        .clear {
          position: absolute;
          right: 20px;
          width: 20px;
          height: 20px;
          display: flex;
          background-color: ${clearColor ? clearColor : '#e2e8f0'};
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          z-index: 1;
          bottom: 20px;
        }
      `}</style>
    </>
  );
}

Input.defaultProps = {
  type: 'text',
  first: false,
  last: false,
  unBordered: false,
  error: false,
  cleanButton: true,
  addOn: false,
  disabled: false,
  labelColor: 'rgba(0, 49, 102, 0.53)',
  removeBorderTop: false,
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  last: PropTypes.bool,
  first: PropTypes.bool,
  unBordered: PropTypes.bool,
  error: PropTypes.bool,
  cleanButton: PropTypes.bool,
  disabled: PropTypes.bool,
  removeBorderTop: PropTypes.bool,
  addOn: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  borderColor: PropTypes.string,
  labelColor: PropTypes.string,
  clearColor: PropTypes.string,
  activeBorderColor: PropTypes.string,
};

export default Input;
