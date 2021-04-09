import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, ClickAwayListener } from '@material-ui/core';

import { useTheme } from '../../lib/theme';

import UserMenuIcon from '../CustomIcons/userMenu';
import StarIcon from '../CustomIcons/star';
import BalanceRightIcon from '../CustomIcons/balanceRight';

function ControlUserCard({
  setIsUserMenuOpened,
  user,
  changeRole,
  isUserMenuOpened,
  isMobile,
  setUserPoints,
  workspaceId,
  setUserBalance,
  viewWorkspace,
}) {
  const { primaryColor, secondaryColor, fourthColor } = useTheme();

  const [balance, setBalance] = useState(user.user_balance);
  const [points, setPoints] = useState(user.user_points);

  function handlePointsChnage(e) {
    const { value } = e.target;
    if (!isNaN(+value)) {
      setPoints(value);
    }
  }

  function handleBalanceChnage(e) {
    const { value } = e.target;
    if (!isNaN(+value)) {
      setBalance(value);
    }
  }

  function savePoints(e) {
    if (e.which == 13) {
      setUserPoints({ user_id: user.id, points, id: workspaceId }).then(res => {
        if (res.status === 'success') {
          viewWorkspace({ id: workspaceId });
        }
      });
    }
  }

  function saveBalance(e) {
    if (e.which == 13) {
      setUserBalance({ user_id: user.id, balance, id: workspaceId }).then(
        res => {
          if (res.status === 'success') {
            viewWorkspace({ id: workspaceId });
          } else if (res.error === 'BALANCE_NOT_FOUND') {
            setBalance(user.user_balance);
            alert('Передан баланс меньше баланса рабочего пространства');
          }
        },
      );
    }
  }

  return (
    <>
      <div className="control-users-card">
        <Box
          pt={3.5}
          pb={4.5}
          px={4}
          bgcolor={fourthColor}
          borderRadius={10}
          mb={2}
        >
          <Box width={1} display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <Box
                bgcolor="#000"
                borderRadius="50%"
                width={50}
                height={50}
                overflow="hidden"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {user.photo !== '' && (
                  <Box
                    component="img"
                    src={user.photo}
                    width={1}
                    minHeight={1}
                  />
                )}
              </Box>
              <Box ml={1.5} display="flex" flexDirection="column">
                <Box
                  component="span"
                  fontSize={17}
                  fontWeight={600}
                  color={primaryColor}
                >
                  {user.name}
                </Box>
                <Box
                  component="span"
                  fontSize={17}
                  fontWeight={400}
                  color={primaryColor}
                >
                  {`+${user.phone}`}
                </Box>
              </Box>
            </Box>
            <Box position="relative">
              <Box
                width={24}
                display="flex"
                justifyContent="center"
                style={{ cursor: 'pointer' }}
                onClick={() => setIsUserMenuOpened(user.id)}
              >
                <UserMenuIcon fill={primaryColor} />
              </Box>
              {isUserMenuOpened === user.id && (
                <ClickAwayListener onClickAway={() => setIsUserMenuOpened('')}>
                  <Box
                    position="absolute"
                    right={{ sm: -20, xs: -20, md: 12 }}
                    top={20}
                    px={1.5}
                    border="1px solid rgba(0, 49, 102, 0.14)"
                    borderRadius={10}
                    bgcolor={fourthColor}
                    width="max-content"
                    maxWidth={{ sm: 260, xs: 260, md: 'unset' }}
                    zIndex={1}
                  >
                    {user.role === 4 && (
                      <>
                        <Box
                          width={1}
                          color={primaryColor}
                          fontSize={15}
                          fontWeight={600}
                          py={2.5}
                          borderBottom="1px solid rgba(0, 49, 102, 0.14)"
                          style={{ cursor: 'pointer' }}
                          onClick={() => changeRole(user, 1)}
                        >
                          Назначить администратором
                        </Box>
                        <Box
                          width={1}
                          color={secondaryColor}
                          fontSize={15}
                          fontWeight={600}
                          py={2.5}
                          style={{ cursor: 'pointer' }}
                          onClick={() => changeRole(user, 0)}
                        >
                          Удалить из рабочего пространства
                        </Box>
                      </>
                    )}
                    {user.role === 5 && (
                      <>
                        <Box
                          width={1}
                          color={primaryColor}
                          fontSize={15}
                          fontWeight={600}
                          py={2.5}
                          borderBottom="1px solid rgba(0, 49, 102, 0.14)"
                          style={{ cursor: 'pointer' }}
                          onClick={() => changeRole(user, 4)}
                        >
                          Принять
                        </Box>
                        <Box
                          width={1}
                          color={secondaryColor}
                          fontSize={15}
                          fontWeight={600}
                          py={2.5}
                          style={{ cursor: 'pointer' }}
                          onClick={() => changeRole(user, 0)}
                        >
                          Отклонить
                        </Box>
                      </>
                    )}
                    {user.role === 1 && (
                      <>
                        <Box
                          width={1}
                          color={primaryColor}
                          fontSize={15}
                          fontWeight={600}
                          py={2.5}
                          borderBottom="1px solid rgba(0, 49, 102, 0.14)"
                          style={{ cursor: 'pointer' }}
                          onClick={() => changeRole(user, 4)}
                        >
                          Разжаловать администратора
                        </Box>
                        <Box
                          width={1}
                          color={secondaryColor}
                          fontSize={15}
                          fontWeight={600}
                          py={2.5}
                          style={{ cursor: 'pointer' }}
                          onClick={() => changeRole(user, 0)}
                        >
                          Удалить из рабочего пространства
                        </Box>
                      </>
                    )}
                  </Box>
                </ClickAwayListener>
              )}
            </Box>
          </Box>
          <Box
            mt={4}
            display="flex"
            flexDirection={{
              sm: 'row-reverse',
              xs: 'row-reverse',
              md: 'row',
            }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" maxWidth={0.5}>
              <StarIcon
                fill={isMobile && '#003166'}
                fillOpacity={isMobile && '1'}
              />
              <Box
                component="span"
                fontSize={17}
                fontWeight={{ sm: 500, xs: 500, md: 400 }}
                ml={1}
                color={primaryColor}
                style={{ opacity: 0.4 }}
                maxWidth={0.8}
              >
                <input
                  type="text"
                  onChange={handlePointsChnage}
                  value={points}
                  className="point-input"
                  onKeyPress={savePoints}
                />
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <BalanceRightIcon
                fill={isMobile && '#003166'}
                fillOpacity={isMobile && '1'}
              />
              <Box
                component="span"
                fontSize={17}
                fontWeight={{ sm: 500, xs: 500, md: 400 }}
                ml={1}
                color={primaryColor}
                style={{ opacity: 0.4 }}
                maxWidth={0.8}
              >
                <input
                  type="text"
                  onChange={handleBalanceChnage}
                  value={balance}
                  className="point-input"
                  onKeyPress={saveBalance}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
      <style jsx>{`
        .point-input {
          border: 0;
          outline: 0;
          background: transparent;
          font-weight: 400;
          font-size: 17px;
          color: ${primaryColor};
          max-width: 80%;
        }
      `}</style>
    </>
  );
}

ControlUserCard.propTypes = {
  setUserPoints: PropTypes.func.isRequired,
  viewWorkspace: PropTypes.func.isRequired,
  setUserBalance: PropTypes.func.isRequired,
  setIsUserMenuOpened: PropTypes.func.isRequired,
  isUserMenuOpened: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  changeRole: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
  workspaceId: PropTypes.number.isRequired,
};

export default ControlUserCard;
