import React, { useState } from 'react';
import Head from 'next/head';
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
import ShownPassIcon from '../Components/CustomIcons/shownPass';
import HiddenPassIcon from '../Components/CustomIcons/hiddenPass';

import styles from '../styles/Home.module.scss';

export default function SignIn() {
  const { push } = useRouter();
  const { login } = useAuth();
  const isTablet = useMediaQuery({ maxWidth: 960 });
  const { primaryColor, secondaryColor, fourthColor } = useTheme();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  function onLogin() {
    login({ phone, password }).then(res => {
      if (res.status === 'success') {
        push('/profile');
      } else {
        setError(res.error);
      }
    });
  }

  function renderError() {
    switch (error) {
      case 'USER_BANNED':
        return 'Пользовать заблокирован.';
      case 'NEED_ACTIVATION':
        return 'Необходимо отправить код, отправленный на указанный номер телефона.';
      default:
        return 'Пользователь с такими данными не найден.';
    }
  }

  return (
    <>
      <Head>
        <title>Логин | Свои</title>
      </Head>
      <Box
        className={styles.root}
        display={isTablet ? 'flex' : 'grid'}
        gridTemplateColumns="40% 60%"
        bgcolor={fourthColor}
      >
        <Box
          p={{ sm: 2.5, xs: 2.5, md: 4.5 }}
          display="flex"
          flexDirection="column"
          width={1}
          position="relative"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent={isTablet ? 'center' : 'unset'}
            position={isTablet ? 'relative' : 'unset'}
            style={!isTablet ? { cursor: 'pointer' } : { cursor: 'unset' }}
            onClick={() => !isTablet && push('/')}
          >
            <Box
              position={isTablet ? 'absolute' : 'unset'}
              left={0}
              onClick={() => isTablet && push('/')}
            >
              <CloseIcon style={{ color: primaryColor }} />
            </Box>
            <Box color={primaryColor} fontSize={22} fontWeight={700} ml={1}>
              Авторизация
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
          >
            <Box
              display={isTablet ? 'flex' : 'block'}
              justfyContent="center"
              flexDirection="column"
              alignItems={{ sm: 'center', xs: 'center', md: 'flex-start' }}
            >
              <Logo fill={secondaryColor} />
              <Box width={338} my={!isTablet ? 12 : 4.5}>
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
                <Input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  label="Телефон"
                  name="phone"
                  first
                />
                <Input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type={showPass ? 'text' : 'password'}
                  label="Пароль"
                  name="name"
                  last
                  removeBorderTop
                  addOn={
                    <Box
                      position="absolute"
                      right={20}
                      bottom={0}
                      top={0}
                      display="flex"
                      alignItems="center"
                    >
                      <Box
                        onClick={() => push('/lostpass')}
                        width={36}
                        height={34}
                        bgcolor="#d3ddee"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        zIndex={1}
                        borderRadius="50%"
                        style={{ cursor: 'pointer' }}
                      >
                        <span
                          style={{
                            fontWeight: 900,
                            fontSize: '15px',
                            color: '#1684F2',
                            lineHeight: '22px',
                          }}
                        >
                          ?
                        </span>
                      </Box>
                      <Box
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowPass(p => !p)}
                        ml={1}
                      >
                        {showPass ? <ShownPassIcon /> : <HiddenPassIcon />}
                      </Box>
                    </Box>
                  }
                />
                <Box width={1} mt={5}>
                  <Button onClick={() => onLogin()}>Войти</Button>
                </Box>
              </Box>
              <Box>
                <Box
                  color={secondaryColor}
                  fontSize={15}
                  fontWeight={600}
                  textAlign="center"
                >
                  Нет аккаунта?{' '}
                  <Box
                    component="span"
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => push('/reg')}
                  >
                    Зарегистрироваться
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            textAlign="center"
            fontWeight={700}
            fontSize={16}
            color={primaryColor}
            position="absolute"
            bottom={12}
            left={0}
            right={0}
          >
            Помощь: 8 (800)770-78-67
          </Box>
        </Box>
        {!isTablet && <AuthRight />}
      </Box>
    </>
  );
}
