import React from 'react';

import { Box } from '@material-ui/core';
import { Carousel } from 'react-responsive-carousel';

import { useTheme } from '../../lib/theme';

const indicatorStyles = {
  width: 9,
  height: 9,
  display: 'inline-block',
  margin: '0 16px 0 0',
  border: '1px solid rgba(0, 49, 102, 0.3)',
  borderRadius: '50%',
  cursor: 'pointer',
};

function AuthRight() {
  const { thirdColor, primaryColor, secondaryColor, fourthColor } = useTheme();

  return (
    <Box bgcolor={thirdColor} pb={10}>
      <Box pl={{ sm: 6, md: 14 }}>
        <Box component="img" src="/auth-right.svg" alt="alt" maxWidth={1} />
      </Box>
      <Box ml={{ sm: 5, md: 10 }}>
        <Box
          fontSize={17}
          color={primaryColor}
          mb={4}
          className="text-carousel"
        >
          <Carousel
            showStatus={false}
            autoPlay
            interval={5000}
            infiniteLoop
            showArrows={false}
            stopOnHover
            emulateTouch
            swipeable
            renderIndicator={(onClickHandler, isSelected, index, label) => {
              if (isSelected) {
                return (
                  <li
                    style={{ ...indicatorStyles, background: secondaryColor }}
                    aria-label={`Selected: ${label} ${index + 1}`}
                    title={`Selected: ${label} ${index + 1}`}
                  />
                );
              }
              return (
                <li
                  style={{ ...indicatorStyles, background: fourthColor }}
                  onClick={onClickHandler}
                  onKeyDown={onClickHandler}
                  value={index}
                  key={index}
                  role="button"
                  tabIndex={0}
                  title={`${label} ${index + 1}`}
                  aria-label={`${label} ${index + 1}`}
                />
              );
            }}
          >
            {[
              {
                head: 'Добро пожаловать на платформу',
                text:
                  'Специальные предложения для Вас от известных и популярных брендов',
              },
              {
                head: 'Почему СВОИ?',
                text:
                  'Удобное мобильное приложение и большой выбор товаров и услуг на каждый день',
              },
              {
                head: 'Для СВОИХ',
                text:
                  'Легко зарегистрируйтесь на платформе и начните пользоваться положенными Вам скидками и привилегиями',
              },
            ].map(i => (
              <Box key={i.head}>
                <Box
                  textAlign="left"
                  fontSize={35}
                  fontWeight={400}
                  color={primaryColor}
                  mb={3}
                  lineHeight="47px"
                >
                  {i.head}
                </Box>
                <Box textAlign="left">{i.text}</Box>
              </Box>
            ))}
          </Carousel>
        </Box>
      </Box>
    </Box>
  );
}

export default AuthRight;
