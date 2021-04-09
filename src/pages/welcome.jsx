// qaqikner ev pornikner (yani pasxalka)
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

// Components
import { Box } from '@material-ui/core';
import Button from '../Components/Button';
import Input from '../Components/Input';

import { useWorkspaces } from '../lib/api/workspaces';
import { useAuth } from '../lib/api/auth';
import { useTheme } from '../lib/theme';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import CafeteriIcon from '../Components/CustomIcons/cafeteriIcon';
import MessageIcon from '../Components/CustomIcons/messageIcon';
import IdeaIcon from '../Components/CustomIcons/ideaIcon';
import NewsIcon from '../Components/CustomIcons/newsIcon';
import KonkursIcon from '../Components/CustomIcons/konkursIcon';

export default function SignIn() {
  const isMobile = useMediaQuery({ maxWidth: 960 });
  const { query, push } = useRouter();
  const { id } = query;
  const {
    currentWorkspace,
    viewWorkspace,
    isCurrentWorkspaceLoaded,
    joinWorkspace,
    leaveWorkspace,
  } = useWorkspaces();
  const { primaryColor, secondaryColor, thirdColor } = useTheme();
  const { user, isUserLoaded } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isJoinSent, setIsJoinSent] = useState(false);

  useEffect(() => {
    if (id) {
      viewWorkspace({ id }).then(res => {
        if (res.status === 'error' && res.error === 'ID_NOT_FOUND') {
          setError('ID_NOT_FOUND');
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (currentWorkspace) {
      if (localStorage.getItem('redirect-to-welcome')) {
        if (localStorage.getItem('join-pass')) {
          setPassword(localStorage.getItem('join-pass'));
          onJoin(localStorage.getItem('join-pass'));
          localStorage.removeItem('join-pass');
        } else {
          onJoin();
        }
        localStorage.removeItem('redirect-to-welcome');
      }
      if (currentWorkspace.role === 5) {
        setIsJoinSent(true);
      } else if (currentWorkspace.role !== 0 && id == currentWorkspace.id) {
        window.location.href = `/cafeteria?id=${id}`;
      }
    }
  }, [currentWorkspace]);

  function onJoin(pass = null) {
    if (!localStorage.getItem('token')) {
      if (currentWorkspace.status === 3 && password !== '') {
        localStorage.setItem('join-pass', password);
      }
      localStorage.setItem('redirect-to-welcome', id);
      push('/');
      return;
    }

    switch (currentWorkspace.status) {
      case 3:
        joinWorkspace({ id, password: pass ? pass : password }).then(res => {
          if (res.status === 'success') {
            window.location.href = `/cafeteria?id=${id}`;
          } else if (res.error && res.error === 'INCORRECT_PASSWORD') {
            setError('INCORRECT_PASSWORD');
          } else if (res.error && res.error === 'ALREADY_JOINED') {
            window.location.href = `/cafeteria?id=${id}`;
          }
        });
        break;
      case 5:
        joinWorkspace({ id, password }).then(res => {
          if (res.status === 'success') {
            setIsJoinSent(true);
          } else if (res.error && res.error === 'ALREADY_JOINED') {
            window.location.href = `/cafeteria?id=${id}`;
          }
        });
        break;
      default:
        joinWorkspace({ id }).then(res => {
          if (res.status === 'success') {
            window.location.href = `/cafeteria?id=${id}`;
          } else if (res.error && res.error === 'ALREADY_JOINED') {
            window.location.href = `/cafeteria?id=${id}`;
          }
        });
        break;
    }
  }

  function onLeave() {
    leaveWorkspace({ id }).then(res => {
      if (res.status === 'success') {
        setIsJoinSent(false);
      }
    });
  }

  if (error === 'ID_NOT_FOUND') {
    return (
      <Box
        width={1}
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        p={3}
      >
        <Box fontSize={36} fontWeight={700} textAlign="center">
          Рабочее пространство не найдено
        </Box>
        <Box width={338} maxWidth={1} mt={2}>
          <Button
            onClick={() => {
              if (user) {
                !isJoinSent
                  ? (window.location.href = '/workspaces')
                  : (window.location.href = '/');
              } else {
                window.location.href = '/';
              }
            }}
            color={primaryColor}
          >
            Назад
          </Button>
        </Box>
      </Box>
    );
  }

  if (!isCurrentWorkspaceLoaded || !isUserLoaded) {
    return <div>Loading....</div>;
  }

  return (
    <>
      <Head>
        <title>{currentWorkspace ? currentWorkspace.title : 'СВОИ'}</title>
      </Head>
      <Box
        px={{ xs: 0, sm: 0, md: 4 }}
        pt={4}
        pb={{ xs: 0, sm: 0, md: 4 }}
        bgcolor={{ xs: thirdColor, sm: thirdColor, md: '#F2F6FB' }}
        width={1}
        minHeight="100vh"
      >
        <Box
          display="flex"
          alignItems="center"
          pb={4}
          px={{ xs: 3, sm: 3, md: 0 }}
        >
          <Box
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (user) {
                !isJoinSent
                  ? (window.location.href = '/workspaces')
                  : (window.location.href = '/');
              } else {
                window.location.href = '/';
              }
            }}
          >
            {isMobile ? (
              <ArrowBackIosIcon style={{ color: primaryColor }} />
            ) : (
              <CloseIcon style={{ color: primaryColor }} />
            )}
          </Box>
          <Box
            color={primaryColor}
            fontSize={22}
            fontWeight={600}
            pl={{ xs: 0, sm: 0, md: 2 }}
            textAlign={{ xs: 'center', sm: 'center', md: 'left' }}
            width={1}
            ml={{ xs: -3, sm: -3, md: 0 }}
          >
            {currentWorkspace ? currentWorkspace.title : 'Workspace'}
          </Box>
        </Box>
        <Box
          display="flex"
          width={1}
          height={1}
          flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}
          bgcolor={{ xs: thirdColor, sm: thirdColor, md: 'unset' }}
        >
          <Box
            minWidth={{ xs: 'unset', sm: 'unset', md: 450 }}
            maxWidth={1}
            height="auto"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor={thirdColor}
            p={2}
          >
            {currentWorkspace && currentWorkspace.image !== '' ? (
              <Box
                borderRadius="50%"
                width={222}
                component="img"
                src={currentWorkspace.image}
              />
            ) : (
              <Box
                bgcolor="#D4E5FA"
                width={222}
                borderRadius="50%"
                height={222}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box color={secondaryColor} fontSize={36} fontWeight={600}>
                  {currentWorkspace ? currentWorkspace.title[0] : 'W'}
                </Box>
              </Box>
            )}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            py={{ xs: 4, sm: 4, md: 6 }}
            px={{ xs: 3, sm: 3, md: 9 }}
            bgcolor={{ xs: '#F8F9FC', sm: '#F8F9FC', md: '#fff' }}
            borderRadius={{ xs: '36px 36px 0 0', sm: '36px 36px 0 0', md: 0 }}
          >
            <Box
              color={primaryColor}
              fontSize={24}
              pb={3}
              textAlign={{ xs: 'center', sm: 'center', md: 'left' }}
            >
              Добро пожаловать на страницу рабочего пространства{' '}
              {currentWorkspace &&
                currentWorkspace.title &&
                currentWorkspace.title}
            </Box>
            <Box
              component="span"
              color="rgba(0, 49, 102, 0.6)"
              fontSize={17}
              pb={4}
            >
              Рабочее пространство позволяет Вам получить доступ к
              многочисленным преимуществам, таким как:
            </Box>
            {currentWorkspace.cafeteria == 1 && (
              <Box display="flex" pb={4}>
                <Box width={24} mr={1.5}>
                  <CafeteriIcon fill={secondaryColor} />
                </Box>
                <Box fontSize={17} color="rgba(0, 49, 102, 0.6)">
                  <Box fontWeight={600} component="span">
                    Витрина скидок
                  </Box>{' '}
                  - огромное количество партнеров, предоставляющих Вам
                  эксклюзивные предложения и скидки.
                </Box>
              </Box>
            )}
            {currentWorkspace.messenger == 1 && (
              <Box display="flex" pb={4}>
                <Box width={24} mr={1.5}>
                  <MessageIcon fill={secondaryColor} />
                </Box>
                <Box fontSize={17} color="rgba(0, 49, 102, 0.6)">
                  <Box fontWeight={600} component="span">
                    Мессенджер
                  </Box>{' '}
                  - возможность общаться с другими участниками рабочего
                  пространства, обмениваться опытом и знаниями.
                </Box>
              </Box>
            )}
            {currentWorkspace.news == 1 && (
              <Box display="flex" pb={4}>
                <Box width={24} mr={1.5}>
                  <NewsIcon fill={secondaryColor} />
                </Box>
                <Box fontSize={17} color="rgba(0, 49, 102, 0.6)">
                  <Box fontWeight={600} component="span">
                    Новости
                  </Box>{' '}
                  - оперативное получение самой свежей информации напрямую от
                  администрации рабочего пространства
                </Box>
              </Box>
            )}
            {currentWorkspace.ideas == 1 && (
              <Box display="flex" pb={4}>
                <Box width={24} mr={1.5}>
                  <IdeaIcon fill={secondaryColor} />
                </Box>
                <Box fontSize={17} color="rgba(0, 49, 102, 0.6)">
                  <Box fontWeight={600} component="span">
                    Идеи
                  </Box>{' '}
                  - зарабатывайте баллы на креативных идеях в интересах рабочего
                  пространства. Баллы можно тратить на материальные блага в
                  кафетерии льгот.
                </Box>
              </Box>
            )}
            {currentWorkspace.contests == 1 && (
              <Box display="flex" pb={4}>
                <Box width={24} mr={1.5}>
                  <KonkursIcon fill={secondaryColor} />
                </Box>
                <Box fontSize={17} color="rgba(0, 49, 102, 0.6)">
                  <Box fontWeight={600} component="span">
                    Конкурсы
                  </Box>{' '}
                  - зарабатывайте баллы выигрывая конкурсы от администрации
                  рабочего пространства. Баллы можно тратить на материальные
                  блага в кафетерии льгот.
                </Box>
              </Box>
            )}
            {currentWorkspace.status === 3 && (
              <Box
                fontSize={15}
                fontWeight={500}
                color="rgba(0, 49, 102, 0.53)"
                mb={3}
              >
                Доступ в рабочее пространство осуществляется по паролю.
              </Box>
            )}
            {error === 'INCORRECT_PASSWORD' && (
              <Box
                display="flex"
                alignItems="center"
                width={1}
                pb={4}
                minHeight="fit-content"
              >
                <WarningIcon style={{ color: '#F2512D' }} />
                <Box color="#F2512D" ml={2} fontSize={20}>
                  Неверный пароль
                </Box>
              </Box>
            )}
            {currentWorkspace.status === 4 &&
            (!user ||
              user.mail.indexOf(`@${currentWorkspace.domain}`) === -1) ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width={1}
                pb={4}
                minHeight="fit-content"
              >
                <WarningIcon style={{ color: '#F2512D' }} />
                <Box color="#F2512D" ml={2} fontSize={20}>
                  {`Доступ в эту организацию только для сотрудников с привязанной почтой в домене @${currentWorkspace.domain}. `}
                  <a href="changeemail" style={{ textDecoration: 'underline' }}>
                    Привязать почту
                  </a>
                </Box>
              </Box>
            ) : (
              <Box
                width={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection={{ xs: 'column', sm: 'column', md: 'row' }}
              >
                {currentWorkspace.status === 3 && (
                  <Box
                    width={{ xs: 1, sm: 1, md: 0.49 }}
                    mb={{ xs: 1.5, sm: 1.5, md: 0 }}
                  >
                    <Input
                      name="password"
                      value={password}
                      onChange={e => {
                        if (error !== '') {
                          setError('');
                        }
                        setPassword(e.target.value);
                      }}
                      label="Введите пароль"
                      first
                      last
                      type="password"
                    />
                  </Box>
                )}
                {currentWorkspace.status !== 6 ? (
                  <Box
                    width={
                      currentWorkspace.status === 3
                        ? { xs: 1, sm: 1, md: 0.49 }
                        : 1
                    }
                  >
                    {isJoinSent && currentWorkspace.status === 5 ? (
                      <Button height="69px" onClick={onLeave}>
                        Отменить заявку
                      </Button>
                    ) : (
                      <Button height="69px" onClick={() => onJoin()}>
                        Вступить
                      </Button>
                    )}
                  </Box>
                ) : (
                  <Box color={primaryColor}>
                    Доступ в данное рабочее пространство закрытый, только
                    администратор определяет участников, которые могут им
                    пользоваться
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
