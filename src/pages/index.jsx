import { React } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

// Components
import { Box } from '@material-ui/core';
import { Carousel } from 'react-responsive-carousel';
import Button from '../Components/Button';
import AuthRight from '../Components/AuthRight';

import { useTheme } from '../lib/theme';

import Logo from '../Components/CustomIcons/logo';

import styles from '../styles/Home.module.scss';

const indicatorStyles = {
  width: 9,
  height: 9,
  display: 'inline-block',
  margin: '0 16px 0 0',
  border: '1px solid rgba(0, 49, 102, 0.3)',
  borderRadius: '50%',
  cursor: 'pointer',
};

export default function Home() {
  const { push } = useRouter();
  const isTablet = useMediaQuery({ maxWidth: 960 });
  const { primaryColor, secondaryColor, fourthColor } = useTheme();

  return (
    <Box
      className={styles.root}
      display={isTablet ? 'flex' : 'grid'}
      justifyContent="flex-start"
      p={{ sm: 2.5, xs: 2.5, md: 0 }}
      gridTemplateColumns="40% 60%"
      minHeight="100vh"
      bgcolor={fourthColor}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        maxWidth={1}
        maxHeight={1}
        position="relative"
      >
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          maxWidth={1}
        >
          <Box mb={7}>
            <Logo fill={secondaryColor} />
          </Box>
          {isTablet && (
            <Box
              fontSize={17}
              color={primaryColor}
              mb={4}
              className="text-carousel"
              maxWidth={1}
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
                        style={{
                          ...indicatorStyles,
                          background: secondaryColor,
                        }}
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
                    <Box textAlign="center" fontWeight={400} fontSize={24}>
                      {i.head}
                    </Box>
                    <Box textAlign="center" fontWeight={400} fontSize={24}>
                      {i.text}
                    </Box>
                  </Box>
                ))}
              </Carousel>
            </Box>
          )}
          <Box width={338} maxWidth={1}>
            <Button onClick={() => push('/reg')}>Зарегистрироваться</Button>
          </Box>
          <Box width={338} maxWidth={1} my={2}>
            <Button
              onClick={() => push('/login')}
              bgcolor="transparent"
              color={primaryColor}
              hoverBg={secondaryColor}
            >
              Войти
            </Button>
          </Box>
        </Box>
        <Box
          textAlign="center"
          fontWeight={700}
          fontSize={16}
          color={primaryColor}
          position="absolute"
          bottom={12}
          left={0}
          right={0}
        >
          Помощь: 8 (800)770-78-67
        </Box>
      </Box>
      {!isTablet && <AuthRight />}
    </Box>
  );
}
