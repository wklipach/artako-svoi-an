import React from 'react';
import PropTypes from 'prop-types';

import { Carousel } from 'react-responsive-carousel';

import Box from '@material-ui/core/Box';

import { useTheme } from '../../lib/theme';

function CustomCarousel({ currentPartner }) {
  const { thirdColor } = useTheme();
  return (
    <Box
      mt={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={1}
      position="relative"
      height={{ xs: 'unset', sm: 'unset', md: 330 }}
      className="gallery-slider"
    >
      {currentPartner.gallery.length === 1 &&
      currentPartner.gallery[0] === '' ? (
        <Box
          minWidth={1}
          height={338}
          minHeight={{ xs: 200, sm: 200, md: 0 }}
          bgcolor="#ccc"
          borderRadius={{ xs: 0, sm: 0, md: 20 }}
        />
      ) : (
        <Carousel
          dynamicHeight="auto"
          showArrows={true}
          showStatus={false}
          autoPlay
          interval={5000}
          infiniteLoop
        >
          {currentPartner.gallery.map(img => {
            if (img !== '') {
              return (
                <Box
                  component="img"
                  borderRadius={{ xs: 0, sm: 0, md: 20 }}
                  src={img}
                  alt="horizontal-image"
                  height="auto"
                  width="auto!important"
                  maxWidth={1}
                  maxHeight={330}
                />
              );
            }
          })}
        </Carousel>
      )}
      <Box
        width={{ xs: 76, sm: 76, md: 120 }}
        height={{ xs: 76, sm: 76, md: 120 }}
        position="absolute"
        bottom={{ xs: -32, sm: -32, md: 'unset' }}
        borderRadius="50%"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor={thirdColor}
      >
        {currentPartner.logo !== '' ? (
          <Box
            component="img"
            src={currentPartner.logo}
            alt="logo"
            width={1}
            position="absolute"
          />
        ) : (
          <Box
            position="absolute"
            width={{ xs: 76, sm: 76, md: '100%' }}
            height={{ xs: 76, sm: 76, md: '100%' }}
            top={{ xs: 0, sm: 0 }}
            borderRadius="50%"
            bgcolor="#D4E5FA"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box color="#007aff" fontSize={17} fontWeight={600}>
              {currentPartner.title[0]}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

CustomCarousel.propTypes = {
  currentPartner: PropTypes.shape().isRequired,
};

export default CustomCarousel;
