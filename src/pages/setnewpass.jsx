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

export default function NewPassword() {
  const { push } = useRouter();
  const { forgotPasswordConfirm } = useAuth();
  const isMobile = useMediaQuery({ maxWidth: 960 });

  const [password, setPassword] = useState('');
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [third, setThird] = useState();
  const [fourth, setFourth] = useState();
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const { fourthColor, primaryColor, secondaryColor } = useTheme();

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

  function handleChangePassword() {
    const code = first + second + third + fourth;
    const phone = localStorage.getItem('forgot-password-phone');

    forgotPasswordConfirm({ phone, code, password }).then(res => {
      if (res.status === 'success') {
        push('/profile');
      } else {
        setError(res.error);
      }
    });
  }

  function renderError() {
    switch (error) {
      case 'INCORRECT_CODE':
        return '?????????????? ???????????????? ??????.';
      default:
        return '???????????? ???????????? ???????????????????? ???????????????????? ??????????. ?????????????????????? ?????????? ???????????? ?????????? 6 ????????????????.';
    }
  }

  return (
    <>
      <Head>
        <title>???????????? ???????????? | ????????</title>
      </Head>
      <Box
        className={s.root}
        display={isMobile ? 'flex' : 'grid'}
        gridTemplateColumns="40% 60%"
        bgcolor={fourthColor}
      >
        <Box
          p={{ xs: 2.5, sm: 2.5, md: 4.5 }}
          display="flex"
          flexDirection="column"
          width={1}
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
              <CloseIcon style={{ color: '#003166' }} />
            </Box>
            <Box color="#003166" fontSize={22} fontWeight={700} ml={1}>
              ???????????????????????????? ????????????
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
              height={1}
            >
              <Logo fill={secondaryColor} />
              <Box
                maxWidth="360px"
                fontSize={24}
                lineHeight="32px"
                fontWeight={400}
                color={primaryColor}
                my={7.5}
                textAlign={isMobile ? 'center' : 'unset'}
              >
                ???????????? ?????? ???????????????? ????????????, ?????????????? ?????????????????? 4 ?????????? ????????????
                ????????????????
              </Box>
              {error && (
                <Box
                  component="div"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width={1}
                  pb={4}
                >
                  <WarningIcon style={{ color: '#F2512D' }} />
                  <Box color="#F2512D" ml={2} fontSize={20}>
                    {renderError()}
                  </Box>
                </Box>
              )}
              <Box display="flex" justifyContent="center" mb={10}>
                <Box
                  mr={2}
                  borderBottom={`2px solid ${first ? '#1684F2' : '#C6D2E1'}`}
                  minWidth="46px"
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
                  mr={2}
                  borderBottom={`2px solid ${second ? '#1684F2' : '#C6D2E1'}`}
                  minWidth="46px"
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
                  mr={2}
                  borderBottom={`2px solid ${third ? '#1684F2' : '#C6D2E1'}`}
                  minWidth="46px"
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
                  borderBottom={`2px solid ${fourth ? '#1684F2' : '#C6D2E1'}`}
                  minWidth="46px"
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
              <Box width={338}>
                <Input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type={showPass ? 'text' : 'password'}
                  label="???????????????????? ????????????"
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
                  <Button onClick={() => handleChangePassword()}>
                    ???????????????? ???????????? ?? ??????????
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
                  ?????????????????? ?????????????{' '}
                  <Box
                    component="span"
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => push('/login')}
                  >
                    ??????????
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {!isMobile && <AuthRight />}
      </Box>
    </>
  );
}
