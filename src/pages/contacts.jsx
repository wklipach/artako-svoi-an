import React, { useState, memo, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

import Box from '@material-ui/core/Box';
import Template from '../Components/Template';
import Input from '../Components/Input';
import Button from '../Components/Button';
import Select from '../Components/Select';

import { useTheme } from '../lib/theme';
import fetch from '../lib/fetch';

import MenuIcon from '@material-ui/icons/Menu';
import ArrowLeft from '../Components/CustomIcons/arrowLeft';

import s from '../styles/Profile.module.scss';

function Contacts() {
  const { primaryColor, thirdColor, fourthColor } = useTheme();
  const { back } = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 960 });

  const [isMenuOpen, setIsMenuOpen] = useState();
  const [contacts, setContacts] = useState([]);
  const [addressTo, setAddressTo] = useState([]);
  const [isContactsLoaded, setIsContactsLoaded] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState();
  const [scrollLeft, setScrollLeft] = useState();

  const [selectedContact, setSelectedContact] = useState(null);
  const [messageTopic, setMessageTopic] = useState('');
  const [messageText, setMessageText] = useState('');
  const [focusMessageText, setFocusMessageText] = useState(false);

  const [isMessegeSending, setIsMessegeSending] = useState(false);

  const slider = useRef(null);

  useEffect(() => {
    getContacts();
  }, []);

  console.log({ selectedContact });

  useEffect(() => {
    const arr = [];
    contacts.forEach(i => {
      if (i.mail_exists == 1) {
        if (selectedContact === null) {
          setSelectedContact(i.id);
        }
        arr.push({
          name: i.title,
          value: i.id,
        });
      }
    });
    setAddressTo(arr);
  }, [contacts]);

  const getContacts = async () => {
    try {
      const payload = await fetch('/contacts/list');

      if (!payload.error) {
        setContacts(payload);
        setIsContactsLoaded(true);
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error ', err);
    }
  };

  const sendMessage = useCallback(async () => {
    setIsMessegeSending(true);
    const data = new FormData();

    data.append('id', selectedContact);
    data.append('topic', messageTopic);
    data.append('message', messageText);
    try {
      const payload = await fetch('/contacts/contact', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        setIsMessegeSending(false);
        setMessageTopic('');
        setMessageText('');
        return { status: 'success' };
      } else {
        setIsMessegeSending(false);
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      setIsMessegeSending(false);
      console.error('>>> API Error ', err);
    }
  }, [
    selectedContact,
    messageTopic,
    messageText,
    setIsMessegeSending,
    setMessageText,
    setMessageTopic,
  ]);

  if (!isContactsLoaded) {
    return <Box>Loading...</Box>;
  }

  return (
    <>
      <Head>
        <title>Контакты | Свои</title>
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
            display={{ xs: 'none', sm: 'none', md: 'block' }}
            style={{ cursor: 'pointer' }}
            onClick={() => back()}
          >
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
          <Box
            display="flex"
            width={1}
            px={{ xs: 2, sm: 2, md: 0 }}
            alignItems="center"
          >
            {isMobile && (
              <Box zIndex={1} onClick={() => setIsMenuOpen(true)}>
                <MenuIcon style={{ color: primaryColor }} />
              </Box>
            )}
            <Box
              color={primaryColor}
              fontSize={22}
              fontWeight={600}
              width={{ xs: 1, sm: 1, md: 'auto' }}
              textAlign="center"
            >
              Связь с нами
            </Box>
          </Box>
          <Box mt={4} pl={{ xs: 2, sm: 2, md: 0 }}>
            <Box fontSize={17} fontWeight={700} color={primaryColor}>
              Адреса и телефоны
            </Box>
          </Box>
          <Box
            display="flex"
            mt={2}
            mb={4}
            flexDirection="row"
            width={1}
            className={s.address}
            ref={slider}
            onMouseDown={e => {
              setIsDown(true);
              setStartX(e.pageX - slider.current.offsetLeft);
              setScrollLeft(slider.current.scrollLeft);
            }}
            onMouseLeave={() => {
              setIsDown(false);
            }}
            onMouseUp={() => {
              setIsDown(false);
            }}
            onMouseMove={e => {
              if (!isDown) return;
              e.preventDefault();
              const x = e.pageX - slider.current.offsetLeft;
              const walk = (x - startX) * 3;
              slider.current.scrollLeft = scrollLeft - walk;
            }}
          >
            {contacts.length > 0 &&
              contacts.map(item => (
                <Box
                  id={`address${item.id}`}
                  key={item.id}
                  borderRadius={20}
                  style={{
                    border: `1px solid ${primaryColor}40`,
                  }}
                  py={4}
                  px={3.5}
                  minWidth={340}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  ml={2}
                  mb={2}
                  minHeight={210}
                  onClick={() =>
                    setSelectedContact({ id: item.id, title: item.title })
                  }
                >
                  <Box display="flex" flexDirection="column">
                    <Box
                      component="span"
                      color={primaryColor}
                      fontSize={17}
                      fontWeight={600}
                    >
                      {item.title}
                    </Box>
                    <Box
                      component="span"
                      color="rgba(0, 49, 102, 0.53)"
                      fontSize={17}
                    >
                      {item.phone}
                    </Box>
                  </Box>
                  <Box
                    component="span"
                    color="rgba(0, 49, 102, 0.53)"
                    fontSize={17}
                    style={{
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {item.address}
                  </Box>
                </Box>
              ))}
          </Box>
          <Box
            color={`${primaryColor}9e`}
            fontSize={15}
            fontWeight={700}
            mb={2}
            pl={{ xs: 2, sm: 2, md: 0 }}
          >
            ФОРМА ОБРАТНОЙ СВЯЗИ
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box width={{ xs: 1, sm: 1, md: 0.5 }}>
              <Box
                px={{ xs: 0, sm: 0, md: 3.5 }}
                py={{ xs: 0, sm: 0, md: 3 }}
                bgcolor={fourthColor}
                borderRadius={{ xs: 0, sm: 0, md: 10 }}
              >
                <Box mb={2}>
                  <Select
                    options={addressTo}
                    value={selectedContact}
                    onChange={field => setSelectedContact(field)}
                    label="Кому"
                    name="addressTo"
                    labelColor={primaryColor}
                  />
                </Box>
                <Box mb={2}>
                  <Input
                    value={messageTopic}
                    onChange={e => setMessageTopic(e.target.value)}
                    name="message-topic"
                    label="Тема письма"
                    unBordered
                    addOn={<></>}
                  />
                </Box>
                <Box mb={4.5}>
                  <Box
                    fontSize={focusMessageText ? 15 : 17}
                    fontWeight={500}
                    color={`${primaryColor}87`}
                    pl={2.5}
                    style={{
                      transition: 'all 0.3s',
                    }}
                    height={25}
                  >
                    Текст письма
                  </Box>
                  <textarea
                    className={s.textarea}
                    style={{
                      color: primaryColor,
                    }}
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    rows={10}
                    onFocus={() => setFocusMessageText(true)}
                    onBlur={() => setFocusMessageText(false)}
                  />
                </Box>
                <Box width={1}>
                  <Button disabeled={isMessegeSending} onClick={sendMessage}>
                    Отправить
                  </Button>
                </Box>
              </Box>
            </Box>
            {!isMobile && (
              <Box
                width={0.5}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box component="img" src="/contact-human.svg" maxWidth={1} />
              </Box>
            )}
          </Box>
        </Box>
      </Template>
    </>
  );
}

export default memo(Contacts);
