import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import CustomSwitch from '../../Switch/switch';
import PercentIcon from '../../CustomIcons/percentIcon';
import MessengerIcon from '../../CustomIcons/messenger';
import NewsIcon from '../../CustomIcons/news';
import IdeaIcon from '../../CustomIcons/idea';
import ContestIcon from '../../CustomIcons/contest';
import { useTheme } from '../../../lib/theme';

function Modules({
  onSwitch,
  messengerState,
  newsState,
  ideasState,
  contestsState,
  cafeteriaState,
}) {
  const { primaryColor, fourthColor } = useTheme();

  return (
    <Box
      bgcolor={fourthColor}
      px={{ xs: 0, sm: 4 }}
      py={2}
      borderRadius={{ xs: 0, sm: 10 }}
      mt={2}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={1}
        borderBottom="1px solid rgba(198, 210, 225, 0.74)"
      >
        <Box display="flex" alignItems="center">
          <Box ml={{ xs: 2, sm: 0 }}>
            <PercentIcon width={28} height={28} />
          </Box>
          <Box
            component="span"
            pl={2}
            fontSize={15}
            fontWeight={700}
            color={primaryColor}
          >
            Витрина скидок
          </Box>
        </Box>
        <CustomSwitch
          checked={cafeteriaState}
          onChange={() => onSwitch(!cafeteriaState, 'cafeteria')}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={1}
        borderBottom="1px solid rgba(198, 210, 225, 0.74)"
      >
        <Box display="flex" alignItems="center">
          <Box
            width={28}
            height={28}
            borderRadius="50%"
            bgcolor="#0FC9F2"
            display="flex"
            justifyContent="center"
            alignItems="center"
            ml={{ xs: 2, sm: 0 }}
          >
            <MessengerIcon />
          </Box>
          <Box
            component="span"
            pl={2}
            fontSize={15}
            fontWeight={700}
            color={primaryColor}
          >
            Мессенджер
          </Box>
        </Box>
        <CustomSwitch
          checked={messengerState}
          onChange={() => onSwitch(!messengerState, 'messenger')}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={1}
        borderBottom="1px solid rgba(198, 210, 225, 0.74)"
      >
        <Box display="flex" alignItems="center">
          <Box
            width={28}
            height={28}
            borderRadius="50%"
            bgcolor="#22BC84"
            display="flex"
            justifyContent="center"
            alignItems="center"
            ml={{ xs: 2, sm: 0 }}
          >
            <NewsIcon />
          </Box>
          <Box
            component="span"
            pl={2}
            fontSize={15}
            fontWeight={700}
            color={primaryColor}
          >
            Новости
          </Box>
        </Box>
        <CustomSwitch
          checked={newsState}
          onChange={() => onSwitch(!newsState, 'news')}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={1}
        borderBottom="1px solid rgba(198, 210, 225, 0.74)"
      >
        <Box display="flex" alignItems="center">
          <Box
            width={28}
            height={28}
            borderRadius="50%"
            bgcolor="#86DC18"
            display="flex"
            justifyContent="center"
            alignItems="center"
            ml={{ xs: 2, sm: 0 }}
          >
            <IdeaIcon />
          </Box>
          <Box
            component="span"
            pl={2}
            fontSize={15}
            fontWeight={700}
            color={primaryColor}
          >
            Идеи
          </Box>
        </Box>
        <CustomSwitch
          checked={ideasState}
          onChange={() => onSwitch(!ideasState, 'ideas')}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={1}
      >
        <Box display="flex" alignItems="center">
          <Box
            width={28}
            height={28}
            borderRadius="50%"
            bgcolor="#FFB800"
            display="flex"
            justifyContent="center"
            alignItems="center"
            ml={{ xs: 2, sm: 0 }}
          >
            <ContestIcon />
          </Box>
          <Box
            component="span"
            pl={2}
            fontSize={15}
            fontWeight={700}
            color={primaryColor}
          >
            Конкурсы
          </Box>
        </Box>
        <CustomSwitch
          checked={contestsState}
          onChange={() => onSwitch(!contestsState, 'contests')}
        />
      </Box>
    </Box>
  );
}

Modules.propTypes = {
  onSwitch: PropTypes.func.isRequired,
  messengerState: PropTypes.bool.isRequired,
  newsState: PropTypes.bool.isRequired,
  ideasState: PropTypes.bool.isRequired,
  contestsState: PropTypes.bool.isRequired,
  cafeteriaState: PropTypes.bool.isRequired,
};

export default Modules;
