import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

// Components
import { Box } from '@material-ui/core';
import Button from '../Components/Button';
import Input from '../Components/Input';
import AuthRight from '../Components/AuthRight';

import { useAuth } from '../lib/api/auth';
import { useTheme } from '../lib/theme';

import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import Logo from '../Components/CustomIcons/logo';

import styles from '../styles/Home.module.scss';

export default function ChangePhone() {
  const { push } = useRouter();
  const { editmailphone } = useAuth();
  const { primaryColor, secondaryColor, fourthColor } = useTheme();

  const isTablet = useMediaQuery({ maxWidth: 960 });
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  function sendCode() {
    localStorage.setItem('new-phone', phone);

    editmailphone({ phone_or_mail: phone }).then(res => {
      if (res.status === 'success') {
        push('/bindnewphone');
      } else {
        setError(res.error);
      }
    });
  }

  function renderError() {
    switch (error) {
      case 'TOKEN_NOT_FOUND':
        return 'Передан неверный токен.';
      case 'INCORRECT_PHONE_OR_MAIL':
        return 'Номер телефона не верен.';
      case 'PHONE_OR_MAIL_NOT_FOUND':
        return 'Номер телефона не найден.';
      case 'ALREADY_EXISTS':
        return 'Пользователь с таким телефоном уже существует.';
      default:
        return 'Пользователь с таким телефоном уже существует.';
    }
  }

  return (
    <Box
      className={styles.root}
      display={isTablet ? 'flex' : 'grid'}
      gridTemplateColumns={isTablet ? '60% 40%' : '40% 60%'}
      bgcolor={fourthColor}
    >
      <Box
        p={{ sm: 2.5, xs: 2.5, md: 4.5 }}
        display="flex"
        flexDirection="column"
        width={1}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={isTablet ? 'center' : 'unset'}
          position={isTablet ? 'relative' : 'unset'}
          style={!isTablet ? { cursor: 'pointer' } : { cursor: 'unset' }}
          onClick={() => !isTablet && push('/profile')}
        >
          <Box
            position={isTablet ? 'absolute' : 'unset'}
            left={0}
            onClick={() => isTablet && push('/profile')}
          >
            <CloseIcon style={{ color: `${primaryColor}` }} />
          </Box>
          <Box
            color={primaryColor}
            fontSize={22}
            fontWeight={700}
            ml={1}
            textAlign={{ sm: 'center', xs: 'center', md: 'left' }}
            maxWidth={0.9}
          >
            Изменение номера телефона
          </Box>
        </Box>
        {isTablet && (
          <Box component="img" src="/authMobile.svg" alt="alt" pt={4} />
        )}
        <Box
          flex={1}
          py={isTablet ? 0 : 10}
          display="flex"
          justifyContent="center"
          alignItems={{ sm: 'center', xs: 'center', md: 'unset' }}
        >
          <Box
            display={isTablet ? 'flex' : 'block'}
            justfyContent="center"
            alignItems={{ sm: 'center', xs: 'center', md: 'flex-start' }}
            flexDirection="column"
          >
            <Logo fill={secondaryColor} />
            <Box
              maxWidth="360px"
              fontSize={24}
              lineHeight="32px"
              fontWeight={400}
              color={primaryColor}
              my={isTablet ? 4.5 : 7.5}
              textAlign={isTablet ? 'center' : 'left'}
            >
              Для смены номера телефона укажите новый
            </Box>
            {error && (
              <Box
                component="div"
                display="flex"
                justifyContent="center"
                width={1}
                pb={4}
              >
                <WarningIcon style={{ color: '#F2512D' }} />
                <Box color="#F2512D" ml={2} fontSize={20}>
                  {renderError()}
                </Box>
              </Box>
            )}
            <Box width={338} my={!isTablet ? 12 : 4.5}>
              <Input
                value={phone}
                activeBorderColor={secondaryColor}
                labelColor={primaryColor}
                clearColor={secondaryColor}
                onChange={e => {
                  if (error) {
                    setError(false);
                  }
                  setPhone(e.target.value);
                }}
                label="Телефон"
                name="phone"
              />
              <Box width={1} mt={5}>
                <Button onClick={sendCode}>Изменить номер</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {!isTablet && <AuthRight />}
    </Box>
  );
}
