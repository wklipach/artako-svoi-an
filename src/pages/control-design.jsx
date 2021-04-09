import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Compressor from 'compressorjs';
import { throttle } from 'lodash';
import { useMediaQuery } from 'react-responsive';

import { Box } from '@material-ui/core';
import Template from '../Components/Template';
import Cropper from '../Components/Cropper';

import { useTheme } from '../lib/theme';
import makeBlob from '../lib/b64ToBlob';
import { useWorkspaces } from '../lib/api/workspaces';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowLeft from '../Components/CustomIcons/arrowLeft';
import PointIcon from '../Components/CustomIcons/pointIcon';
import MobileCoverIcon from '../Components/CustomIcons/mobile-desighn-settings';

import s from '../styles/ControlDesign.module.scss';

function ControlDesign() {
  const isMobile = useMediaQuery({ maxWidth: 960 });
  const { push } = useRouter();
  const {
    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
    thirdColor,
    setThirdColor,
    fourthColor,
    setFourthColor,
  } = useTheme();
  const {
    selectedWorkspace,
    editWorkspace,
    deleteLogo,
    viewWorkspace,
  } = useWorkspaces();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (selectedWorkspace && selectedWorkspace.status === 0) {
      push('/workspaces');
    }
  }, [selectedWorkspace]);

  function mobileOnMainColorChange(color) {
    setPrimaryColor(color);
    let permitted = /^[A-FSa-f0-9#]+$/;
    if (
      color.length === 7 &&
      color.charAt(0) === '#' &&
      color.match(permitted) != null
    ) {
      setPrimaryColor(color);
      editWorkspace({
        id: selectedWorkspace.id,
        design: JSON.stringify({
          primaryColor: color,
          secondaryColor,
          thirdColor,
          fourthColor,
        }),
      });
    }
  }

  function mobileOnSecondaryColorChange(color) {
    setSecondaryColor(color);
    let permitted = /^[A-FSa-f0-9#]+$/;
    if (
      color.length === 7 &&
      color.charAt(0) === '#' &&
      color.match(permitted) != null
    ) {
      editWorkspace({
        id: selectedWorkspace.id,
        design: JSON.stringify({
          primaryColor,
          secondaryColor: color,
          thirdColor,
          fourthColor,
        }),
      });
    }
  }

  function mobileOnThirdColorChange(color) {
    setThirdColor(color);
    let permitted = /^[A-FSa-f0-9#]+$/;
    if (
      color.length === 7 &&
      color.charAt(0) === '#' &&
      color.match(permitted) != null
    ) {
      editWorkspace({
        id: selectedWorkspace.id,
        design: JSON.stringify({
          primaryColor,
          secondaryColor,
          thirdColor: color,
          fourthColor,
        }),
      });
    }
  }

  function mobileOnFourthColorChange(color) {
    setFourthColor(color);
    let permitted = /^[A-FSa-f0-9#]+$/;
    if (
      color.length === 7 &&
      color.charAt(0) === '#' &&
      color.match(permitted) != null
    ) {
      editWorkspace({
        id: selectedWorkspace.id,
        design: JSON.stringify({
          primaryColor,
          secondaryColor,
          thirdColor,
          fourthColor: color,
        }),
      });
    }
  }

  const onMainColorChange = throttle(
    color => {
      setPrimaryColor(color);
      editWorkspace({
        id: selectedWorkspace.id,
        design: JSON.stringify({
          primaryColor: color,
          secondaryColor,
          thirdColor,
          fourthColor,
        }),
      });
    },
    600,
    {
      leading: false,
      trailing: true,
    },
  );

  const onSecondaryColorChange = throttle(
    color => {
      setSecondaryColor(color);
      editWorkspace({
        id: selectedWorkspace.id,
        design: JSON.stringify({
          primaryColor,
          secondaryColor: color,
          thirdColor,
          fourthColor,
        }),
      });
    },
    600,
    {
      leading: false,
      trailing: true,
    },
  );

  const onThirdColorChange = throttle(
    color => {
      setThirdColor(color);
      editWorkspace({
        id: selectedWorkspace.id,
        design: JSON.stringify({
          primaryColor,
          secondaryColor,
          thirdColor: color,
          fourthColor,
        }),
      });
    },
    600,
    {
      leading: false,
      trailing: true,
    },
  );

  const onFourthColorChange = throttle(
    color => {
      setFourthColor(color);
      editWorkspace({
        id: selectedWorkspace.id,
        design: JSON.stringify({
          primaryColor,
          secondaryColor,
          thirdColor,
          fourthColor: color,
        }),
      });
    },
    600,
    {
      leading: false,
      trailing: true,
    },
  );

  function dischargeColors() {
    editWorkspace({
      id: selectedWorkspace.id,
      design: JSON.stringify({
        primaryColor: '#003166',
        secondaryColor: '#007AFF',
        thirdColor: '#E9F0F9',
        fourthColor: '#FFFFFF',
      }),
    });
  }

  function onSelectFile(e) {
    const img = e.target.files[0];
    if (
      img.type.endsWith('jpg') ||
      img.type.endsWith('jpeg') ||
      img.type.endsWith('png')
    ) {
      setFile(img);
      setShowCropper(true);
    }
  }

  function onUpload(img) {
    setFile(false);
    setShowCropper(false);

    if (img) {
      const parts = img.split(',');
      let type = parts[0];
      const base64Data = parts[1];
      type = type.split(';')[0].split(':')[1];
      const blobImage = makeBlob(base64Data, type);

      new Compressor(blobImage, {
        maxHeight: 1200,
        maxWidth: 1200,
        success: result => {
          editWorkspace({ id: selectedWorkspace.id, image: result });
          isMobile && setHover(false);
        },
      });
    }
  }

  if (showCropper && file) {
    return (
      <Cropper
        selectedFile={file}
        setCroppedImg={onUpload}
        showCropper={setShowCropper}
        width={300}
        height={300}
        borderRadius={300}
        border={[50, 100]}
      />
    );
  }

  return (
    <>
      <Head>
        <title>Управление дизайном | Свои</title>
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
                  style={{ opacity: 0.64 }}
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
            {isMobile ? (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height={60}
                borderRadius="50%"
              >
                <Box component="span" fontSize={22} fontWeight={700} ml={1.5}>
                  Настройки дизайна
                </Box>
              </Box>
            ) : (
              <Box component="span" fontSize={22} fontWeight={700} ml={1.5}>
                Управление дизайном
              </Box>
            )}
          </Box>
          <Box
            mt={1.5}
            display={{ sm: 'flex', xs: 'flex', md: 'none' }}
            flexDirection="column"
            alignItems="center"
            width={1}
          >
            <MobileCoverIcon />
            <Box display="flex" mt={3}>
              <Box
                height={9}
                width={9}
                borderRadius="50%"
                bgcolor={secondaryColor}
                mr={2}
              />
              <Box
                height={9}
                width={9}
                borderRadius="50%"
                bgcolor="#fff"
                border="1px solid rgba(0, 49, 102, 0.3)"
                mr={2}
              />
              <Box
                height={9}
                width={9}
                borderRadius="50%"
                bgcolor="#fff"
                border="1px solid rgba(0, 49, 102, 0.3)"
                mr={2}
              />
              <Box
                height={9}
                width={9}
                borderRadius="50%"
                bgcolor="#fff"
                border="1px solid rgba(0, 49, 102, 0.3)"
              />
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
                ЛОГОТИП
              </Box>
              <Box
                bgcolor={fourthColor}
                borderRadius={{ sm: 0, xs: 0, md: 10 }}
                mt={1.5}
                mb={4}
                py={1.5}
                px={2}
                display="flex"
                alignItems="center"
                position="relative"
                onMouseOver={() => !isMobile && setHover(true)}
                onMouseOut={() => !isMobile && setHover(false)}
              >
                {selectedWorkspace && selectedWorkspace.image === '' && (
                  <Box
                    position="absolute"
                    top={0}
                    right={0}
                    left={0}
                    bottom={0}
                    zIndex={2}
                  >
                    <input
                      type="file"
                      name="logo"
                      onChange={onSelectFile}
                      style={{ width: '100%', height: '100%', opacity: 0 }}
                    />
                  </Box>
                )}
                <Box
                  style={{ cursor: 'pointer' }}
                  height={50}
                  width={50}
                  overflow="hidden"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="50%"
                  bgcolor={thirdColor}
                >
                  {selectedWorkspace &&
                  selectedWorkspace.image &&
                  selectedWorkspace.image !== '' ? (
                    <Box
                      position="relative"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Box
                        component="img"
                        src={selectedWorkspace.image}
                        alt="wrkspc logo"
                        height={1}
                        width={1}
                      />
                      <Box
                        width={1}
                        height={1}
                        display="flex"
                        position="absolute"
                        left={0}
                        top={0}
                        bottom={0}
                        right={0}
                        bgcolor={secondaryColor}
                        style={{
                          cursor: 'pointer',
                          opacity: hover || isMobile ? 0.6 : 0,
                        }}
                        justifyContent="center"
                        alignItems="center"
                        onClick={() => {
                          if (
                            selectedWorkspace &&
                            selectedWorkspace.image !== ''
                          ) {
                            deleteLogo({
                              id: selectedWorkspace.id,
                            }).then(res => {
                              if (res.status === 'success') {
                                viewWorkspace({ id: selectedWorkspace.id });
                              }
                            });
                          }
                        }}
                      >
                        <Box
                          component="img"
                          src="/close.svg"
                          alt="photo"
                          width={20}
                        />
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      component="img"
                      src="/photo.svg"
                      alt="photo"
                      width={30}
                    />
                  )}
                </Box>
                <Box
                  ml={2}
                  component="span"
                  color={secondaryColor}
                  fontSize={15}
                  fontWeight={500}
                  style={{ cursor: 'pointer' }}
                >
                  Изменить логотип
                </Box>
              </Box>
              <Box
                component="span"
                fontSize={15}
                fontWeight={600}
                ml={{ sm: 4, xs: 4, md: 0 }}
                color={primaryColor}
                style={{ opacity: 0.62 }}
              >
                ЦВЕТА
              </Box>
              <Box
                bgcolor={fourthColor}
                mt={2}
                px={{ sm: 2.5, xs: 2.5, md: 2.5 }}
                py={{ sm: 2.5, xs: 2.5, md: 0 }}
                maxWidth={600}
                borderRadius={{ sm: 0, xs: 0, md: 10 }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  borderBottom="1px solid rgba(198, 210, 225, 0.74)"
                  flexDirection="column"
                >
                  <label htmlFor={'main-color'} className={s.colorpicker}>
                    <Box
                      width={35}
                      height={35}
                      borderRadius="50%"
                      border={`1px solid ${secondaryColor}`}
                      overflow="hidden"
                      bgcolor={primaryColor}
                    />
                    <Box flex={1} ml={2.5}>
                      <Box
                        color={`${primaryColor}9e`}
                        fontSize={15}
                        fontWeight={500}
                        mb={1}
                      >
                        Цвет текста
                      </Box>
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={e => {
                          e.preventDefault();
                          mobileOnMainColorChange(e.target.value);
                        }}
                        style={{
                          width: 90,
                          opacity: 0.62,
                          border: 0,
                          fontWeight: 'bold',
                          fontSize: 15,
                          color: '#000',
                          backgroundColor: `${fourthColor}`,
                        }}
                      />
                    </Box>
                    <Box width={28} height={28} position="relative">
                      <input
                        type="color"
                        style={{
                          cursor: 'pointer',
                          position: 'absolute',
                          height: 28,
                          width: 28,
                          opacity: 0,
                          borderRadius: '50%',
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                        }}
                        onChange={e => {
                          e.preventDefault();
                          onMainColorChange(e.target.value);
                        }}
                      />
                      <PointIcon />
                    </Box>
                  </label>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  borderBottom="1px solid rgba(198, 210, 225, 0.74)"
                  flexDirection="column"
                >
                  <label htmlFor="secondary-color" className={s.colorpicker}>
                    <Box
                      width={35}
                      height={35}
                      borderRadius="50%"
                      border={`1px solid ${secondaryColor}`}
                      overflow="hidden"
                      bgcolor={secondaryColor}
                    />
                    <Box flex={1} ml={2.5}>
                      <Box
                        color={`${primaryColor}9e`}
                        fontSize={15}
                        fontWeight={500}
                        mb={1}
                      >
                        Цвет ссылок, иконок
                      </Box>
                      <input
                        type="text"
                        value={secondaryColor}
                        onChange={e => {
                          e.preventDefault();
                          mobileOnSecondaryColorChange(e.target.value);
                        }}
                        style={{
                          width: 90,
                          opacity: 0.62,
                          border: 0,
                          fontWeight: 'bold',
                          fontSize: 15,
                          color: '#000',
                          backgroundColor: `${fourthColor}`,
                        }}
                      />
                    </Box>
                    <Box width={28} height={28} position="relative">
                      <input
                        type="color"
                        style={{
                          cursor: 'pointer',
                          position: 'absolute',
                          height: 28,
                          width: 28,
                          opacity: 0,
                          borderRadius: '50%',
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                        }}
                        onChange={e => {
                          e.preventDefault();
                          onSecondaryColorChange(e.target.value);
                        }}
                      />
                      <PointIcon />
                    </Box>
                  </label>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  flexDirection="column"
                  borderBottom="1px solid rgba(198, 210, 225, 0.74)"
                >
                  <label htmlFor={'third-color'} className={s.colorpicker}>
                    <Box
                      width={35}
                      height={35}
                      borderRadius="50%"
                      border={`1px solid ${secondaryColor}`}
                      overflow="hidden"
                      bgcolor={thirdColor}
                    />
                    <Box flex={1} ml={2.5}>
                      <Box
                        color={`${primaryColor}9e`}
                        fontSize={15}
                        fontWeight={500}
                        mb={1}
                      >
                        Цвет фона
                      </Box>
                      <input
                        type="text"
                        value={thirdColor}
                        onChange={e => {
                          e.preventDefault();
                          mobileOnThirdColorChange(e.target.value);
                        }}
                        style={{
                          width: 90,
                          opacity: 0.62,
                          border: 0,
                          fontWeight: 'bold',
                          fontSize: 15,
                          color: '#000',
                          backgroundColor: `${fourthColor}`,
                        }}
                      />
                    </Box>
                    <Box width={28} height={28} position="relative">
                      <input
                        type="color"
                        style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          height: 28,
                          width: 28,
                          opacity: 0,
                          borderRadius: '50%',
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                        }}
                        onChange={e => {
                          e.preventDefault();
                          onThirdColorChange(e.target.value);
                        }}
                      />
                      <PointIcon />
                    </Box>
                  </label>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  flexDirection="column"
                >
                  <label htmlFor="fourth-color" className={s.colorpicker}>
                    <Box
                      width={35}
                      height={35}
                      borderRadius="50%"
                      border={`1px solid ${secondaryColor}`}
                      overflow="hidden"
                      bgcolor={fourthColor}
                    />
                    <Box flex={1} ml={2.5}>
                      <Box
                        color={`${primaryColor}9e`}
                        fontSize={15}
                        fontWeight={500}
                        mb={1}
                      >
                        Цвет плашек, карточек
                      </Box>
                      <input
                        type="text"
                        value={fourthColor}
                        onChange={e => {
                          e.preventDefault();
                          mobileOnFourthColorChange(e.target.value);
                        }}
                        style={{
                          width: 90,
                          opacity: 0.62,
                          border: 0,
                          fontWeight: 'bold',
                          fontSize: 15,
                          color: '#000',
                          backgroundColor: `${fourthColor}`,
                        }}
                      />
                    </Box>
                    <Box width={28} height={28} position="relative">
                      <input
                        type="color"
                        style={{
                          position: 'absolute',
                          cursor: 'pointer',
                          height: 28,
                          width: 28,
                          opacity: 0,
                          borderRadius: '50%',
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                        }}
                        onChange={e => {
                          e.preventDefault();
                          onFourthColorChange(e.target.value);
                        }}
                      />
                      <PointIcon />
                    </Box>
                  </label>
                </Box>
              </Box>
              <Box display="flex" justifyContent="center" width={1} mt={2}>
                <Box
                  component="span"
                  color={secondaryColor}
                  fontSize={15}
                  fontWeight={600}
                  onClick={dischargeColors}
                  style={{ cursor: 'pointer' }}
                >
                  Сбросить настройки цветов
                </Box>
              </Box>
            </Box>
            {!isMobile && (
              <Box ml={6} mt={4}>
                <Box display="flex" width={1} justifyContent="center" mt={7.5}>
                  <img src="/Character2.png" alt="image" />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Template>
    </>
  );
}

export default ControlDesign;
