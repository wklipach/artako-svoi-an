import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

// Components
import { Box, FormControlLabel, Checkbox } from '@material-ui/core';
import Button from '../Components/Button';
import Input from '../Components/Input';
import AuthRight from '../Components/AuthRight';

import { useAuth } from '../lib/api/auth';
import { useTheme } from '../lib/theme';

import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import Logo from '../Components/CustomIcons/logo';

import styles from '../styles/Home.module.scss';

export default function Home() {
  const { push } = useRouter();
  const isTablet = useMediaQuery({ maxWidth: 960 });
  const { primaryColor, secondaryColor, fourthColor } = useTheme();
  const { register } = useAuth();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [ppIsChecked, setPpIsChecked] = useState(true);
  const [reciveEmail, setReciveEmail] = useState(true);

  function onRegister() {
    if (ppIsChecked && reciveEmail) {
      register({ name, phone }).then(res => {
        if (res.status === 'success') {
          localStorage.setItem('registration-phone', phone);
          push('/activate');
        } else {
          setError(res.error);
        }
      });
    }
  }

  function renderError() {
    switch (error) {
      case 'ALREADY_ACTIVATED':
        return (
          <span>
            Пользовать с таким телефоном уже существует и активирован.
          </span>
        );
      case 'NEED_ACTIVATION':
        return (
          <span>
            Пользовать с таким телефоном уже существует, но не активирован.
          </span>
        );
      case 'PHONE_NOT_FOUND':
        return <span>Номер телефона не передан.</span>;
      case 'INCORRECT_PHONE':
        return <span>Номер телефона не верен.</span>;
      default:
        return <span> Имя пользователя не передано.</span>;
    }
  }

  return (
    <>
      <Head>
        <title>Регистрация | Свои</title>
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
              Регистрация
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
                  value={name}
                  onChange={e => setName(e.target.value)}
                  label="Имя Фамилия"
                  name="name"
                  first
                />
                <Input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  label="Телефон"
                  name="phone"
                  last
                  removeBorderTop
                />
                <Box display="flex" alignItems="flex-start" mt={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ppIsChecked}
                        onChange={() => setPpIsChecked(p => !p)}
                        name="privacy-policy"
                      />
                    }
                  />
                  <Box color={primaryColor}>
                    Я ознакомлен с{' '}
                    <Box
                      component="a"
                      color={secondaryColor}
                      style={{ cursor: 'pointer' }}
                      fontWeight={600}
                      target="_blank"
                      href="https://api.svoi.club/files/policy.pdf"
                    >
                      Политикой конфиденциальности персональных данных
                    </Box>{' '}
                    и даю согласие на передачу и обработку моих персональных
                    данных
                  </Box>
                </Box>
                <Box display="flex" alignItems="flex-start" mt={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reciveEmail}
                        onChange={() => setReciveEmail(p => !p)}
                        name="recive-email"
                      />
                    }
                  />
                  <Box color={primaryColor}>
                    Я согласен получать{' '}
                    <Box
                      component="a"
                      color={secondaryColor}
                      style={{ cursor: 'pointer' }}
                      fontWeight={600}
                      target="_blank"
                      href="https://api.svoi.club/files/eula.pdf"
                    >
                      информацию о специальных предложениях партнёров
                    </Box>{' '}
                    (рекламные и информационные сообщения) по любым доступным
                    каналам коммуникации
                  </Box>
                </Box>
                <Box
                  width={1}
                  mt={5}
                  style={{
                    opacity: ppIsChecked && reciveEmail ? 1 : 0.75,
                  }}
                >
                  <Button onClick={onRegister}>Зарегистрироваться</Button>
                </Box>
              </Box>
              <Box>
                <Box
                  color={secondaryColor}
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
