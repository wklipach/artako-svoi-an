import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { useMediaQuery } from 'react-responsive';

import { Box, ClickAwayListener } from '@material-ui/core';

import { useWorkspaces } from '../../lib/api/workspaces';
import { useAuth } from '../../lib/api/auth';
import { useTheme } from '../../lib/theme';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CustomPercentIcon from '../CustomIcons/customPercentIcon';
import MessengerIcon from '../CustomIcons/messengerIcon';
import SpeakerIcon from '../CustomIcons/speakerIcon';
import BulbIcon from '../CustomIcons/bulbIcon';
import FileTextIcon from '../CustomIcons/fileTextIcon';
import PieChartIcon from '../CustomIcons/pieChartIcon';
import BriefcaseIcon from '../CustomIcons/briefcaseIcon';

import s from './styles.module.scss';

const navItems = [
  {
    name: 'Витрина скидок',
    url: '/cafeteria',
    icon: CustomPercentIcon,
    active: ['/cafeteria', '/place'],
    key: 'cafeteria',
  },
  {
    name: 'Мессенджер',
    url: '#',
    icon: MessengerIcon,
    active: [],
    key: 'messenger',
  },
  {
    name: 'Новости',
    url: '/news',
    icon: SpeakerIcon,
    active: ['/news'],
    key: 'news',
  },
  {
    name: 'Идеи',
    url: '#',
    icon: BulbIcon,
    active: [],
    key: 'ideas',
  },
  {
    name: 'Конкурсы',
    url: '#',
    icon: FileTextIcon,
    active: [],
    key: 'contests',
  },
  {
    name: 'Мои траты',
    url: '/analytics',
    icon: PieChartIcon,
    active: ['/analytics'],
    key: 'cafeteria',
  },
];

function SideBar({ isMenuOpen, setIsMenuOpen }) {
  const { selectedWorkspace } = useWorkspaces();
  const { secondaryColor, thirdColor, fourthColor } = useTheme();
  const { push, pathname } = useRouter();
  const { user } = useAuth();
  const isMobile = useMediaQuery({ maxWidth: 960 });

  if (!user) {
    return <div />;
  }

  if (isMobile && !isMenuOpen) {
    return <div />;
  }

  return (
    <ClickAwayListener onClickAway={() => setIsMenuOpen(false)}>
      <Box width={280} height={1} position="relative">
        <Box
          bgcolor={secondaryColor}
          display="flex"
          position={{
            xs: isMenuOpen ? 'fixed' : 'unset',
            sm: isMenuOpen ? 'fixed' : 'unset',
            md: 'fixed',
          }}
          top={0}
          bottom={0}
          left={0}
          right={isMenuOpen ? 40 : 'unset'}
          zIndex={10}
          flexDirection="column"
          justifyContent="space-between"
          width={280}
        >
          <Box height="calc(100% - 80px)" className={s.scroll}>
            <Box>
              <Box p={1.5}>
                <Box
                  width={1}
                  bgcolor="rgba(255, 255, 255, 0.13)"
                  borderRadius={10}
                  py={1.5}
                  pl={1}
                  pr={2}
                  display="flex"
                  gridTemplateColumns="60px auto 12px"
                  style={{ cursor: 'pointer' }}
                  mb={2}
                  onClick={() => push('/workspaces')}
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height={60}
                    minWidth={60}
                    width={60}
                    bgcolor={thirdColor}
                    borderRadius="50%"
                    overflow="hidden"
                  >
                    {selectedWorkspace &&
                    selectedWorkspace.image &&
                    selectedWorkspace.image !== '' ? (
                      <Box
                        component="img"
                        width={1}
                        src={
                          selectedWorkspace
                            ? selectedWorkspace.image
                            : '/temp-logo.svg'
                        }
                        alt="logo"
                      />
                    ) : (
                      <Box
                        bgcolor={thirdColor}
                        borderRadius="50%"
                        width={1}
                        height={1}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {selectedWorkspace && (
                          <Box
                            color={secondaryColor}
                            fontSize={17}
                            fontWeight={600}
                          >
                            {selectedWorkspace.title[0]}
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                  <Box
                    height={1}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    pl={1.5}
                  >
                    {selectedWorkspace ? (
                      <Box
                        fontSize={17}
                        fontWeight={700}
                        color={fourthColor}
                        lineHeight="21px"
                      >
                        {selectedWorkspace.title}
                      </Box>
                    ) : (
                      <Box
                        fontSize={15}
                        fontWeight={400}
                        color={fourthColor}
                        lineHeight="18px"
                      >
                        Организация
                      </Box>
                    )}
                  </Box>
                  <Box
                    height={1}
                    width={12}
                    minWidth={12}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    flexGrow={1}
                    alignItems="flex-end"
                  >
                    <Box
                      height={22.5}
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      <ArrowForwardIosIcon style={{ color: fourthColor }} />
                    </Box>
                  </Box>
                </Box>
                <Box>
                  {navItems.map(item => {
                    if (selectedWorkspace && selectedWorkspace[item.key]) {
                      if (selectedWorkspace[item.key] == 0) {
                        return;
                      }
                    }

                    return (
                      <Box
                        key={item.name}
                        display="flex"
                        alignItems="center"
                        height={57}
                        px={2}
                        style={{ cursor: 'pointer' }}
                        bgcolor={`${
                          item.active.indexOf(pathname) !== -1
                            ? 'rgba(51, 44, 161, 0.24)'
                            : 'unset'
                        }`}
                        borderRadius={10}
                        onClick={() => {
                          if (item.url === '/cafeteria') {
                            push(`${item.url}?id=${selectedWorkspace.id}`);
                          } else {
                            push(item.url);
                          }
                        }}
                        mb={1}
                      >
                        <Box mr={2.5}>
                          <item.icon fill={fourthColor} />
                        </Box>
                        <Box color={fourthColor} fontSize={15} fontWeight={500}>
                          {item.name}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box width={1} height={2} bgcolor="rgba(255, 255, 255, 0.26)" />
            </Box>
            {selectedWorkspace && selectedWorkspace.role === 1 && (
              <Box
                flex={1}
                display="flex"
                flexDirection="column"
                p={1.5}
                position="relative"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  height={57}
                  px={2}
                  style={{ cursor: 'pointer' }}
                  bgcolor={`${
                    pathname.indexOf('workspace-settings') !== -1 ||
                    pathname.indexOf('control-design') !== -1 ||
                    pathname.indexOf('control-users') !== -1 ||
                    pathname.indexOf('cafeteria-settings') !== -1 ||
                    pathname.indexOf('all-settings') !== -1
                      ? 'rgba(51, 44, 161, 0.24)'
                      : 'unset'
                  }`}
                  borderRadius={10}
                  onClick={() => push('/workspace-settings')}
                >
                  <Box mr={2.5}>
                    <BriefcaseIcon fill={fourthColor} />
                  </Box>
                  <Box color={fourthColor} fontSize={15} fontWeight={500}>
                    Настройки workspace
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          <Box
            px={1.5}
            display="grid"
            gridTemplateColumns="60px auto"
            height={60}
            style={{ cursor: 'pointer' }}
            onClick={() => push('/profile')}
            mb={2.5}
          >
            {user && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                minHeight={60}
                overflow="hidden"
                borderRadius="50%"
                bgcolor={fourthColor}
              >
                {user.photo && user.photo !== '' ? (
                  <Box
                    component="img"
                    src={user.photo}
                    alt="avatar"
                    width={60}
                  />
                ) : (
                  <Box color={secondaryColor} fontSize={17} fontWeight={700}>
                    {user.name[0]}
                  </Box>
                )}
              </Box>
            )}
            <Box
              ml={1.5}
              minHeight={1}
              display="flex"
              flexDirection="column"
              justifyContent="space-around"
            >
              {user && (
                <Box color={fourthColor} fontSize={17} fontWeight={700}>
                  {user.name}
                </Box>
              )}
              <Box color={fourthColor} fontSize={15} fontWeight={400}>
                Настройки профиля
              </Box>
            </Box>
          </Box>
          <Box
            height={60}
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontWeight={400}
            fontSize={15}
            color="#dadada"
            style={{ cursor: 'pointer' }}
            borderTop="1px solid rgba(255, 255, 255, 0.26)"
            onClick={() => push('/contacts')}
          >
            Связь с нами
          </Box>
        </Box>
      </Box>
    </ClickAwayListener>
  );
}

SideBar.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  setIsMenuOpen: PropTypes.func.isRequired,
};

export default SideBar;
