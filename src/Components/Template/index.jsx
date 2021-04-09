import React from 'react';
import PropTypes from 'prop-types';

import SideBar from '../SideBar';
import { Box } from '@material-ui/core';

function Template({ children, isMenuOpen, setIsMenuOpen }) {
  return (
    <Box display="flex" minHeight="100vh" maxWidth="100vw" position="relative">
      <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Box
        bgcolor="#F2F6FB"
        maxWidth={{ sm: 1, md: 'calc(100% - 280px)' }}
        width={{ xs: 1, sm: 1, md: 'calc(100% - 280px)' }}
        opacity={isMenuOpen ? 0.1 : 1}
      >
        {children}
      </Box>
    </Box>
  );
}

Template.propTypes = {
  children: PropTypes.node.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
};

export default Template;
