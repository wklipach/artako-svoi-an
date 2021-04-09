import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
} from 'react-google-maps';

import Box from '@material-ui/core/Box';
import Template from '../Components/Template';
import CustomCarousel from '../Components/Carousel';
import DiscountModal from '../Components/DiscountModal';
import Button from '../Components/Button';

import { useWorkspaces } from '../lib/api/workspaces';
import { usePratners } from '../lib/api/partners';
import { useAuth } from '../lib/api/auth';
import { useTheme } from '../lib/theme';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import StarIcon from '../Components/CustomIcons/star';
import ArrowLeft from '../Components/CustomIcons/arrowLeft';
import BalanceRightIcon from '../Components/CustomIcons/balanceRight';

import s from '../styles/Profile.module.scss';

const MyMapComponent = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        defaultZoom={12}
        zoom={12}
        center={
          props.center
            ? props.center
            : {
                lat: +props.currentPartner.places[0].lat,
                lng: +props.currentPartner.places[0].lon,
              }
        }
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {props.currentPartner.places.map((i, index) => (
          <Marker
            key={i.id}
            position={{ lat: +i.lat, lng: +i.lon }}
            onClick={() => {
              props.scrollTo(index);
            }}
          />
        ))}
        {props.userLocation && (
          <Marker
            position={{
              lat: props.userLocation.latitude,
              lng: props.userLocation.longitude,
            }}
            icon="/location.svg"
            defaultIcon="/location.svg"
          />
        )}
      </GoogleMap>
    );
  }),
);

function Place() {
  const isMobile = useMediaQuery({ maxWidth: 960 });
  const { selectedWorkspace } = useWorkspaces();
  const { getProfile } = useAuth();
  const { primaryColor, thirdColor, fourthColor, secondaryColor } = useTheme();
  const {
    getPartner,
    currentPartner,
    isCurrentPartnerLoaded,
    getDiscount,
  } = usePratners();
  const { query, back } = useRouter();
  const { id, referrer } = query;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [center, setCenter] = useState(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState();
  const [scrollLeft, setScrollLeft] = useState();
  const [activeAddress, setActiveAddress] = useState('');
  const [discountData, setDiscountData] = useState(null);

  const addressesRef = useRef([]);
  const slider = useRef(null);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (isCurrentPartnerLoaded) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(i => {
          setUserLocation(i.coords);
        });
      }
    }
  }, [isCurrentPartnerLoaded]);

  useEffect(() => {
    if (id && selectedWorkspace) {
      getPartner({ id: selectedWorkspace.id, partner_id: id });
    }
  }, [id, selectedWorkspace]);

  function scrollToAddress(index) {
    addressesRef.current[index].scrollIntoView();
  }

  if (!isCurrentPartnerLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>
          {currentPartner ? `${currentPartner.title} | Свои` : 'СВОИ'}
        </title>
      </Head>
      {discountData && (
        <DiscountModal
          setDiscountData={setDiscountData}
          discountData={discountData}
          activateDiscount={getDiscount}
          wsId={selectedWorkspace.id}
          partnerId={id}
        />
      )}
      <Template isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
        <Box
          py={4}
          px={{ xs: 0, sm: 0, md: 3 }}
          bgcolor={thirdColor}
          minHeight={1}
        >
          {referrer !== 'settings' && (
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
          )}
          <Box
            display="flex"
            justifyContent={{ xs: 'center', sm: 'center', md: 'flex-start' }}
            width={1}
            position="relative"
          >
            {isMobile && referrer !== 'settings' && (
              <Box position="absolute" left={20} top={5} onClick={() => back()}>
                <ArrowBackIosIcon />
              </Box>
            )}
            {currentPartner && (
              <Box
                color={primaryColor}
                fontSize={22}
                fontWeight={600}
                pl={{ xs: 6, sm: 6, md: 0 }}
              >
                {currentPartner.title}
              </Box>
            )}
          </Box>
          <Box minHeight={330} height={330} display="flex" alignItems="center">
            {currentPartner && (
              <CustomCarousel currentPartner={currentPartner} />
            )}
          </Box>
          <Box
            display={{ xs: 'flex', sm: 'flex', md: 'grid' }}
            flexDirection="column"
            gridTemplateColumns="65% 35%"
            pt={4}
          >
            <Box pr={2} pl={{ xs: 2, sm: 2, md: 0 }} mb={0}>
              <Box
                width={1}
                className={s.placeText}
                my={{ xs: 0, sm: 0, md: 5 }}
              >
                <Box
                  width={1}
                  fontSize={17}
                  fontWeight={400}
                  color={primaryColor}
                  style={{
                    whiteSpace: 'pre-line',
                    textAlign: 'justify',
                  }}
                >
                  {currentPartner.description}
                </Box>
              </Box>
              {currentPartner.places.length > 0 && (
                <Box fontSize={17} fontWeight={600} color={primaryColor} my={2}>
                  Адреса и телефоны
                </Box>
              )}
              {!isMobile ? (
                <Box
                  display="flex"
                  my={2}
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
                  {currentPartner.places.length > 0 &&
                    currentPartner.places.map((item, index) => (
                      <Box
                        id={`address${item.id}`}
                        ref={el => (addressesRef.current[index] = el)}
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
                        mr={2}
                        mb={2}
                        minHeight={210}
                        onClick={() => {
                          setCenter({
                            lat: +item.lat,
                            lng: +item.lon,
                          });
                        }}
                      >
                        <Box display="flex" flexDirection="column">
                          <Box
                            component="span"
                            color={primaryColor}
                            fontSize={17}
                            fontWeight={600}
                          >
                            {item.address}
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
                          {item.work_time}
                        </Box>
                      </Box>
                    ))}
                </Box>
              ) : (
                <Box display="flex" className={s.placeAddress} mb={3}>
                  {currentPartner.places.length > 0 &&
                    currentPartner.places.map(item => {
                      return (
                        <Box
                          key={item.key}
                          mr={2}
                          px={2.5}
                          py={3}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          bgcolor="#D1E2F8"
                          borderRadius={62}
                          minWidth={310}
                          maxWidth={1}
                          height={activeAddress === item.address ? 'auto' : 70}
                          onClick={() => {
                            if (activeAddress === item.address) {
                              setActiveAddress('');
                            } else {
                              setActiveAddress(item.address);
                            }
                            setCenter({
                              lat: +item.lat,
                              lng: +item.lon,
                            });
                          }}
                        >
                          <Box
                            overflow="hidden"
                            maxWidth={224}
                            style={{
                              whiteSpace:
                                activeAddress === item.address
                                  ? 'break-spaces'
                                  : 'nowrap',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item.address}
                            {activeAddress === item.address && (
                              <Box my={1} color="rgba(0, 49, 102, 0.53)">
                                {item.phone}
                              </Box>
                            )}
                            {activeAddress === item.address && (
                              <Box
                                component="span"
                                color="rgba(0, 49, 102, 0.53)"
                                style={{
                                  whiteSpace: 'pre-wrap',
                                }}
                              >
                                {item.work_time}
                              </Box>
                            )}
                          </Box>
                          <Box maxWidth={24} maxHeight={24}>
                            <Box
                              style={{
                                transform: `rotate(${
                                  activeAddress === item.address
                                    ? '-90deg'
                                    : '90deg'
                                })`,
                              }}
                            >
                              <ArrowForwardIosIcon />
                            </Box>
                          </Box>
                        </Box>
                      );
                    })}
                </Box>
              )}
              {currentPartner.places[0] && (
                <Box width={1} height={400} maxWidth={1} position="relative">
                  <MyMapComponent
                    center={center}
                    userLocation={userLocation}
                    currentPartner={currentPartner}
                    lat={currentPartner.places[0].lat}
                    lon={currentPartner.places[0].lon}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfOLNqAf5wrDA6nU1NknJkH5sE7AHlZBo&v=3.exp&libraries=drawing,places"
                    loadingElement={<Box width={1} height={400} />}
                    containerElement={<Box width={1} height={400} />}
                    mapElement={<Box width={1} height={400} />}
                    isMobile={isMobile}
                    scrollTo={scrollToAddress}
                  />
                  <Box
                    position="absolute"
                    width={40}
                    height={40}
                    bgcolor="#fff"
                    right={10}
                    bottom={110}
                    borderRadius={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if ('geolocation' in navigator) {
                        navigator.geolocation.getCurrentPosition(i => {
                          setCenter({
                            lat: i.coords.latitude,
                            lng: i.coords.longitude,
                          });
                        });
                      }
                    }}
                  >
                    <MyLocationIcon style={{ color: '#666666' }} />
                  </Box>
                </Box>
              )}
            </Box>
            <Box
              width={1}
              pl={2}
              pr={{ xs: 2, sm: 2, md: 0 }}
              borderLeft={`1px solid ${primaryColor}80`}
              maxWidth={{ xs: 1, sm: 1, md: 600 }}
            >
              <Box display="flex" alignItems="center" mb={1}>
                <Box
                  component="span"
                  color={primaryColor}
                  fontSize={17}
                  fontWeight={600}
                  pr={0.5}
                  pl={{ xs: 2, sm: 2, md: 0 }}
                >
                  Льготы
                </Box>
                <Box fontSize={17} fontWeight={600} color="#ef6037">
                  {`(${currentPartner.discounts.length})`}
                </Box>
              </Box>
              <Box
                fontSize={14}
                fontWeight={500}
                color={`${primaryColor}87`}
                mb={2.5}
              >
                Нажмите для получения льготы:
              </Box>
              {currentPartner.discounts.length > 0 &&
                currentPartner.discounts.map(item => (
                  <Box
                    key={item.id}
                    className="discount-card-wrapper"
                    position="relative"
                  >
                    <Box
                      bgcolor="#001D3D"
                      color="#E4E7ED"
                      borderRadius={4}
                      width={120}
                      py={1}
                      position="absolute"
                      zIndex={10}
                      top={-40}
                      right={30}
                      textAlign="center"
                      fontSize={11}
                      fontWeight={500}
                      className="tooltip"
                      display={{ xs: 'none', sm: 'none', md: 'block' }}
                    >
                      Получить льготу
                    </Box>
                    <Box
                      bgcolor={fourthColor}
                      border={`0px solid ${secondaryColor}`}
                      className="discount-hover"
                      borderRadius={20}
                      p={3.5}
                      mb={2}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setDiscountData({
                          id: item.id,
                          receiving_type: item.receiving_type,
                          price_points: item.price_points,
                          price_balance: item.price_balance,
                        });
                      }}
                    >
                      <Box
                        color={primaryColor}
                        style={{ opacity: 0.62 }}
                        fontSize={15}
                        fontWeight={600}
                        pb={1.5}
                        whiteSpace="pre-line"
                      >
                        {item.description.toUpperCase()}
                      </Box>
                      {(item.discount !== 0 ||
                        item.discount_balance !== 0 ||
                        item.discount_points !== 0) && (
                        <Box
                          fontSize={17}
                          fontWeight={500}
                          color={primaryColor}
                          display="flex"
                          width={1}
                          flexWrap="wrap"
                        >
                          <Box mr={0.5}>Скидка:</Box>
                          {item.discount !== 0 && (
                            <Box display="flex">
                              <Box>{`${item.discount}${
                                item.type === 1 ? '₽' : '%'
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
                              <Box mr={0.5}>{`${item.discount_balance}%`}</Box>
                              <BalanceRightIcon />
                            </Box>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Box>
                ))}
              {currentPartner.url && currentPartner.url !== '' && (
                <Box width={1}>
                  <Button
                    onClick={() => {
                      window.open(currentPartner.url, '_blank');
                    }}
                  >
                    Перейти на сайт
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Template>
    </>
  );
}

export default Place;
