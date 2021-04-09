import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import Switch from '@material-ui/core/Switch';
import { useTheme } from '../../lib/theme';

function CustomSwitch({ checked, onChange }) {
  const { secondaryColor } = useTheme();

  const IOSSwitch = withStyles(theme => ({
    root: {
      width: 51,
      height: 30,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 2,
      '&$checked': {
        transform: 'translateX(22px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: `${secondaryColor}`,
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: `${secondaryColor}`,
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 26,
      height: 26,
    },
    track: {
      borderRadius: 36 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  return (
    <FormControlLabel
      control={
        <IOSSwitch checked={checked} onChange={onChange} name="checkedB" />
      }
      label=""
    />
  );
}

CustomSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomSwitch;
