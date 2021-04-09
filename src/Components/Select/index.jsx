import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '../../lib/theme';

function Select({ options, name, value, onChange, label, labelColor }) {
  const { primaryColor } = useTheme();

  return (
    <>
      <div className="root">
        <label htmlFor={`select=${name}`}>{label}</label>
        <select
          id={`select-${name}`}
          className="select"
          value={value}
          onChange={e => {
            onChange(e.target.value);
          }}
        >
          {options.map(opt => {
            return (
              <option key={opt.value} value={opt.value}>
                {opt.name}
              </option>
            );
          })}
        </select>
      </div>
      <style jsx>{`
        .root {
          position: relative;
          height: 69px;
        }

        label {
          position: absolute;
          font-family: Montserrat;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 18px;
          color: ${labelColor ? labelColor : 'rgba(0, 49, 102, 0.53)'};
          opacity: ${labelColor ? 0.4 : 1};
          left: 20px;
          bottom: 40px;
        }

        .select {
          position: absolute;
          bottom: 0;
          width: 100%;
          border: none;
          border-bottom: 2px solid #c6d2e1;
          padding: 12px 20px;
          background: transparent;
          outline: 0;
          color: ${primaryColor};
          font-family: Montserrat;
          font-style: normal;
          font-weight: bold;
          font-size: 17px;
          line-height: 21px;
          appearance: none;
        }

        option {
          height: 40px;
          color: ${primaryColor};
          font-family: Montserrat;
          font-style: normal;
          font-weight: bold;
          font-size: 17px;
          display: flex;
          align-items: center;
        }

        option:selected {
          background: red;
        }
      `}</style>
    </>
  );
}

Select.defaultProps = {
  labelColor: 'rgba(0, 49, 102, 0.53)',
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  labelColor: PropTypes.string,
};

export default Select;
