import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import Head from 'next/head';
import get from 'lodash/get';

import { Box, ClickAwayListener } from '@material-ui/core';
import Template from '../Components/Template';
import Modules from '../Components/Workspaces/Settings/modules';

import { useWorkspaces } from '../lib/api/workspaces';
import { useTheme } from '../lib/theme';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowLeft from '../Components/CustomIcons/arrowLeft';

import s from '../styles/AllSettings.module.scss';
import Popconfirm from '../Components/Popconfirm';

const statuses = [
  {
    name: 'Бесплатный',
    value: 2,
  },
  {
    name: 'По паролю',
    value: 3,
  },
  {
    name: 'По почте',
    value: 4,
  },
  {
    name: 'Вручную',
    value: 5,
  },
  {
    name: 'Закрытый',
    value: 6,
  },
];

function AllSettings() {
  const isMobile = useMediaQuery({ maxWidth: 960 });
  const { push } = useRouter();
  const { selectedWorkspace, editWorkspace, deleteWorkspace } = useWorkspaces();
  const { primaryColor, fourthColor, thirdColor, secondaryColor } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [workspaceTitle, setWorkspaceTitle] = useState(
    get(selectedWorkspace, 'title', ''),
    selectedWorkspace ? selectedWorkspace.title : '',
  );

  const [messengerState, setMessengerState] = useState(
    selectedWorkspace ? selectedWorkspace.messenger == 1 : false,
  );
  const [newsState, setNewsState] = useState(
    selectedWorkspace ? selectedWorkspace.news == 1 : false,
  );
  const [ideasState, setIdeasState] = useState(
    selectedWorkspace ? selectedWorkspace.ideas == 1 : false,
  );
  const [contestsState, setContestsState] = useState(
    selectedWorkspace ? selectedWorkspace.contests == 1 : false,
  );
  const [cafeteriaState, setCafeteriaState] = useState(
    selectedWorkspace ? selectedWorkspace.cafeteria == 1 : false,
  );
  const [currentStatus, setCurrentStatus] = useState(
    selectedWorkspace ? selectedWorkspace.status : 0,
  );
  const [price, setPrice] = useState(
    selectedWorkspace ? selectedWorkspace.price : 0,
  );
  const [password, setPassword] = useState(
    selectedWorkspace ? selectedWorkspace.password : '',
  );
  const [domain, setDomain] = useState(
    selectedWorkspace ? selectedWorkspace.domain : '',
  );

  const [isStatusesShown, setIsStatusesShown] = useState(false);
  const [openPopConfirm, setOpenPopConfirm] = useState(false);

  useEffect(() => {
    if (selectedWorkspace && selectedWorkspace.status === 0) {
      push('/workspaces');
    }
    if (selectedWorkspace && workspaceTitle === '') {
      selectedWorkspace.title &&
        selectedWorkspace.title !== '' &&
        setWorkspaceTitle(selectedWorkspace.title);

      setMessengerState(selectedWorkspace.messenger == 1 ? true : false);
      setNewsState(selectedWorkspace.news == 1 ? true : false);
      setIdeasState(selectedWorkspace.ideas == 1 ? true : false);
      setContestsState(selectedWorkspace.contests == 1 ? true : false);
      setCafeteriaState(selectedWorkspace.cafeteria == 1 ? true : false);
      setCurrentStatus(selectedWorkspace.status);
      setPrice(selectedWorkspace.price);
      setPassword(selectedWorkspace.password);
      setDomain(selectedWorkspace.domain);
    }
  }, [selectedWorkspace]);

  function onSwitch(state, field) {
    switch (field) {
      case 'messenger': {
        setMessengerState(state);
        editWorkspace({ id: selectedWorkspace.id, messenger: state ? 1 : 0 });
        break;
      }
      case 'news': {
        setNewsState(state);
        editWorkspace({ id: selectedWorkspace.id, news: state ? 1 : 0 });
        break;
      }
      case 'ideas': {
        setIdeasState(state);
        editWorkspace({ id: selectedWorkspace.id, ideas: state ? 1 : 0 });
        break;
      }
      case 'contests': {
        setContestsState(state);
        editWorkspace({ id: selectedWorkspace.id, contests: state ? 1 : 0 });
        break;
      }
      case 'cafeteria': {
        setCafeteriaState(state);
        editWorkspace({ id: selectedWorkspace.id, cafeteria: state ? 1 : 0 });
        break;
      }
    }
  }

  function onDeleteWorkspace() {
    deleteWorkspace({ id: selectedWorkspace.id }).then(res => {
      if (res.status === 'success') {
        window.location.href = '/workspaces';
      }
    });
  }

  return (
    <>
      <Head>
        <title>Общие настройки | Свои</title>
      </Head>
      <Template isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
        <Box
          bgcolor={thirdColor}
          height={1}
          px={{ xs: 0, sm: 0, md: 3 }}
          py={{ xs: 3, sm: 3, md: 1 }}
          maxWidth={1}
          position="relative"
          mb={1}
        >
          <Box
            ml="12px"
            display="flex"
            alignItems="center"
            position={{ sm: 'absolute', xs: 'absolute', md: 'unset' }}
            style={{ cursor: 'pointer' }}
            onClick={() => push('/workspace-settings')}
          >
            {isMobile ? (
              <ArrowBackIosIcon />
            ) : (
              <Box>
                <Box component="span" width={5} height={7} mr={1}>
                  <ArrowLeft color={primaryColor} />
                </Box>
                <Box
                  component="span"
                  fontSize={13}
                  fontWeight={500}
                  color={primaryColor}
                  style={{ opacity: 0.53 }}
                >
                  Назад
                </Box>
              </Box>
            )}
          </Box>
          <Box
            color={primaryColor}
            bgcolor="transparent"
            display={{ sm: 'flex', xs: 'flex', md: 'unset' }}
            justifyContent="center"
            alignItems="center"
          >
            <Box component="span" fontSize={22} fontWeight={700} ml={1.5}>
              Общие настройки
            </Box>
          </Box>
          <Box
            mt={4}
            ml={{ sm: 0, xs: 0, md: '12px' }}
            display="grid"
            gridTemplateColumns={{ sm: 'unset', xs: 'unset', md: '50% 50%' }}
          >
            <Box>
              <Box
                component="span"
                fontSize={15}
                fontWeight={600}
                ml={{ sm: 4, xs: 4, md: 0 }}
                color={primaryColor}
                style={{ opacity: 0.62 }}
              >
                Название и тип
              </Box>
              <Box
                bgcolor={fourthColor}
                mt={2}
                mb={3}
                px={{ sm: 2.5, xs: 2.5, md: 2.5 }}
                py={{ sm: 2.5, xs: 2.5, md: 2.5 }}
                maxWidth={{ sm: 1, xs: 1, md: 600 }}
                borderRadius={{ sm: 0, xs: 0, md: 10 }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box display="flex" flexDirection="column" width={1} pb={1}>
                    <Box
                      component="span"
                      fontSize={17}
                      fontWeight={500}
                      color={primaryColor}
                      style={{ opacity: 0.53 }}
                    >
                      Название workspace
                    </Box>
                    {selectedWorkspace && (
                      <input
                        type="text"
                        value={workspaceTitle}
                        style={{
                          backgroundColor: `${fourthColor}`,
                          color: `${primaryColor}`,
                        }}
                        className={s.input}
                        onChange={e => {
                          setWorkspaceTitle(e.target.value);
                          editWorkspace({
                            title: e.target.value,
                            id: selectedWorkspace.id,
                          });
                        }}
                        name="workspace-name"
                      />
                    )}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  borderTop="1px solid rgba(198, 210, 225, 0.74)"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    width={1}
                    pt={1}
                    position="relative"
                  >
                    <Box
                      component="span"
                      fontSize={15}
                      fontWeight={500}
                      color={primaryColor}
                      style={{ opacity: 0.53 }}
                    >
                      Доступ
                    </Box>
                    {selectedWorkspace && (
                      <Box
                        component="span"
                        pt={0.5}
                        fontSize={15}
                        fontWeight={700}
                        color={primaryColor}
                        onClick={() => setIsStatusesShown(p => !p)}
                        style={{ cursor: 'pointer' }}
                      >
                        {currentStatus === 1 && 'Активен'}
                        {currentStatus === 2 && 'Бесплатный'}
                        {currentStatus === 3 && 'По паролю'}
                        {currentStatus === 4 && 'По почте'}
                        {currentStatus === 5 && 'Вручную'}
                        {currentStatus === 6 && 'Закрытый'}
                      </Box>
                    )}
                    {isStatusesShown && (
                      <ClickAwayListener
                        onClickAway={() => setIsStatusesShown(false)}
                      >
                        <Box
                          position="absolute"
                          top={55}
                          zIndex={1}
                          bgcolor={fourthColor}
                          p={1.5}
                          border="1px solid rgba(198, 210, 225, 0.74)"
                        >
                          {statuses.map(i => (
                            <Box
                              key={i.value}
                              onClick={() => {
                                setCurrentStatus(i.value);
                                editWorkspace({
                                  id: selectedWorkspace.id,
                                  status: i.value,
                                });
                                setIsStatusesShown(false);
                              }}
                              style={{ cursor: 'pointer' }}
                              p={0.5}
                            >
                              {i.name}
                            </Box>
                          ))}
                        </Box>
                      </ClickAwayListener>
                    )}
                  </Box>
                </Box>
                {currentStatus >= 3 && currentStatus <= 4 && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    borderTop="1px solid rgba(198, 210, 225, 0.74)"
                    mt={1}
                  >
                    <Box display="flex" flexDirection="column" width={1} pt={1}>
                      <Box
                        component="span"
                        fontSize={15}
                        fontWeight={500}
                        color={primaryColor}
                        style={{ opacity: 0.53 }}
                      >
                        {currentStatus === 2 && 'Цена'}
                        {currentStatus === 3 && 'Пароль'}
                        {currentStatus === 4 && 'Рабочий домен'}
                      </Box>
                      <Box
                        component="span"
                        pt={0.5}
                        fontSize={15}
                        fontWeight={700}
                        color={primaryColor}
                      >
                        {currentStatus === 2 && (
                          <input
                            type="number"
                            value={price}
                            style={{
                              backgroundColor: `${fourthColor}`,
                              color: `${primaryColor}`,
                            }}
                            className={s.input}
                            onChange={e => {
                              setPrice(e.target.value);
                              !isNaN(e.target.value) &&
                                editWorkspace({
                                  price: e.target.value,
                                  id: selectedWorkspace.id,
                                });
                            }}
                            name="workspace-price"
                          />
                        )}
                        {currentStatus === 3 && (
                          <input
                            type="password"
                            value={password}
                            style={{
                              backgroundColor: `${fourthColor}`,
                              color: `${primaryColor}`,
                            }}
                            className={s.input}
                            onChange={e => {
                              setPassword(e.target.value);
                              editWorkspace({
                                password: e.target.value,
                                id: selectedWorkspace.id,
                              });
                            }}
                            name="workspace-password"
                          />
                        )}
                        {currentStatus === 4 && (
                          <input
                            type="text"
                            value={domain}
                            style={{
                              backgroundColor: `${fourthColor}`,
                              color: `${primaryColor}`,
                            }}
                            className={s.input}
                            onChange={e => {
                              setDomain(e.target.value);
                              editWorkspace({
                                domain: e.target.value,
                                id: selectedWorkspace.id,
                              });
                            }}
                            name="workspace-domain"
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
              <Box
                maxWidth={{ sm: 1, xs: 1, md: 470 }}
                textAlign="left"
                px={{ sm: 4.5, xs: 4.5, md: 0 }}
              >
                <Box
                  component="span"
                  fontSize={15}
                  fontWeight={500}
                  color={primaryColor}
                  style={{ opacity: 0.53 }}
                >
                  Определите формат доступа в рабочее пространство.
                  <Box mt={2} color={primaryColor} style={{ opacity: 0.53 }}>
                    <Box
                      component="span"
                      fontWeight={700}
                      color={primaryColor}
                      style={{ opacity: 1 }}
                    >
                      Бесплатный
                    </Box>{' '}
                    - любой пользователь может вступить в рабочее пространство.
                  </Box>
                  <Box mt={2} color={primaryColor} style={{ opacity: 0.53 }}>
                    <Box component="span" fontWeight={700}>
                      По паролю
                    </Box>{' '}
                    - любой пользователь, который знает пароль, может вступить в
                    рабочее пространство.
                  </Box>
                  <Box mt={2} color={primaryColor} style={{ opacity: 0.53 }}>
                    <Box component="span" fontWeight={700}>
                      По почте
                    </Box>{' '}
                    - любой пользователь, у которого привязана почта в указанном
                    домене, сможет вступить в рабочее пространство.
                  </Box>
                  <Box mt={2} color={primaryColor} style={{ opacity: 0.53 }}>
                    <Box component="span" fontWeight={700}>
                      Вручную
                    </Box>{' '}
                    - любой пользователь может отправить заявку на вступление в
                    рабочее пространство, а администратор вручную может
                    разрешить или отклонить заявку.
                  </Box>
                  <Box mt={2} color={primaryColor} style={{ opacity: 0.53 }}>
                    <Box component="span" fontWeight={700}>
                      Закрытый
                    </Box>{' '}
                    - только администратор может вручную добавлять пользователей
                    в рабочее пространство.
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box ml={{ sm: 0, xs: 0, md: 6 }} mt={{ sm: 4, xs: 4, md: 0 }}>
              <Box
                component="span"
                fontSize={15}
                fontWeight={600}
                ml={{ sm: 4, xs: 4, md: 0 }}
                color={primaryColor}
                style={{ opacity: 0.62 }}
              >
                ДОСТУПНЫЕ МОДУЛИ
              </Box>
              <Modules
                onSwitch={onSwitch}
                messengerState={messengerState}
                newsState={newsState}
                ideasState={ideasState}
                contestsState={contestsState}
                cafeteriaState={cafeteriaState}
              />
              <Box position="relative">
                {openPopConfirm && (
                  <ClickAwayListener
                    onClickAway={() => setOpenPopConfirm(false)}
                  >
                    <Box position="absolute" top={-100} right={0}>
                      <Popconfirm
                        onDelete={onDeleteWorkspace}
                        onClose={() => setOpenPopConfirm(false)}
                        message="Вы уверены что хотите удалить рабочее пространство?"
                      />
                    </Box>
                  </ClickAwayListener>
                )}
                <Box
                  mt={2}
                  height={20}
                  width={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  color={secondaryColor}
                  style={{ cursor: 'pointer' }}
                  fontSize={15}
                  fontWeight={700}
                  onClick={() => setOpenPopConfirm(true)}
                >
                  Удалить рабочее пространство
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Template>
    </>
  );
}

export default AllSettings;
