import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useMediaQuery } from 'react-responsive';

import { Box } from '@material-ui/core';
import Template from '../Components/Template';
import Button from '../Components/Button';

import { usePratners } from '../lib/api/partners';
import { useWorkspaces } from '../lib/api/workspaces';

import StarIcon from '../Components/CustomIcons/star';
import MenuIcon from '@material-ui/icons/Menu';
import BalanceRightIcon from '../Components/CustomIcons/balanceRight';

import s from '../styles/Profile.module.scss';
import { useTheme } from '../lib/theme';

function ControlUsers() {
  const isMobile = useMediaQuery({ maxWidth: 960 });
  const { selectedWorkspace, viewWorkspace } = useWorkspaces();
  const { primaryColor, fourthColor, thirdColor, secondaryColor } = useTheme();

  const {
    categories,
    isCategoriesLoaded,
    getCategories,
    getPartners,
    partners,
  } = usePratners();
  const { push, query } = useRouter();
  const { id, cat_id } = query;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [catId, setCatId] = useState(cat_id || null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      if (!localStorage.getItem('token')) {
        push(`/welcome?id=${id}`);
      } else {
        getCategories({ id: id ? id : selectedWorkspace.id }).then(res => {
          if (
            res.status === 'success' &&
            res.payload.length !== 0 &&
            catId == null
          ) {
            setCatId(res.payload[0].id);
          }
        });
      }
    }
  }, [id]);

  useEffect(() => {
    if (selectedWorkspace) {
      if (id && selectedWorkspace.id != id) {
        viewWorkspace({ id }).then(res => {
          if (res.status === 'error' && res.error === 'ID_NOT_FOUND') {
            setError('ID_NOT_FOUND');
          }
        });
      }
      if (!id) {
        push(`/cafeteria?id=${selectedWorkspace.id}`);
      }
      if (
        (selectedWorkspace.role === 0 || selectedWorkspace.role === 5) &&
        selectedWorkspace.id == id
      ) {
        push(`/welcome?id=${id}`);
      }
    }
  }, [selectedWorkspace]);

  useEffect(() => {
    if (catId !== null) {
      push(`/cafeteria?id=${id}&cat_id=${catId}`);
      fetchPartners(catId);
    }
  }, [catId]);

  function fetchPartners(category) {
    if (selectedWorkspace) {
      const partnerParams = {
        id: id ? id : selectedWorkspace.id,
      };
      if (category) {
        partnerParams.cat_id = category;
      }
      getPartners(partnerParams);
    }
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
              window.location.href = '/workspaces';
            }}
            color={primaryColor}
          >
            Назад
          </Button>
        </Box>
      </Box>
    );
  }

  if (!isCategoriesLoaded || !selectedWorkspace) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Витрина скидок | Свои</title>
      </Head>
      <Template isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
        <Box width={1} display="flex" height={1}>
          <Box
            bgcolor={thirdColor}
            height={1}
            px={{ sm: 0, xs: 0, md: 3 }}
            py={{ sm: 3, xs: 3, md: 1 }}
            maxWidth={1}
            width={1}
            position="relative"
            mb={1}
            borderRight={{
              sm: 0,
              xs: 0,
              md:
                selectedWorkspace.user_points === 0 &&
                selectedWorkspace.user_balance === 0
                  ? 0
                  : `1px solid ${primaryColor}1F`,
            }}
          >
            {isMobile && (
              <Box
                position="absolute"
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
              bgcolor="transparent"
              textAlign={{ sm: 'center', xs: 'center', md: 'left' }}
              display={{ sm: 'flex', xs: 'flex', md: 'unset' }}
              justifyContent="center"
              alignItems="center"
            >
              <Box component="span" fontSize={22} fontWeight={700} ml={1.5}>
                Витрина скидок
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent={{
                sm: 'center',
                xs: 'center',
                md: 'space-between',
              }}
              alignItems="center"
              mt={2.5}
              mx={{ sm: 2, xs: 2, md: 0 }}
            >
              {isMobile && (
                <Box pr={3} pl={3.5} width={1}>
                  <Box
                    bgcolor={fourthColor}
                    borderRadius="20px"
                    maxWidth={{ sm: 1, xs: 1, md: '338px' }}
                    mt={4}
                    py={3}
                    px={2}
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Box
                        component="span"
                        color={primaryColor}
                        style={{ opacity: 0.62 }}
                        fontSize={15}
                        fontWeight={600}
                      >
                        БАЛАНС
                      </Box>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      {selectedWorkspace && (
                        <Box display="flex" alignItems="center">
                          <Box component="img" src="/Vector.png" alt="vector" />
                          <Box
                            component="span"
                            fontWeight={600}
                            fontSize={17}
                            color={primaryColor}
                            ml={1}
                          >
                            {`${selectedWorkspace.user_balance} ₽`}
                          </Box>
                        </Box>
                      )}
                      {selectedWorkspace && (
                        <Box display="flex" alignItems="center">
                          <StarIcon fill={primaryColor} />
                          <Box
                            component="span"
                            fontWeight={600}
                            fontSize={17}
                            color={primaryColor}
                            ml={1}
                          >
                            {selectedWorkspace.user_points}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              )}
              <Box
                className={isMobile && s.scrollBar}
                display="flex"
                flexWrap={{ sm: 'nowrap', xs: 'nowrap', md: 'wrap' }}
                maxWidth={1}
              >
                {categories.map(i => {
                  return (
                    <Box
                      key={i.id}
                      p={2}
                      borderBottom={
                        !isMobile
                          ? catId == i.id
                            ? `1px solid ${secondaryColor}`
                            : `1px solid ${thirdColor}`
                          : 0
                      }
                      style={{ cursor: 'pointer' }}
                      fontSize={15}
                      fontWeight={catId == i.id ? 600 : 500}
                      color={catId == i.id ? primaryColor : secondaryColor}
                      onClick={() => setCatId(i.id)}
                    >
                      {i.title}
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box
              mt={4}
              display="flex"
              flexDirection={{ sm: 'column', xs: 'column', md: 'row' }}
              flexWrap="wrap"
              alignItems="center"
              columnGap="22px"
            >
              {partners.map(item => {
                if (item.category == catId) {
                  return (
                    <Box
                      key={item.id}
                      width={338}
                      maxHeight={480}
                      height={440}
                      borderRadius={19}
                      position="relative"
                      mr={{ sm: 0, xs: 0, md: 2.5 }}
                      onClick={() => push(`/place?id=${item.id}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <Box
                        position="relative"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        overflow="hidden"
                        borderRadius={20}
                        height={236}
                        width={338}
                      >
                        {item.gallery[0] !== '' ? (
                          <Box
                            component="img"
                            src={item.gallery[0]}
                            borderRadius={20}
                            width="fit-content"
                            height="fit-content"
                          />
                        ) : (
                          <Box
                            borderRadius={20}
                            minHeight={236}
                            width={1}
                            bgcolor="#ccc"
                          />
                        )}
                        <Box position="absolute" top={0} right={0} />
                      </Box>
                      <Box
                        py={6}
                        px={2.5}
                        width={1}
                        bgcolor={fourthColor}
                        position="absolute"
                        borderRadius={19}
                        top={200}
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        maxHeight={176}
                        height={176}
                      >
                        <Box
                          display="flex"
                          justifyContent="center"
                          overflow="hidden"
                          alignItems="center"
                          height={75}
                          width={75}
                          position="absolute"
                          top="-37.5px"
                          left="calc(50% - 37.5px)"
                          borderRadius="50%"
                          border="1px solid rgba(0, 49, 102, 0.17)"
                          bgcolor={fourthColor}
                        >
                          {item.logo !== '' ? (
                            <Box component="img" src={item.logo} width={1} />
                          ) : (
                            <Box
                              width={1}
                              height={1}
                              borderRadius="50%"
                              bgcolor="#D4E5FA"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Box
                                color="#007aff"
                                fontSize={17}
                                fontWeight={600}
                              >
                                {item.title[0]}
                              </Box>
                            </Box>
                          )}
                        </Box>
                        <Box
                          component="span"
                          fontSize={17}
                          fontWeight={600}
                          color={primaryColor}
                          mb={1}
                        >
                          {item.title}
                        </Box>
                        {(item.discount !== 0 ||
                          item.discount_balance !== 0 ||
                          item.discount_points !== 0) && (
                          <Box
                            component="span"
                            fontSize={17}
                            fontWeight={500}
                            color={primaryColor}
                            display="flex"
                          >
                            <Box mr={0.5}>Скидка:</Box>
                            {item.discount !== 0 && (
                              <Box display="flex">
                                <Box>{`${item.discount}${
                                  item.discount_type === 1 ? '₽' : '%'
                                }`}</Box>
                                {(item.discount_points !== 0 ||
                                  item.discount_balance !== 0) && (
                                  <Box mx={0.5}>+</Box>
                                )}
                              </Box>
                            )}
                            {item.discount_points !== 0 && (
                              <Box display="flex">
                                <Box mr={0.5}>{`${item.discount_points}%`}</Box>
                                <StarIcon fill={primaryColor} />
                                {item.discount_balance !== 0 && (
                                  <Box mx={0.5}>+</Box>
                                )}
                              </Box>
                            )}
                            {item.discount_balance !== 0 && (
                              <Box display="flex" alignItems="center">
                                <Box
                                  mr={0.5}
                                >{`${item.discount_balance}%`}</Box>
                                <BalanceRightIcon />
                              </Box>
                            )}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  );
                }
              })}
            </Box>
          </Box>
          {(selectedWorkspace.user_points === 0 &&
            selectedWorkspace.user_balance === 0) ||
            (!isMobile && (
              <Box bgcolor={thirdColor} pr={3} pl={3.5}>
                <Box
                  bgcolor={fourthColor}
                  borderRadius="20px"
                  width={338}
                  mt={4}
                  py={3}
                  px={2}
                >
                  <Box display="flex" justifyContent="space-between">
                    <Box
                      component="span"
                      color={primaryColor}
                      style={{ opacity: 0.62 }}
                      fontSize={15}
                      fontWeight={600}
                    >
                      БАЛАНС
                    </Box>
                    <Box component="img" src="Presenting.png" maxWidth={0.6} />
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    {selectedWorkspace && (
                      <Box display="flex" alignItems="center">
                        <Box component="img" src="/Vector.png" alt="vector" />
                        <Box
                          component="span"
                          fontWeight={600}
                          fontSize={17}
                          color={primaryColor}
                          ml={1}
                        >
                          {`${selectedWorkspace.user_balance} ₽`}
                        </Box>
                      </Box>
                    )}
                    {selectedWorkspace && (
                      <Box display="flex" alignItems="center">
                        <StarIcon />
                        <Box
                          component="span"
                          fontWeight={600}
                          fontSize={17}
                          color={primaryColor}
                          ml={1}
                        >
                          {selectedWorkspace.user_points}
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      </Template>
    </>
  );
}

export default ControlUsers;
