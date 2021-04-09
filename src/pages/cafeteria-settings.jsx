import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import every from 'lodash/every';
import Head from 'next/head';
import { useMediaQuery } from 'react-responsive';

import { Box } from '@material-ui/core';
import Template from '../Components/Template';
import Partner from '../Components/Partner';

import { usePratners } from '../lib/api/partners';
import { useWorkspaces } from '../lib/api/workspaces';
import { useTheme } from '../lib/theme';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowLeft from '../Components/CustomIcons/arrowLeft';
import CustomSwitch from '../Components/Switch/switch';

import s from '../styles/Profile.module.scss';

function ControlUsers() {
  const isMobile = useMediaQuery({ maxWidth: 960 });
  const { primaryColor, thirdColor, secondaryColor } = useTheme();

  const { selectedWorkspace } = useWorkspaces();
  const {
    categories,
    isCategoriesLoaded,
    getCategories,
    getPartners,
    partners,
    setPartner,
  } = usePratners();
  const { push } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeBenefits, setActiveBenefits] = useState(null);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    getCategories({});
  }, []);

  useEffect(() => {
    if (categories.length !== 0 && activeBenefits === null) {
      setActiveBenefits(categories[0].id);
    }
  }, [categories]);

  useEffect(() => {
    if (selectedWorkspace && selectedWorkspace.status === 0) {
      push('/workspaces');
    }
    fetchPartners();
  }, [selectedWorkspace]);

  useEffect(() => {
    if (activeBenefits && partners.length > 0) {
      const filtered = partners.filter(i => i.category == activeBenefits);
      setCheckAll(every(filtered, ['on', 1]));
    }
  }, [activeBenefits, partners]);

  function fetchPartners() {
    if (selectedWorkspace) {
      let admin = 0;
      if (selectedWorkspace.role >= 1 && selectedWorkspace.role <= 3) {
        admin = 1;
      }
      getPartners({
        id: selectedWorkspace.id,
        admin,
      });
    }
  }

  function onCheckAll() {
    setPartner({
      id: selectedWorkspace.id,
      category_id: activeBenefits,
      status: !checkAll ? 1 : 0,
    }).then(res => {
      if (res.status === 'success') {
        fetchPartners();
      }
    });
    setCheckAll(!checkAll);
  }
  function onCheck(id, status) {
    setPartner({
      id: selectedWorkspace.id,
      partner_id: id,
      status: status ? 1 : 0,
    }).then(res => {
      if (res.status === 'success') {
        fetchPartners();
      }
    });
  }

  if (!isCategoriesLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Доступные льготы | Свои</title>
      </Head>
      <Template isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
        <Box
          bgcolor={thirdColor}
          height={1}
          px={{ sm: 0, xs: 0, md: 3 }}
          py={{ sm: 3, xs: 3, md: 1 }}
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
            <Box component="span" fontSize={22} fontWeight={700} ml={1.5}>
              Доступные льготы
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent={{ sm: 'center', xs: 'center', md: 'space-between' }}
            alignItems="center"
            mt={2.5}
          >
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
                    component="span"
                    p={2}
                    borderBottom={
                      !isMobile
                        ? activeBenefits == i.id
                          ? `1px solid ${secondaryColor}`
                          : '1px solid #D5DEE9'
                        : 0
                    }
                    style={{
                      cursor: 'pointer',
                      opacity: activeBenefits == i.id ? 1 : 0.4,
                    }}
                    fontSize={15}
                    fontWeight={activeBenefits == i.id ? 600 : 500}
                    color={primaryColor}
                    onClick={() => setActiveBenefits(i.id)}
                  >
                    {i.title}
                  </Box>
                );
              })}
            </Box>
            {!isMobile && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mr={5}
              >
                <Box
                  component="span"
                  fontWeight={500}
                  fontSize={13}
                  color={primaryColor}
                  style={{ opacity: 0.62 }}
                  mr={2}
                >
                  Отметить все
                </Box>
                <CustomSwitch checked={checkAll} onChange={onCheckAll} />
              </Box>
            )}
          </Box>
          <Box
            mt={4}
            display="flex"
            flexDirection={{ sm: 'column', xs: 'column', md: 'row' }}
            flexWrap="wrap"
            alignItems="center"
            columnGap="22px"
            bgcolor={{
              sm: 'rgb(233, 240, 249)',
              xs: 'rgb(233, 240, 249)',
              md: 'unset',
            }}
          >
            {partners.map(item => {
              if (item.category == activeBenefits) {
                return (
                  <Partner key={item.id} item={item} handleSet={onCheck} />
                );
              }
            })}
          </Box>
        </Box>
        {isMobile && (
          <Box
            position="fixed"
            bottom={0}
            width={1}
            bgcolor="#007AFF"
            borderRadius="45px 45px 0 0"
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={2}
            zIndex={10}
          >
            <CustomSwitch />
            <Box
              component="span"
              color="#FFFFFF"
              fontSize={13}
              fontWeight={500}
            >
              Отметить все
            </Box>
          </Box>
        )}
      </Template>
    </>
  );
}

export default ControlUsers;
