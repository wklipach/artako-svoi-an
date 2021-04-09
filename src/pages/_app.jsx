import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import moment from 'moment';
import 'moment/locale/ru';
import ruLocale from 'date-fns/locale/ru';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ruRU } from '@material-ui/core/locale';
import DateFnsUtils from '@date-io/date-fns';

import { AuthProvider } from '../lib/api/auth';
import { WorkspacesProvider } from '../lib/api/workspaces';
import { PratnersProvider } from '../lib/api/partners';
import { ThemeProvider as CustomThemeProvider } from '../lib/theme';

import '../styles/globals.scss';

const theme = createMuiTheme({}, ruRU);

moment.locale('ru');

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>СВОИ</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <CssBaseline />
      <CustomThemeProvider>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider locale={ruLocale} utils={DateFnsUtils}>
            <AuthProvider>
              <WorkspacesProvider>
                <PratnersProvider>
                  <Component {...pageProps} />
                </PratnersProvider>
              </WorkspacesProvider>
            </AuthProvider>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </CustomThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.any,
};

export default MyApp;
