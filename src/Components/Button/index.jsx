import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../lib/theme';

function Button({
  children,
  onClick,
  bgcolor,
  color,
  fontSize,
  fontWeight,
  height,
  hoverBg,
  disabeled,
}) {
  const { secondaryColor, fourthColor } = useTheme();
  return (
    <>
      <div className="root" onClick={!disabeled ? onClick : () => {}}>
        {children}
      </div>
      <style jsx>{`
        .root {
          height: ${height};
          width: 100%;
          border-radius: 10px;
          background-color: ${bgcolor !== '' ? bgcolor : secondaryColor};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${fontSize};
          font-weight: ${fontWeight};
          cursor: pointer;
          color: ${color !== '' ? color : fourthColor};
        }

        .root:hover {
          background-color: ${hoverBg !== '' ? hoverBg : secondaryColor};
        }
      `}</style>
    </>
  );
}

Button.defaultProps = {
  bgcolor: '',
  color: '',
  fontSize: '16px',
  fontWeight: '700',
  height: '60px',
  hoverBg: '',
  disabeled: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  bgcolor: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  height: PropTypes.string,
  hoverBg: PropTypes.string,
  disabeled: PropTypes.bool,
};

export default Button;
