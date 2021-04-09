import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext({});

function ThemeProvider({ children }) {
  const [primaryColor, setPrimaryColor] = useState('#003166');
  const [secondaryColor, setSecondaryColor] = useState('#007AFF');
  const [thirdColor, setThirdColor] = useState('#E9F0F9');
  const [fourthColor, setFourthColor] = useState('#FFFFFF');

  return (
    <>
      <ThemeContext.Provider
        value={{
          primaryColor,
          setPrimaryColor,
          secondaryColor,
          setSecondaryColor,
          thirdColor,
          setThirdColor,
          fourthColor,
          setFourthColor,
        }}
      >
        {children}
      </ThemeContext.Provider>
      <style jsx>{`
        :global(.MuiPickersToolbar-toolbar) {
          background-color: ${secondaryColor};
        }
        :global(.MuiPickersDay-daySelected) {
          background-color: ${secondaryColor};
        }
        :global(.MuiDialogActions-root > button) {
          color: ${primaryColor};
        }
        :global(.MuiInput-underline:hover:not(.Mui-disabled):before) {
          border-color: #c6d2e1;
        }
        :global(.MuiInput-underline:after) {
          border-color: ${secondaryColor};
        }
        :global(.search-input) {
          padding: 16px 40px;
          font-size: 17px;
          font-weight: 500;
          line-height: 21px;
          color: #003166;
          border: 0;
          display: flex;
          border-radius: 10px;
          max-width: 500px;
          width: 100%;
          outline: 0;
        }
        :global(.search-input::placeholder) {
          color: ${primaryColor};
          font-size: 15px;
          font-weight: 500;
        }
        :global(.MuiCheckbox-root) {
          color: ${secondaryColor}!important;
        }
        :global(.MuiCheckbox-colorSecondary.Mui-checked) {
          color: ${secondaryColor}!important;
        }
      `}</style>
    </>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useTheme = () => {
  return useContext(ThemeContext);
};

export { ThemeProvider, useTheme };
