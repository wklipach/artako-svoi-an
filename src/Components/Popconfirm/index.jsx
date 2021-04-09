import React from 'react';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTheme } from '../../lib/theme';

function Popconfirm({ onDelete, onClose, message }) {
  const { secondaryColor, primaryColor, fourthColor } = useTheme();

  return (
    <Box
      width={300}
      bgcolor={fourthColor}
      borderRadius={20}
      p={2}
      border="1px solid #777777"
    >
      <Box>{message}</Box>
      <Box display="flex" justifyContent="flex-end">
        <Box
          bgcolor={secondaryColor}
          mr={3}
          style={{ cursor: 'pointer' }}
          py={0.5}
          px={2}
          borderRadius={10}
          color={primaryColor}
          onClick={onDelete}
        >
          Да
        </Box>
        <Box
          bgcolor={secondaryColor}
          style={{ cursor: 'pointer' }}
          py={0.5}
          px={2}
          borderRadius={10}
          color={primaryColor}
          onClick={onClose}
        >
          Нет
        </Box>
      </Box>
    </Box>
  );
}

Popconfirm.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default Popconfirm;
