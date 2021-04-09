import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { Box } from '@material-ui/core';

import DesignIcon from '../../CustomIcons/designIcon';
import PolygonIcon from '../../CustomIcons/polygonIcon';
import UserIcon from '../../CustomIcons/userIcon';
import PercentIcon from '../../CustomIcons/percentIcon';
import BalanceIcon from '../../CustomIcons/balanceIcon';
import SettingIcon from '../../CustomIcons/settingIcon';
import { useTheme } from '../../../lib/theme';

function Control({ isMobile }) {
  const { push } = useRouter();
  const { primaryColor, fourthColor } = useTheme();

  return (
    <Box
      bgcolor={fourthColor}
      px={{ xs: 2.5, sm: 2.5, md: 5 }}
      py={{ xs: 2.5, sm: 2.5, md: 7 }}
      maxWidth={600}
      borderRadius={10}
      mx={{ xs: 'auto', sm: 'auto', md: 0 }}
    >
      {!isMobile && (
        <Box component="h3" fontSize={24} fontWeight={400} color={primaryColor}>
          Добро пожаловать на страницу управления Вашим рабочим пространством!
        </Box>
      )}
      <Box mt={{ xs: 0, sm: 0, md: 6.5 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={2.5}
          style={{ cursor: 'pointer' }}
          borderBottom="1px solid rgba(198, 210, 225, 0.74)"
          onClick={() => push('/control-design')}
        >
          <Box display="flex" alignItems="center">
            <DesignIcon />
            <Box
              pl={2.5}
              component="span"
              fontSize={15}
              fontWeight={700}
              color={primaryColor}
            >
              Управление дизайном
            </Box>
          </Box>
          <PolygonIcon />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={2.5}
          style={{ cursor: 'pointer' }}
          onClick={() => push('/control-users')}
          borderBottom="1px solid rgba(198, 210, 225, 0.74)"
        >
          <Box display="flex" alignItems="center">
            <UserIcon />
            <Box
              pl={2.5}
              component="span"
              fontSize={15}
              fontWeight={700}
              color={primaryColor}
            >
              Управление пользователями
            </Box>
          </Box>
          <PolygonIcon />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={2.5}
          style={{ cursor: 'pointer' }}
          borderBottom="1px solid rgba(198, 210, 225, 0.74)"
          onClick={() => push('/cafeteria-settings')}
        >
          <Box display="flex" alignItems="center">
            <PercentIcon />
            <Box
              pl={2.5}
              component="span"
              fontSize={15}
              fontWeight={700}
              color={primaryColor}
            >
              Доступные льготы
            </Box>
          </Box>
          <PolygonIcon />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={2.5}
          style={{ cursor: 'pointer' }}
          borderBottom="1px solid rgba(198, 210, 225, 0.74)"
          onClick={() => push('/all-settings')}
        >
          <Box display="flex" alignItems="center">
            <SettingIcon />
            <Box
              pl={2.5}
              component="span"
              fontSize={15}
              fontWeight={700}
              color={primaryColor}
            >
              Общие настройки
            </Box>
          </Box>
          <PolygonIcon />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={2.5}
          style={{ cursor: 'pointer' }}
        >
          <Box display="flex" alignItems="center">
            <BalanceIcon />
            <Box
              pl={2.5}
              component="span"
              fontSize={15}
              fontWeight={700}
              color={primaryColor}
            >
              Баланс и взаиморасчеты
            </Box>
          </Box>
          <PolygonIcon />
        </Box>
      </Box>
    </Box>
  );
}

Control.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default Control;
