import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Box, ClickAwayListener } from '@material-ui/core';
import { QRCode } from 'react-qr-svg';
import Button from '../Button';
import StarIcon from '../CustomIcons/star';
import BalanceRightIcon from '../CustomIcons/balanceRight';
import WarningIcon from '@material-ui/icons/Warning';

import { useTheme } from '../../lib/theme';

function DiscountModal({
  setDiscountData,
  discountData,
  activateDiscount,
  wsId,
  partnerId,
}) {
  const { fourthColor, primaryColor, thirdColor, secondaryColor } = useTheme();
  const [discount, setDiscount] = useState(null);
  const [notEnough, setNotEnough] = useState(false);

  useEffect(() => {
    if (discountData.price_points == 0 && discountData.price_balance == 0) {
      getDiscount();
    }
  }, []);

  const getDiscount = useCallback(() => {
    activateDiscount({
      id: wsId,
      partner_id: partnerId,
      discount_id: discountData.id,
    }).then(res => {
      if (res.status === 'success') {
        setDiscount({
          value: res.data.value,
        });
      } else if (res.error && res.error === 'NOT_ENOUGH') {
        setNotEnough(true);
      }
    });
  }, [discountData, activateDiscount, setDiscount, setNotEnough]);

  return (
    <Box
      position="fixed"
      top={0}
      bottom={0}
      left={0}
      right={0}
      zIndex={1000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="rgba(0, 49, 102, 0.24)"
    >
      <ClickAwayListener onClickAway={() => setDiscountData(null)}>
        {discount === null &&
        (discountData.price_points > 0 || discountData.price_balance > 0) ? (
          <Box
            py={9}
            px={3.5}
            display="flex"
            justifyContent="center"
            bgcolor={fourthColor}
            flexDirection="column"
          >
            <Box
              color={primaryColor}
              textAlign="center"
              fontSize={22}
              fontWeight={700}
              width={400}
            >
              ЗА ПОЛУЧЕНИЕ ДАННОЙ ЛЬГОТЫ С ВАС БУДЕТ СПИСАНО:
            </Box>
            <Box display="flex" justifyContent="center" mb={10}>
              {discountData.price_points > 0 && (
                <Box
                  display="flex"
                  alignItems="center"
                  fontSize={22}
                  fontWeight={700}
                  color={primaryColor}
                >
                  <Box mr={0.5}>{discountData.price_points}</Box>
                  <StarIcon fill={primaryColor} />
                  {discountData.price_balance !== 0 && <Box mx={0.5}>+</Box>}
                </Box>
              )}
              {discountData.price_balance > 0 && (
                <Box
                  display="flex"
                  alignItems="center"
                  fontSize={22}
                  fontWeight={700}
                  color={primaryColor}
                >
                  <Box mr={0.5}>{discountData.price_balance}</Box>
                  <BalanceRightIcon />
                </Box>
              )}
            </Box>
            {notEnough && (
              <Box
                component="div"
                display="flex"
                justifyContent="center"
                width={1}
                maxWidth={380}
                alignItems="center"
              >
                <WarningIcon style={{ color: '#F2512D' }} />
                <Box color="#F2512D" ml={2} fontSize={20}>
                  У Вас недостаточно баллов или рублей для покупки скидки
                </Box>
              </Box>
            )}
            <Box width={380} maxWidth={1}>
              {!notEnough && <Button onClick={getDiscount}>Согласиться</Button>}
              <Box mt={2}>
                <Button
                  onClick={() => setDiscountData(null)}
                  bgcolor="transparent"
                  hoverBg={secondaryColor}
                  color={primaryColor}
                >
                  Отказаться
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            py={9}
            px={3.5}
            display="flex"
            justifyContent="center"
            bgcolor={fourthColor}
          >
            {discountData.receiving_type == 0 && (
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  color={primaryColor}
                  textAlign="center"
                  fontSize={22}
                  fontWeight={700}
                  mb={6}
                  width={400}
                >
                  ДЛЯ ПОЛУЧЕНИЯ ЛЬГОТЫ ПОКАЖИТЕ ЭТОТ КОД:
                </Box>
                {discount && (
                  <QRCode
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="Q"
                    style={{ width: 200 }}
                    value={discount.value}
                  />
                )}
              </Box>
            )}
            {(discountData.receiving_type == 1 ||
              discountData.receiving_type == 3) && (
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  color={primaryColor}
                  textAlign="center"
                  fontSize={22}
                  fontWeight={700}
                  mb={6}
                  width={400}
                >
                  ДЛЯ ПОЛУЧЕНИЯ ЛЬГОТЫ ИСПОЛЬЗУЙТЕ ПРОМО-КОД:
                </Box>
                {discount && (
                  <Box
                    px={2}
                    py={5.5}
                    bgcolor={thirdColor}
                    color={primaryColor}
                    borderRadius={27}
                    fontSize={36}
                    fontWeight={700}
                  >
                    {discount.value}
                  </Box>
                )}
              </Box>
            )}
            {discountData.receiving_type == 2 && (
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  color={primaryColor}
                  textAlign="center"
                  fontSize={22}
                  fontWeight={700}
                  mb={6}
                  width={400}
                >
                  ДЛЯ ПОЛУЧЕНИЯ ЛЬГОТЫ ПОКАЖИТЕ ЭТОТ КОД:
                </Box>
                {discount && (
                  <Box component="img" src={discount.value} maxWidth={300} />
                )}
              </Box>
            )}
            {discountData.receiving_type == 4 && (
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  color={primaryColor}
                  textAlign="center"
                  fontSize={22}
                  fontWeight={700}
                  mb={6}
                  width={400}
                >
                  ДЛЯ ПОЛУЧЕНИЯ ЛЬГОТЫ ПЕРЕЙДИТЕ НА САЙТ ПАРТНЕРА ЧЕРЕЗ ЭТУ
                  КНОПКУ:
                </Box>
                {discount && (
                  <Button
                    onClick={() => {
                      window.open(discount.value, '_blank');
                    }}
                  >
                    Получить льготу
                  </Button>
                )}
              </Box>
            )}
          </Box>
        )}
      </ClickAwayListener>
    </Box>
  );
}

DiscountModal.propTypes = {
  setDiscountData: PropTypes.func.isRequired,
  discountData: PropTypes.shape().isRequired,
  activateDiscount: PropTypes.func.isRequired,
  wsId: PropTypes.any.isRequired,
  partnerId: PropTypes.any.isRequired,
};

export default DiscountModal;
