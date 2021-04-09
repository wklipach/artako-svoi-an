import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import moment from 'moment';
import { format } from 'date-fns';
import Compressor from 'compressorjs';
import { useMediaQuery } from 'react-responsive';
import get from 'lodash/get';

import { Box, ClickAwayListener } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import Template from '../Components/Template';
import Button from '../Components/Button';
import Input from '../Components/Input';
import Select from '../Components/Select';
import Popconfirm from '../Components/Popconfirm';

import { useAuth } from '../lib/api/auth';
import { useTheme } from '../lib/theme';
import makeBlob from '../lib/b64ToBlob';

import MenuIcon from '@material-ui/icons/Menu';
import ShownPassIcon from '../Components/CustomIcons/shownPass';
import HiddenPassIcon from '../Components/CustomIcons/hiddenPass';

import s from '../styles/Profile.module.scss';
import Cropper from '../Components/Cropper';

const sexFields = [
  {
    value: 0,
    name: 'Не указан',
  },
  {
    value: 1,
    name: 'Мужской',
  },
  {
    value: 2,
    name: 'Женский',
  },
];

export default function Profile() {
  const {
    user,
    isUserLoaded,
    logout,
    editProfile,
    deleteUser,
    deletePhoto,
  } = useAuth();
  const { push } = useRouter();
  const { primaryColor, thirdColor, secondaryColor, fourthColor } = useTheme();

  const isMobile = useMediaQuery({ maxWidth: 960 });

  const [name, setName] = useState(get(user, 'name', ''));
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(get(user, 'phone', ''));
  const [email, setEmail] = useState(get(user, 'mail', ''));
  const [birth, setBirth] = useState(
    user && user.birth > 0
      ? moment(get(user, 'birth', new Date() / 1000) * 1000).format(
          'YYYY-MM-DD',
        )
      : null,
  );
  const [sex, setSex] = useState(get(user, 'sex', ''));
  const [photo, setPhoto] = useState(get(user, 'photo', ''));
  const [pswrdError, setPswrdError] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [openPopConfirm, setOpenPopConfirm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (isUserLoaded && !user) {
      push('/');
    }
    if (user && photo !== user.photo) {
      setPhoto(user.photo);
    }
  }, [user]);

  function deleteAccount() {
    deleteUser().then(res => {
      if (res.status === 'success') {
        push('/');
      }
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
    setPhoto(img);

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
          editProfile({ photo: result });
          isMobile && setHover(false);
        },
      });
    }
  }

  if (!isUserLoaded || !user) {
    return <div>Loading...</div>;
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
        <title>Профиль | Свои</title>
      </Head>
      <div className="component-wrapper">
        <Template isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
          <Box
            bgcolor={thirdColor}
            height={1}
            px={{ xs: 0, sm: 0, md: 3 }}
            py={{ xs: 0, sm: 0, md: 4 }}
            maxWidth={1}
            position="relative"
          >
            <Box
              color={primaryColor}
              fontSize={22}
              fontWeight={700}
              mb={{ xs: 0, s: 0, md: 3 }}
              display={isMobile && 'flex'}
              justifyContent="center"
              alignItems="center"
              textAlign={{ xs: 'center', sm: 'center', md: 'left' }}
            >
              <Box ml={1.5}>Настройки профиля</Box>
            </Box>
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
            <Box display="flex" width={1} justifyContent="center">
              <Box
                bgcolor={isMobile ? 'transparent' : fourthColor}
                borderRadius={10}
                px={{ xs: 0, sm: 0, md: 5.5 }}
                pt={4}
                pb={7}
                display="flex"
                flexDirection="column"
                alignItems="center"
                maxWidth={1}
              >
                <Box
                  height={100}
                  width={100}
                  onMouseOver={() => !isMobile && setHover(true)}
                  onMouseOut={() => !isMobile && setHover(false)}
                  onClick={() => isMobile && setHover(true)}
                  borderRadius="50%"
                  overflow="hidden"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                  style={{ cursor: 'pointer' }}
                  bgcolor={{ xs: fourthColor, sm: fourthColor, md: thirdColor }}
                >
                  {photo !== '' ? (
                    <Box component="img" src={photo} alt="avatar" width={1} />
                  ) : (
                    <Box color={secondaryColor} fontSize={32} fontWeight={700}>
                      {user.name[0]}
                    </Box>
                  )}
                  {
                    <Box
                      position="absolute"
                      width={1}
                      height={1}
                      zIndex={1}
                      bgcolor={secondaryColor}
                      display={hover ? 'flex' : 'none'}
                      alignItems="center"
                      justifyContent="center"
                      style={{ cursor: 'pointer', opacity: 0.6 }}
                      onClick={() => {
                        if (photo !== '') {
                          deletePhoto().then(res => {
                            if (res.status === 'success') {
                              setPhoto('');
                            }
                          });
                        }
                      }}
                    >
                      {photo === '' && (
                        <input
                          type="file"
                          name="jhano"
                          className={s.upload}
                          onChange={onSelectFile}
                        />
                      )}
                      {photo === '' ? (
                        <Box component="img" src="/photo.svg" alt="photo" />
                      ) : (
                        <Box component="img" src="/close.svg" alt="photo" />
                      )}
                    </Box>
                  }
                </Box>
                {user && (
                  <Box
                    color={primaryColor}
                    fontSize={22}
                    fontWeight={700}
                    my={3}
                  >
                    {user.name}
                  </Box>
                )}
                <Box width={520} maxWidth={1}>
                  <Input
                    value={name}
                    onChange={e => {
                      setName(e.target.value);
                      editProfile({ name: e.target.value });
                    }}
                    label="Имя, фамилия"
                    labelColor={primaryColor}
                    activeBorderColor={secondaryColor}
                    name="name"
                    unBordered
                    addOn
                  />
                  <Input
                    value={password}
                    activeBorderColor={secondaryColor}
                    onChange={e => {
                      setPassword(e.target.value);
                      if (e.target.value.length < 6 && !pswrdError) {
                        setPswrdError(true);
                      }
                      if (e.target.value.length >= 6) {
                        if (pswrdError) {
                          setPswrdError(false);
                        }
                        editProfile({ password: e.target.value });
                      }
                    }}
                    label="Пароль"
                    labelColor={primaryColor}
                    name="password"
                    unBordered
                    type={showPass ? 'text' : 'password'}
                    addOn={
                      <Box
                        position="absolute"
                        right={20}
                        top={0}
                        bottom={0}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowPass(p => !p)}
                        display="flex"
                        alignItems="center"
                      >
                        {showPass ? <ShownPassIcon /> : <HiddenPassIcon />}
                      </Box>
                    }
                  />
                  <Box position="relative">
                    <Input
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      labelColor={primaryColor}
                      activeBorderColor={secondaryColor}
                      label="Телефон"
                      name="phone"
                      unBordered
                      addOn
                      disabled
                    />
                    <Box
                      onClick={() => push('/changephone')}
                      style={{ cursor: 'pointer' }}
                      zIndex={1}
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                    />
                  </Box>
                  <Box position="relative">
                    <Input
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      label="Email"
                      name="email"
                      labelColor={primaryColor}
                      activeBorderColor={secondaryColor}
                      unBordered
                      addOn
                      disabled
                    />
                    <Box
                      onClick={() => push('/changeemail')}
                      style={{ cursor: 'pointer' }}
                      zIndex={1}
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                    />
                  </Box>
                  <DatePicker
                    disableFuture
                    format="yyyy-MM-dd"
                    label="Дата рождения"
                    value={birth}
                    className={`${s.datepicker} picker`}
                    onChange={date => {
                      setBirth(format(date, 'yyyy-MM-dd'));
                      const unix = new Date(date).getTime() / 1000;
                      editProfile({
                        birth: unix,
                      });
                    }}
                    style={{ color: primaryColor }}
                    cancelLabel="Закрыть"
                    okLabel="Сохранить"
                  />
                  <Select
                    options={sexFields}
                    value={sex}
                    onChange={field => {
                      setSex(field);
                      editProfile({ sex: field });
                    }}
                    label="Пол"
                    name="sex"
                    labelColor={primaryColor}
                  />
                </Box>
                <Box width={520} maxWidth={0.9} mt={4}>
                  <Button onClick={logout}>Выйти из профиля</Button>
                </Box>
                <Box width={520} maxWidth={0.9} mt={1} position="relative">
                  {openPopConfirm && (
                    <ClickAwayListener
                      onClickAway={() => setOpenPopConfirm(false)}
                    >
                      <Box position="absolute" top={-100} right={0}>
                        <Popconfirm
                          onDelete={deleteAccount}
                          onClose={() => setOpenPopConfirm(false)}
                          message="Вы уверены что хотите удалить аккаунт?"
                        />
                      </Box>
                    </ClickAwayListener>
                  )}
                  <Button
                    bgcolor="transparent"
                    hoverBg={secondaryColor}
                    color={primaryColor}
                    onClick={() => setOpenPopConfirm(true)}
                  >
                    Удалить аккаунт
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Template>
      </div>
      <style jsx>{`
        .component-wrapper :global(.picker input) {
          color: ${primaryColor};
        }
        .component-wrapper :global(.picker label) {
          color: ${primaryColor};
          opacity: 0.4;
        }
      `}</style>
    </>
  );
}
