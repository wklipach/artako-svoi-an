import React from 'react';
import { Box } from '@material-ui/core';

function Balance() {
  return (
    <Box bgcolor="transparent" ml={6.5}>
      <Box
        width={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        mt={15}
      >
        <Box component="img" src="/Character.png" alt="image" />
      </Box>
    </Box>
  );
}

export default Balance;
