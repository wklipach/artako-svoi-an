import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import Comments from './Comments';

function NewsRightSide({ primaryColor, isActive }) {
  function renderDialogueName(name) {
    switch (name) {
      case 'company':
        return 'Наша компания';
      case 'events':
        return 'Мероприятия';
      case 'sport':
        return 'Спорт';
      case 'leisure':
        return 'Досуг';
      default:
        'Новости';
    }
  }

  return (
    <Box my={4} mx={4}>
      <Box display="flex" alignItems="center">
        <Box
          component="img"
          borderRadius="50%"
          width={58}
          height={58}
          src={'DJI.png'}
          alt="logo"
        />
        <Box display="flex" flexDirection="column" ml={2.5}>
          <Box
            component="span"
            fontSize={16}
            fontWeight={600}
            color={primaryColor}
          >
            DJI
          </Box>
          <Box component="span" fontSize={13} color={primaryColor}>
            Вчера 16:00
          </Box>
        </Box>
      </Box>
      <Box component="img" src="place.png" width={614} height={284} mt={3} />
      <Box ml={3} my={2}>
        {isActive !== 'news' && (
          <Box
            component="span"
            bgcolor="#D5E7FB"
            display="flex"
            justifyContent="center"
            alignItems="center"
            maxWidth={120}
            color={primaryColor}
            fontSize={11}
            fontWeight={600}
            p={0.5}
            borderRadius={29}
          >
            {renderDialogueName(isActive)}
          </Box>
        )}
        <Box component="h3" fontSize={17} my={2} color={primaryColor}>
          Мэрия предупредила Сбер, ВТБ, Mail.ru Group и другие компании о
          штрафах за нарушение удалёнки
        </Box>
        <Box component="span" fontSize={17} color={primaryColor}>
          По информации РБК, московские власти предупредили десятки столичных
          компаний, включая Сбер, ВТБ, Mail.ru
        </Box>
        <Box color="#BEC4D0" style={{ cursor: 'pointer' }}>
          ... еще
        </Box>
        <Comments primaryColor={primaryColor} />
      </Box>
    </Box>
  );
}

NewsRightSide.propTypes = {
  primaryColor: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default NewsRightSide;
