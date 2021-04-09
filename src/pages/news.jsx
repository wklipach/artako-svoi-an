import React, { useState } from 'react';
import Head from 'next/head';
import { useMediaQuery } from 'react-responsive';

import Box from '@material-ui/core/Box';
import Template from '../Components/Template';
import NewsRightSide from '../Components/News';

import { useTheme } from '../lib/theme';

import NewsMobile from '../Components/News/mobile';
import MenuIcon from '@material-ui/icons/Menu';

import s from '../styles/Profile.module.scss';

function News() {
  const { primaryColor, thirdColor } = useTheme();
  const isMobile = useMediaQuery({ maxWidth: 960 });
  const [isMenuOpen, setIsMenuOpen] = useState();
  const [isActive, setIsActive] = useState(isMobile ? 'company' : 'news');

  function renderActiveDialogue(value) {
    switch (value) {
      case 'news': {
        return setIsActive('news');
      }
      case 'company': {
        return setIsActive('company');
      }
      case 'sport': {
        return setIsActive('sport');
      }
      case 'leisure': {
        return setIsActive('leisure');
      }
      default:
        setIsActive('events');
    }
  }

  return (
    <>
      <Head>
        <title>Новости | Свои</title>
      </Head>
      <Template isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
        <Box
          px={{ sm: 0, xs: 0, md: 3 }}
          py={3}
          bgcolor={thirdColor}
          minHeight={1}
          minWidth={1}
        >
          <Box
            display={{ xs: 'flex', sm: 'flex', md: 'usnet' }}
            justifyContent="space-between"
            alignItems="center"
            px={{ xs: 2, sm: 2, md: 0 }}
          >
            {isMobile && (
              <Box
                left={20}
                top={10}
                zIndex={1}
                onClick={() => setIsMenuOpen(true)}
              >
                <MenuIcon />
              </Box>
            )}
            <Box
              color={primaryColor}
              fontSize={22}
              fontWeight={600}
              display={{ xs: 'flex', sm: 'flex', md: 'unset' }}
              alignItems="center"
              justifyContent="center"
              width={1}
            >
              <Box>Новости</Box>
            </Box>
          </Box>
          <Box
            display={{ sm: 'flex', xs: 'flex', md: 'grid' }}
            flexDirection="column"
            gridTemplateColumns="35% auto"
            mt={3.5}
          >
            <Box
              display="flex"
              flexDirection={{ sm: 'row', xs: 'row', md: 'column' }}
              justifyContent="space-between"
              height={!isMobile && 247}
              className={isMobile && s.newsDialogue}
            >
              {!isMobile && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyConent={{
                    sm: 'center',
                    xs: 'center',
                    md: 'flex-start',
                  }}
                  height={44}
                  bgcolor={
                    isMobile
                      ? 'unset'
                      : isActive === 'news' && 'rgba(0, 122, 255, 0.13)'
                  }
                  color={
                    isMobile ? 'unset' : isActive === 'news' && primaryColor
                  }
                  borderRadius={isActive === 'news' && 60}
                  fontWeight={!isMobile ? 500 : isActive === 'news' && 600}
                  maxWidth={{ sm: 'unset', xs: 'unset', md: 274 }}
                  pl={{ sm: 0, xs: 0, md: 4 }}
                  onClick={() => {
                    renderActiveDialogue('news');
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Все{' '}
                  <Box component="span" pl={0.5} color={primaryColor}>
                    (12)
                  </Box>
                </Box>
              )}
              <Box
                display="flex"
                alignItems="center"
                fontWeight={!isMobile ? 500 : isActive === 'company' && 600}
                height={44}
                maxWidth={{ sm: 'unset', xs: 'unset', md: 274 }}
                pl={4}
                fontSize={isMobile && 17}
                onClick={() => {
                  renderActiveDialogue('company');
                }}
                style={{ cursor: 'pointer' }}
                bgcolor={
                  isMobile
                    ? 'unset'
                    : isActive === 'company' && 'rgba(0, 122, 255, 0.13)'
                }
                color={
                  isMobile ? 'unset' : isActive === 'company' && primaryColor
                }
                borderRadius={isActive === 'company' && 60}
              >
                Наша компания
                <Box component="span" pl={0.5} color={primaryColor}>
                  (12)
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                height={44}
                maxWidth={{ sm: 'unset', xs: 'unset', md: 274 }}
                fontWeight={!isMobile ? 500 : isActive === 'sport' && 600}
                pl={4}
                fontSize={isMobile && 17}
                onClick={() => {
                  renderActiveDialogue('sport');
                }}
                style={{ cursor: 'pointer' }}
                bgcolor={
                  isMobile
                    ? 'unset'
                    : isActive === 'sport' && 'rgba(0, 122, 255, 0.13)'
                }
                color={
                  isMobile ? 'unset' : isActive === 'sport' && primaryColor
                }
                borderRadius={isActive === 'sport' && 60}
              >
                Спорт{' '}
                <Box component="span" pl={0.5} color={primaryColor}>
                  (12)
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                height={44}
                maxWidth={{ sm: 'unset', xs: 'unset', md: 274 }}
                pl={4}
                fontSize={isMobile && 17}
                fontWeight={!isMobile ? 500 : isActive === 'leisure' && 600}
                onClick={() => {
                  renderActiveDialogue('leisure');
                }}
                style={{ cursor: 'pointer' }}
                bgcolor={
                  isMobile
                    ? 'unset'
                    : isActive === 'leisure' && 'rgba(0, 122, 255, 0.13)'
                }
                color={
                  isMobile ? 'unset' : isActive === 'leisure' && primaryColor
                }
                borderRadius={isActive === 'leisure' && 60}
              >
                Досуг{' '}
                <Box component="span" pl={0.5} color={primaryColor}>
                  (12)
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                fontWeight={!isMobile ? 500 : isActive === 'events' && 600}
                height={44}
                maxWidth={{ sm: 'unset', xs: 'unset', md: 274 }}
                pl={4}
                fontSize={isMobile && 17}
                onClick={() => {
                  renderActiveDialogue('events');
                }}
                style={{ cursor: 'pointer' }}
                bgcolor={
                  isMobile
                    ? 'unset'
                    : isActive === 'events' && 'rgba(0, 122, 255, 0.13)'
                }
                color={
                  isMobile ? 'unset' : isActive === 'events' && primaryColor
                }
                borderRadius={isActive === 'events' && 60}
              >
                Мероприятия{' '}
                <Box component="span" pl={0.5} color={primaryColor}>
                  (12)
                </Box>
              </Box>
            </Box>
            {!isMobile ? (
              <Box>
                <NewsRightSide
                  primaryColor={primaryColor}
                  isActive={isActive}
                />
              </Box>
            ) : (
              <NewsMobile primaryColor={primaryColor} />
            )}
          </Box>
        </Box>
      </Template>
    </>
  );
}

export default News;
