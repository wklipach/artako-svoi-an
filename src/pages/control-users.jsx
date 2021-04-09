import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

import { Box } from '@material-ui/core';
import Template from '../Components/Template';
import ControlUserCard from '../Components/ControlUserCard';

import { useWorkspaces } from '../lib/api/workspaces';
import { useAuth } from '../lib/api/auth';
import { useTheme } from '../lib/theme';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowLeft from '../Components/CustomIcons/arrowLeft';
import StarIcon from '../Components/CustomIcons/star';
import BalanceRightIcon from '../Components/CustomIcons/balanceRight';
import DownloadIcon from '../Components/CustomIcons/download';
import SearchIcon from '../Components/CustomIcons/searchIcon';
import FillBalanceIcon from '../Components/CustomIcons/fillBalanceIcon';

function ControlUsers() {
  const isMobile = useMediaQuery({ maxWidth: 960 });
  const { push } = useRouter();
  const {
    users,
    isUsersLoaded,
    getUsers,
    selectedWorkspace,
    setRole,
    getUsersExel,
    setUserPoints,
    setUserBalance,
    viewWorkspace,
  } = useWorkspaces();
  const { user, getProfile } = useAuth();
  const { primaryColor, secondaryColor, thirdColor, fourthColor } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [activeTab, setActiveTab] = useState('3,4');
  const [isUserMenuOpened, setIsUserMenuOpened] = useState('');

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (selectedWorkspace && selectedWorkspace.status === 0) {
      push('/workspaces');
    }
    if (selectedWorkspace) {
      getUsers({ id: selectedWorkspace.id });
    }
  }, [selectedWorkspace]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  function onSearch(e) {
    setSearch(e.target.value);
    const filtered = users.filter(i => {
      if (
        i.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
        String(i.phone).indexOf(e.target.value.replace('+', '')) !== -1
      ) {
        return true;
      }
    });
    setFilteredUsers(filtered);
  }

  function changeRole(u, role) {
    setRole({
      user_id: u.id,
      role,
      workspace_id: selectedWorkspace.id,
    }).then(res => {
      if (res.status === 'success') {
        if (user.phone === u.phone) {
          window.location.href = '/workspaces';
        } else {
          setIsUserMenuOpened('');
          getUsers({ id: selectedWorkspace.id });
        }
      } else if (res.error === 'WORKSPACE_NOT_FOUND') {
        window.location.href = '/workspaces';
      }
    });
  }

  function onDownload() {
    getUsersExel({ id: selectedWorkspace.id }).then(({ file, status }) => {
      if (status === 'success') {
        const blob = new Blob([file], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
        });
        const aEle = document.createElement('a'); // Create a label
        const href = window.URL.createObjectURL(blob); // Create downloaded link
        aEle.href = href;
        aEle.download = 'users.xlsx'; // File name after download
        document.body.appendChild(aEle);
        aEle.click(); // Click to download
        document.body.removeChild(aEle); // Download complete remove element
        window.URL.revokeObjectURL(href); // Release blob object
      }
    });
  }

  if (!isUsersLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Управление пользователями | Свои</title>
      </Head>
      <Template isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
        <Box
          bgcolor={thirdColor}
          height={1}
          px={{ sm: 0, xs: 0, md: 3 }}
          py={{ sm: 3, xs: 0, md: 1 }}
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
            textAlign={{ sm: 'center', xs: 'center', md: 'left' }}
            display={{ sm: 'flex', xs: 'flex', md: 'unset' }}
            justifyContent="center"
            alignItems="center"
          >
            <Box
              component="span"
              width="60%"
              fontSize={22}
              fontWeight={700}
              ml={1.5}
            >
              Управление пользователями
            </Box>
          </Box>
          <Box
            mt={4}
            ml={{ sm: 0, xs: 0, md: '12px' }}
            display={{ sm: 'block', xs: 'block', md: 'grid' }}
            gridTemplateColumns={{ sm: 'unset', md: '60% 40%' }}
          >
            <Box
              borderRight={{
                sm: 0,
                xs: 0,
                md: '1px solid rgba(0, 49, 102, 0.12)',
              }}
              pr={{ sm: 2.5, xs: 2.5, md: 4 }}
              pl={{ sm: 2.5, xs: 2.5, md: 0 }}
            >
              <Box
                maxWidth={{ xs: 1, sm: 1, md: 610 }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box position="relative" width={1}>
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
                    placeholder="Поиск по пользователям..."
                    name="search"
                    className="search-input"
                    autoComplete="off"
                    value={search}
                    onChange={onSearch}
                    style={{
                      backgroundColor: fourthColor,
                      color: primaryColor,
                      borderColor: secondaryColor,
                      marginRight: 0,
                      maxWidth: 'unset',
                    }}
                  />
                </Box>
              </Box>
              <Box
                mt={2.5}
                display="flex"
                maxWidth={1}
                overflow={{
                  sm: 'auto hidden',
                  xs: 'auto hidden',
                  md: 'hidden',
                }}
                flexWrap={{ sm: 'nowrap', xs: 'nowrap', md: 'wrap' }}
              >
                {[
                  { label: 'Пользователи', values: '3,4' },
                  { label: 'Заявки', values: '5' },
                  { label: 'Администраторы', values: '1,2' },
                ].map(i => {
                  return (
                    <Box
                      key={i.label}
                      onClick={() => setActiveTab(i.values)}
                      p={2}
                      borderBottom={`${
                        activeTab === i.values ? '2px' : '1px'
                      } solid ${
                        activeTab === i.values ? secondaryColor : '#D5DEE9'
                      }`}
                      style={{
                        cursor: 'pointer',
                      }}
                      color={
                        activeTab === i.values
                          ? primaryColor
                          : 'rgba(0, 49, 102, 0.53)'
                      }
                      fontSize={15}
                      fontWeight={activeTab === i.values ? 700 : 500}
                    >
                      {i.label}
                      <Box component="span" ml={0.5} color={secondaryColor}>
                        {`(${
                          users.filter(u => i.values.indexOf(u.role) !== -1)
                            .length
                        })`}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <Box mt={2.5}>
                {filteredUsers.map(u => {
                  if (activeTab.indexOf(u.role) === -1) {
                    return <></>;
                  }

                  return (
                    <ControlUserCard
                      key={u.id}
                      isMobile={isMobile}
                      setIsUserMenuOpened={setIsUserMenuOpened}
                      isUserMenuOpened={isUserMenuOpened}
                      user={u}
                      changeRole={changeRole}
                      setUserPoints={setUserPoints}
                      workspaceId={selectedWorkspace.id}
                      setUserBalance={setUserBalance}
                      viewWorkspace={viewWorkspace}
                    />
                  );
                })}
              </Box>
            </Box>
            <Box ml={{ sm: 0, xs: 0, md: 4.5 }} mt={{ sm: 2, xs: 2, md: 0 }}>
              <Box
                bgcolor={secondaryColor}
                borderRadius={{ sm: 45, xs: 45, md: 20 }}
                px={2}
                py={3.5}
                position="relative"
              >
                <Box
                  minWidth={36}
                  height={36}
                  borderRadius="50%"
                  bgcolor={fourthColor}
                  display={{ sm: 'flex', xs: 'flex', md: 'none' }}
                  alignItems="center"
                  justifyContent="center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    onDownload();
                  }}
                  position="absolute"
                  top={-15}
                  right={30}
                >
                  <DownloadIcon />
                </Box>
                <Box
                  component="span"
                  color={primaryColor}
                  style={{ opacity: 0.62 }}
                  fontSize={15}
                  fontWeight={600}
                >
                  ИТОГО
                </Box>
                <Box
                  mt={3.5}
                  display="flex"
                  flexDirection={{
                    sm: 'row-reverse',
                    xs: 'row-reverse',
                    md: 'row',
                  }}
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Box display="flex" alignItems="center">
                    <StarIcon />
                    <Box
                      component="span"
                      fontSize={17}
                      fontWeight={500}
                      ml={1}
                      color={primaryColor}
                    >
                      {users.reduce((acc, i) => acc + i.user_points, 0)}
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <BalanceRightIcon />
                    <Box
                      component="span"
                      fontSize={17}
                      fontWeight={500}
                      ml={1}
                      color={primaryColor}
                    >
                      {users.reduce((acc, i) => acc + i.user_balance, 0)} ₽
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                bgcolor={secondaryColor}
                borderRadius={{ sm: 45, xs: 45, md: 20 }}
                px={2}
                py={3.5}
                position="relative"
                mt={2}
              >
                <Box
                  component="span"
                  color={primaryColor}
                  style={{ opacity: 0.62 }}
                  fontSize={15}
                  fontWeight={600}
                >
                  БАЛАНС
                </Box>
                <Box
                  mt={3.5}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  {selectedWorkspace && (
                    <Box display="flex" alignItems="center">
                      <BalanceRightIcon />
                      <Box
                        component="span"
                        fontSize={17}
                        fontWeight={500}
                        ml={1}
                        color={primaryColor}
                      >
                        {selectedWorkspace.balance}
                      </Box>
                    </Box>
                  )}
                  <Box
                    display="flex"
                    alignItems="center"
                    flexGrow={1}
                    justifyContent="flex-end"
                  >
                    <Box
                      fontSize={11}
                      fontWeight={500}
                      color={`${primaryColor}66`}
                    >
                      Пополнить баланс
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      minWidth={36}
                      height={36}
                      bgcolor={fourthColor}
                      borderRadius="50%"
                      ml={1.5}
                    >
                      <FillBalanceIcon fill={secondaryColor} />
                    </Box>
                  </Box>
                </Box>
              </Box>
              {!isMobile && (
                <Box
                  mt={2.5}
                  py={1}
                  px={2}
                  display="flex"
                  bgcolor={secondaryColor}
                  borderRadius={27}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    component="span"
                    fontWeight={600}
                    fontSize={15}
                    color={primaryColor}
                    style={{ opacity: 0.62 }}
                  >
                    СКАЧАТЬ
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Box
                      component="span"
                      fontWeight={500}
                      fontSize={11}
                      color={primaryColor}
                      style={{ opacity: 0.4 }}
                      pl={4}
                    >
                      Скачать в excel
                    </Box>
                    <Box
                      minWidth={36}
                      height={36}
                      borderRadius="50%"
                      bgcolor={fourthColor}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      ml={1.5}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        onDownload();
                      }}
                    >
                      <DownloadIcon fill={secondaryColor} />
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Template>
    </>
  );
}

export default ControlUsers;
