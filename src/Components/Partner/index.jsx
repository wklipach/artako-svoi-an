import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import CustomSwitch from '../Switch/switch';

import { useTheme } from '../../lib/theme';

import StarIcon from '../CustomIcons/star';
import BalanceRightIcon from '../CustomIcons/balanceRight';

function Partner({ item, handleSet }) {
  const { primaryColor, fourthColor } = useTheme();
  const [check, setCheck] = useState(item.on == 1);

  useEffect(() => {
    setCheck(item.on == 1);
  }, [item]);

  function onCheck() {
    handleSet(item.id, !check);
    setCheck(!check);
  }

  return (
    <Box
      width={338}
      maxHeight={480}
      height={440}
      borderRadius={19}
      position="relative"
      mx={2.5}
      onClick={() => {
        window.open(`/place?id=${item.id}&referrer=settings`);
      }}
      style={{ cursor: 'pointer' }}
    >
      <Box
        position="absolute"
        top={0}
        right={0}
        zIndex={2}
        onClick={e => e.stopPropagation()}
      >
        <CustomSwitch checked={check} onChange={() => onCheck(item.id)} />
      </Box>
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        overflow="hidden"
        borderRadius={20}
      >
        {item.gallery[0] !== '' ? (
          <Box
            component="img"
            src={item.gallery[0]}
            borderRadius={20}
            height={236}
          />
        ) : (
          <Box borderRadius={20} minHeight={236} width={1} bgcolor="#ccc" />
        )}
        <Box position="absolute" top={0} right={0} />
      </Box>
      <Box
        py={6}
        px={2.5}
        width={1}
        bgcolor={fourthColor}
        position="absolute"
        borderRadius={19}
        top={200}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        style={{ cursor: 'pointer' }}
        maxHeight={176}
        height={176}
      >
        <Box
          display="flex"
          justifyContent="center"
          overflow="hidden"
          alignItems="center"
          height={75}
          width={75}
          position="absolute"
          top="-37.5px"
          left="calc(50% - 37.5px)"
          borderRadius="50%"
          bgcolor="#fff"
          border="1px solid rgba(0, 49, 102, 0.17)"
        >
          {item.logo !== '' ? (
            <Box component="img" src={item.logo} maxWidth={1} />
          ) : (
            <Box width={1} height={1} bgcolor="#fff" />
          )}
        </Box>
        <Box
          component="span"
          fontSize={17}
          fontWeight={600}
          color={primaryColor}
          mb={1}
        >
          {item.title}
        </Box>

        {(item.discount !== 0 ||
          item.discount_balance !== 0 ||
          item.discount_points !== 0) && (
          <Box
            component="span"
            fontSize={17}
            fontWeight={500}
            color={primaryColor}
            display="flex"
          >
            <Box mr={0.5}>Скидка:</Box>
            {item.discount !== 0 && (
              <Box display="flex">
                <Box>{`${item.discount}${
                  item.discount_type === 1 ? '₽' : '%'
                }`}</Box>
                {(item.discount_points !== 0 ||
                  item.discount_balance !== 0) && <Box mx={0.5}>+</Box>}
              </Box>
            )}
            {item.discount_points !== 0 && (
              <Box display="flex">
                <Box mr={0.5}>{`${item.discount_points}%`}</Box>
                <StarIcon fill={primaryColor} />
                {item.discount_balance !== 0 && <Box mx={0.5}>+</Box>}
              </Box>
            )}
            {item.discount_balance !== 0 && (
              <Box display="flex" alignItems="center">
                <Box mr={0.5}>{`${item.discount_balance}%`}</Box>
                <BalanceRightIcon />
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}

Partner.propTypes = {
  item: PropTypes.shape().isRequired,
  handleSet: PropTypes.func.isRequired,
};

export default Partner;
