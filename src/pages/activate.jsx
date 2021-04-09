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

import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import Logo from '../Components/CustomIcons/logo';
import ShownPassIcon from '../Components/CustomIcons/shownPass';
import HiddenPassIcon from '../Components/CustomIcons/hiddenPass';

import s from '../styles/Activate.module.scss';

export default function SignIn() {
  const { push } = useRouter();
  const { activate } = useAuth();
  const isMobile = useMediaQuery({ maxWidth: 960 });

  const [password, setPassword] = useState('');
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [third, setThird] = useState();
  const [fourth, setFourth] = useState();
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { primaryColor, fourthColor, secondaryColor } = useTheme();

  function handleActivationCodeInput(value, field) {
    switch (field) {
      case 'first': {
        setFirst(value.slice(-1));
        value !== '' && document.getElementById('activationcode2').focus();
        return;
      }
      case 'second': {
        setSecond(value.slice(-1));
        value !== '' && document.getElementById('activationcode3').focus();
        return;
      }
      case 'third': {
        setThird(value.slice(-1));
        value !== '' && document.getElementById('activationcode4').focus();
        return;
      }
      case 'fourth': {
        setFourth(value.slice(-1));
        return;
      }
    }
  }

  function handleActivate() {
    const code = first + second + third + fourth;
    const phone = localStorage.getItem('registration-phone');

    activate({ phone, code, password }).then(res => {
      if (res.status === 'success') {
        push('/profile');
      } else {
        setError(res.error);
      }
    });
  }

  function renderError() {
    switch (error) {
      case 'CODE_INVALID':
        return <span>Неверный код активации.</span>;
      case 'PASS_NOT_FOUND':
        return <span>Пароль пользователя не передан.</span>;
      default:
        return (
          <span>
            Пароль меньше минимально допустимой длины. Минимальная длина пароля
            равна 6 символам.
          </span>
        );
    }
  }

  return (
    <>
      <Head>
        <title>Активация | Свои</title>
      </Head>
      <Box
        className={s.root}
        display={isMobile ? 'flex' : 'grid'}
        gridTemplateColumns="40% 60%"
        bgcolor={fourthColor}
        height="auto"
        minHeight="100vh"
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
            justifyContent={isMobile ? 'center' : 'unset'}
            position={isMobile ? 'relative' : 'unset'}
            style={!isMobile ? { cursor: 'pointer' } : { cursor: 'unset' }}
            onClick={() => !isMobile && push('/')}
          >
            <Box
              position={isMobile ? 'absolute' : 'unset'}
              left={0}
              onClick={() => isMobile && push('/')}
            >
              <CloseIcon style={{ color: `${primaryColor}` }} />
            </Box>
            <Box color={primaryColor} fontSize={22} fontWeight={700} ml={1}>
              Активация
            </Box>
          </Box>
          <Box
            flex={isMobile ? 'unset' : 1}
            py={10}
            display="flex"
            justifyContent="center"
          >
            <Box
              display={isMobile ? 'flex' : 'unset'}
              flexDirection="column"
              alignItems="center"
              width={338}
              maxWidth={1}
            >
              <Logo fill={secondaryColor} />
              <Box
                maxWidth={1}
                fontSize={24}
                lineHeight="32px"
                fontWeight={400}
                color={primaryColor}
                my={7.5}
                textAlign={isMobile ? 'center' : 'unset'}
              >
                Сейчас Вам поступит звонок. Трубку брать не нужно, введите
                последние 4 цифры телефона с которого будет звонок
              </Box>
              {error && (
                <Box
                  component="div"
                  display="flex"
                  justifyContent="center"
                  width={1}
                  pb={4}
                  minHeight="fit-content"
                >
                  <WarningIcon style={{ color: '#F2512D' }} />
                  <Box color="#F2512D" ml={2} fontSize={20}>
                    {renderError()}
                  </Box>
                </Box>
              )}
              <Box
                width={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box display="flex" justifyContent="space-between" mb={10}>
                  <Box
                    mx={1}
                    borderBottom={`2px solid ${first ? '#1684F2' : '#C6D2E1'}`}
                    width={46}
                  >
                    <input
                      id="activationcode1"
                      type="number"
                      value={first}
                      onChange={e =>
                        handleActivationCodeInput(e.target.value, 'first')
                      }
                      min={0}
                      max={9}
                      maxLength={1}
                      className={s.confirmationCode}
                    />
                  </Box>
                  <Box
                    mx={1}
                    borderBottom={`2px solid ${second ? '#1684F2' : '#C6D2E1'}`}
                    width={46}
                  >
                    <input
                      id="activationcode2"
                      type="number"
                      value={second}
                      onChange={e =>
                        handleActivationCodeInput(e.target.value, 'second')
                      }
                      min={0}
                      max={9}
                      maxLength={1}
                      className={s.confirmationCode}
                    />
                  </Box>
                  <Box
                    mx={1}
                    borderBottom={`2px solid ${third ? '#1684F2' : '#C6D2E1'}`}
                    width={46}
                  >
                    <input
                      id="activationcode3"
                      type="number"
                      value={third}
                      onChange={e =>
                        handleActivationCodeInput(e.target.value, 'third')
                      }
                      min={0}
                      max={9}
                      maxLength={1}
                      className={s.confirmationCode}
                    />
                  </Box>
                  <Box
                    mx={1}
                    borderBottom={`2px solid ${fourth ? '#1684F2' : '#C6D2E1'}`}
                    width={46}
                  >
                    <input
                      id="activationcode4"
                      type="number"
                      value={fourth}
                      onChange={e =>
                        handleActivationCodeInput(e.target.value, 'fourth')
                      }
                      min={0}
                      max={9}
                      maxLength={1}
                      className={s.confirmationCode}
                    />
                  </Box>
                </Box>
                <Box width={338} maxWidth={1}>
                  <Input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type={showPass ? 'text' : 'password'}
                    label="Придумайте пароль"
                    name="password"
                    last
                    addOn={
                      <Box
                        position="absolute"
                        right={20}
                        top={21}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowPass(p => !p)}
                      >
                        {showPass ? <ShownPassIcon /> : <HiddenPassIcon />}
                      </Box>
                    }
                  />
                  <Box width={1} mt={5}>
                    <Button onClick={() => handleActivate()}>
                      Активировать
                    </Button>
                  </Box>
                </Box>
                <Box mt={14}>
                  <Box
                    color="#1684F2"
                    fontSize={15}
                    fontWeight={600}
                    textAlign="center"
                  >
                    Есть аккаунт?{' '}
                    <Box
                      component="span"
                      style={{ textDecoration: 'underline', cursor: 'pointer' }}
                      onClick={() => push('/login')}
                    >
                      Войти
                    </Box>
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
        {!isMobile && <AuthRight />}
      </Box>
    </>
  );
}
