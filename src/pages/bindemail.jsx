import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

import { useAuth } from '../lib/api/auth';

// Components
import { Box } from '@material-ui/core';
import Button from '../Components/Button';
import AuthRight from '../Components/AuthRight';

import CloseIcon from '@material-ui/icons/Close';

import s from '../styles/Activate.module.scss';
import { useTheme } from '../lib/theme';

export default function BindEmail() {
  const { push } = useRouter();
  const { editmailphone } = useAuth();
  const { primaryColor, fourthColor } = useTheme();

  const isTablet = useMediaQuery({ maxWidth: 960 });

  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [third, setThird] = useState();
  const [fourth, setFourth] = useState();

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

  function editEmail() {
    const code = first + second + third + fourth;
    editmailphone({
      phone_or_mail: localStorage.getItem('new-email'),
      code: code,
    }).then(res => {
      if (res.status === 'success') {
        push('/profile');
      }
    });
  }

  return (
    <Box
      className={s.root}
      display={isTablet ? 'flex' : 'grid'}
      gridTemplateColumns="40% 60%"
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
            fontSize={isTablet ? 18 : 22}
            fontWeight={700}
            ml={1}
            textAlign={{ sm: 'center', xs: 'center' }}
          >
            Привязка почтового ящика
          </Box>
        </Box>
        <Box flexGrow={1} py={10} display="flex" justifyContent="center">
          <Box
            display={isTablet ? 'flex' : 'unset'}
            flexDirection="column"
            alignItems="center"
          >
            <Box component="img" src="/logo.svg" alt="logo" />
            <Box
              maxWidth="360px"
              fontSize={24}
              lineHeight="32px"
              fontWeight={400}
              color={primaryColor}
              my={isTablet ? 4.5 : 7.5}
              textAlign="center"
            >
              На Ваш Email отправлено письмо с кодом активации. Укажите его в
              поле ниже.
            </Box>
            <Box
              width={200}
              display="flex"
              justifyContent="space-between"
              mb={10}
            >
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
              <Box width={1} mt={5}>
                <Button onClick={editEmail}>Привязать Email</Button>
              </Box>
            </Box>
            <Box mt={22}>
              <Box
                color="#1684F2"
                fontSize={15}
                fontWeight={600}
                textAlign="center"
                mr="20px"
                onClick={() => push('/profile')}
                style={{ cursor: 'pointer' }}
              >
                Отменить привязку Email
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {!isTablet && <AuthRight />}
    </Box>
  );
}
