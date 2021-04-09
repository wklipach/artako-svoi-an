import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

import { Box, ClickAwayListener, Snackbar } from '@material-ui/core';
import Template from '../Components/Template';
import Popconfirm from '../Components/Popconfirm';
// import Button from '../Components/Button';

import { useWorkspaces } from '../lib/api/workspaces';
import { useTheme } from '../lib/theme';

import MenuIcon from '@material-ui/icons/Menu';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '../Components/CustomIcons/searchIcon';

//styles
import s from '../styles/Profile.module.scss';

export default function NewWorkspace() {
  const { push } = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 960 });
  const { primaryColor, secondaryColor, thirdColor, fourthColor } = useTheme();
  const {
    workspaces,
    isWorkspacesLoaded,
    getWorkspaces,
    search,
    found,
    workspacesSet,
    setSelectedWorkspace,
    selectedWorkspace,
    leaveWorkspace,
  } = useWorkspaces();

  const [active, setActive] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [opacity, setOpacity] = useState(false);
  const [isTostOpened, setIsTostOpened] = useState(false);
  const [openPopConfirm, setOpenPopConfirm] = useState('');

  useEffect(() => {
    getWorkspaces();
  }, []);

  useEffect(() => {
    if (workspaces.length > 0 && !active) {
      setActive(selectedWorkspace.id);
    }
  }, [selectedWorkspace]);

  function onSearch(e) {
    setSearchValue(e.target.value);
    if (e.target.value.length >= 3) {
      search({ title: e.target.value });
    }
  }

  function onSelectWorkspace(item) {
    setActive(item.id);
    workspacesSet({ id: item.id });
    setSelectedWorkspace(item);
  }

  if (!isWorkspacesLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Выбор организации | Свои</title>
      </Head>
      {opacity && (
        <Box
          position="fixed"
          top={0}
          bottom={0}
          left={0}
          right={0}
          bgcolor="rgba(0, 49, 102, 0.24)"
          zIndex={6}
        />
      )}
      <Template isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
        <Box
          px={{ xs: 0, sm: 0, md: 6 }}
          py={{ xs: 0, sm: 0, md: 4 }}
          width={1}
          position="relative"
          bgcolor={thirdColor}
          minHeight={1}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            height={{ xs: 40, sm: 40, md: 'unset' }}
            mb={{ xs: 0, sm: 0, md: 4 }}
            px={3}
          >
            <Box
              left={20}
              top={10}
              zIndex={1}
              onClick={() => setIsMenuOpen(true)}
              display={{ xs: 'block', sm: 'block', md: 'none' }}
              height={24}
            >
              <MenuIcon style={{ color: primaryColor }} />
            </Box>
            <Box
              color={primaryColor}
              fontSize={{ xs: 17, sm: 17, md: 22 }}
              fontWeight={700}
              width={1}
              textAlign={isMobile && 'center'}
              display="flex"
              alignItems="center"
              justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }}
            >
              Выбор организации
            </Box>
          </Box>
          <Box
            display={isMobile ? 'flex' : 'grid'}
            flexDirection="column"
            gridTemplateColumns={{ xs: 'unset', sm: 'unset', md: '50% 50%' }}
          >
            {workspaces.length > 0 && (
              <Box mr={isMobile ? 0 : 1.25} mb={isMobile ? 4 : 0}>
                <Box p={4} bgcolor={`${fourthColor}`} borderRadius={10}>
                  <Box
                    color={primaryColor}
                    style={{ opacity: 0.62 }}
                    fontSize={15}
                    fontWeight={700}
                    mb={3.5}
                  >
                    Действующие
                  </Box>
                  {workspaces.map(item => (
                    <Box
                      key={item.id}
                      borderRadius={60}
                      p={1}
                      display="flex"
                      alignItems="center"
                      border={`${
                        active === item.id ? '1px' : '0'
                      } solid ${secondaryColor}`}
                      mb={2}
                      style={{
                        cursor: 'pointer',
                        opacity: item.status === 0 ? 0.7 : 1,
                      }}
                      justifyContent="space-between"
                      className={s.workspace}
                      position="relative"
                    >
                      {openPopConfirm === item.id && (
                        <ClickAwayListener
                          onClickAway={() => setOpenPopConfirm('')}
                        >
                          <Box
                            position="absolute"
                            top={-100}
                            right={0}
                            zIndex={12}
                          >
                            <Popconfirm
                              onDelete={() => {
                                leaveWorkspace({ id: item.id }).then(res => {
                                  if (
                                    res.status === 'success' &&
                                    item.id === selectedWorkspace.id
                                  ) {
                                    if (
                                      workspaces[0] &&
                                      item.id !== workspaces[0].id
                                    ) {
                                      onSelectWorkspace(workspaces[0]);
                                    } else if (workspaces[1]) {
                                      onSelectWorkspace(workspaces[1]);
                                    }
                                  }
                                });
                              }}
                              onClose={() => setOpenPopConfirm(false)}
                              message="Вы уверены что хотите отписаться от рабочего пространства?"
                            />
                          </Box>
                        </ClickAwayListener>
                      )}
                      <Box
                        width={1}
                        display="flex"
                        alignItems="center"
                        onClick={() => {
                          item.status === 0
                            ? setIsTostOpened(true)
                            : onSelectWorkspace(item);
                        }}
                        position="relative"
                      >
                        {item.status === 0 && (
                          <Box position="absolute" top={0} left={50}>
                            <HourglassEmptyIcon />
                          </Box>
                        )}
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          overflow="hidden"
                          height={76}
                          width={76}
                          minWidth={76}
                          borderRadius="50%"
                          bgcolor="rgba(0, 49, 102, 0.08)"
                          mr={2}
                        >
                          {item.image && item.image !== '' ? (
                            <Box width={1} component="img" src={item.image} />
                          ) : (
                            <Box
                              bgcolor={thirdColor}
                              width={1}
                              borderRadius="50%"
                              height={1}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Box
                                color={secondaryColor}
                                fontSize={17}
                                fontWeight={600}
                              >
                                {item.title[0]}
                              </Box>
                            </Box>
                          )}
                        </Box>
                        <Box
                          color={primaryColor}
                          fontSize={15}
                          fontWeight={500}
                          display="flex"
                          justifyContent="space-between"
                        >
                          {item.title}
                        </Box>
                      </Box>
                      <Box position="relative" className={s.tooltipWrapper}>
                        <Box
                          bgcolor="#001D3D"
                          color="#E4E7ED"
                          borderRadius={4}
                          width={120}
                          py={1}
                          position="absolute"
                          zIndex={10}
                          top={-40}
                          left={-50}
                          textAlign="center"
                          fontSize={13}
                          fontWeight={500}
                          className={s.tooltip}
                          display={{ xs: 'none', sm: 'none', md: 'block' }}
                        >
                          Отписаться
                        </Box>
                        <Box
                          onClick={() => setOpenPopConfirm(item.id)}
                          className={s.leaveIcon}
                        >
                          <Box
                            width={20}
                            minWidth={20}
                            height={20}
                            bgcolor={secondaryColor}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="50%"
                          >
                            <CloseIcon
                              style={{ color: fourthColor, fontSize: 14 }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            <Box ml={isMobile ? 0 : 1.25}>
              <Box
                p={4}
                mb={2.5}
                position="relative"
                zIndex={{ xs: 8, sm: 8, md: 12 }}
                bgcolor={`${fourthColor}`}
                borderRadius={10}
              >
                <Box
                  color={primaryColor}
                  style={{ opacity: 0.62 }}
                  fontSize={15}
                  fontWeight={700}
                  mb={3.5}
                >
                  Найти
                </Box>
                <Box position="relative">
                  <Box
                    position="absolute"
                    top={0}
                    bottom={0}
                    left={16}
                    display="flex"
                    alignItems="center"
                  >
                    <SearchIcon fill={primaryColor} />
                  </Box>
                  <input
                    type="text"
                    placeholder="Поиск по организациям"
                    value={searchValue}
                    name="search"
                    onChange={e => onSearch(e)}
                    className="search-input"
                    onFocus={() => setOpacity(true)}
                    onBlur={() => setOpacity(false)}
                    autoComplete="off"
                    style={{
                      backgroundColor: `${thirdColor}`,
                      color: `${primaryColor}`,
                      border: opacity
                        ? `1px solid ${secondaryColor}`
                        : '1px solid transparent',
                    }}
                  />
                </Box>
                <Box
                  maxWidth={500}
                  py={2.5}
                  px={2}
                  display={searchValue ? 'flex' : 'none'}
                  flexDirection="column"
                  position="absolute"
                  boxShadow="0px 4px 50px rgba(0, 49, 102, 0.16)"
                  left={32}
                  right={32}
                  top={140}
                  zIndex={5}
                  borderRadius={15}
                  bgcolor={fourthColor}
                >
                  {found.length === 0 && (
                    <Box
                      p={1}
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                      mb={1}
                      bgcolor={fourthColor}
                    >
                      <Box color={primaryColor}>
                        По вашему запросу ничего не найдено
                      </Box>
                    </Box>
                  )}
                  {found.map(find => {
                    return (
                      <ClickAwayListener
                        key={find.id}
                        onClickAway={() => setSearchValue('')}
                      >
                        <Box
                          p={1}
                          className={s.result}
                          display="flex"
                          justifyContent="flex-start"
                          alignItems="center"
                          mb={1}
                          position="relative"
                          style={{
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            if (find.role === 0) {
                              push(`/welcome?id=${find.id}`);
                            } else {
                              push(`/cafeteria?id=${find.id}`);
                            }
                          }}
                        >
                          {find.image && find.image !== '' ? (
                            <Box
                              borderRadius="50%"
                              width="76px"
                              height="76px"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              overflow="hidden"
                              bgcolor={thirdColor}
                            >
                              <Box
                                component="img"
                                src={find.image}
                                alt="image"
                                width={1}
                              />
                            </Box>
                          ) : (
                            <Box
                              bgcolor={thirdColor}
                              borderRadius="50%"
                              width="76px"
                              height="76px"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Box
                                color={primaryColor}
                                fontSize={18}
                                fontWeight={600}
                              >
                                {find.title[0]}
                              </Box>
                            </Box>
                          )}
                          <Box component="span" ml={2.5} color={primaryColor}>
                            {find.title}
                          </Box>
                        </Box>
                      </ClickAwayListener>
                    );
                  })}
                </Box>
                <Box
                  color={primaryColor}
                  style={{ opacity: 0.62 }}
                  fontSize={15}
                  fontWeight={500}
                  mt={3.5}
                >
                  Чтобы подключиться к новой организации найдите ее
                </Box>
              </Box>
              {/* <Box p={4} bgcolor={`${fourthColor}`} mb={2.5} borderRadius={10}>
                <Box
                  color={primaryColor}
                  style={{ opacity: 0.62 }}
                  fontSize={15}
                  fontWeight={700}
                  mb={2.5}
                >
                  Создать свое
                </Box>
                <Box width={1} display="flex" justifyContent="center" mb={3}>
                  <Box component="img" src="/character.svg" alt="character" />
                </Box>
                <Box
                  color={primaryColor}
                  style={{ opacity: 0.62 }}
                  fontSize={15}
                  fontWeight={500}
                  mb={3}
                >
                  Если Вы представитель компании или группы людей по интересам,
                  Вы можете создать свое собственное рабочее пространство.
                  Требуется подписание договора.
                </Box>
                <Box width={1}>
                  <Button onClick={() => push('/new-workspace')}>
                    Создать пространство
                  </Button>
                </Box>
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Template>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isTostOpened}
        onClose={() => setIsTostOpened(false)}
        autoHideDuration={4000}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor={secondaryColor}
          p={2.5}
          borderRadius={10}
        >
          <InfoIcon style={{ color: fourthColor }} />
          <Box ml={2} color={fourthColor} fontSize={15} fontWeight={500}>
            Данный workspace еще не активирован
          </Box>
        </Box>
      </Snackbar>
    </>
  );
}
