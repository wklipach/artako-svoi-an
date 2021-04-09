import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Box } from '@material-ui/core';

import { useTheme } from '../lib/theme';
import { useWorkspaces } from '../lib/api/workspaces';

import MenuIcon from '@material-ui/icons/Menu';
import Template from '../Components/Template';
import Control from '../Components/Workspaces/Settings/control';
import Balance from '../Components/Workspaces/Settings/balance';

function WorkspaceSettings() {
  const isMobile = useMediaQuery({ maxWidth: 960 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { push } = useRouter();
  const { primaryColor, thirdColor } = useTheme();
  const { selectedWorkspace } = useWorkspaces();

  useEffect(() => {
    if (selectedWorkspace && selectedWorkspace.status === 0) {
      push('/workspaces');
    }
  }, [selectedWorkspace]);

  return (
    <>
      <Head>
        <title>Настройки Workspace | Свои</title>
      </Head>
      <Template isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
        <Box
          bgcolor={thirdColor}
          height={1}
          px={{ xs: 0, sm: 0, md: 3 }}
          py={{ xs: 3, sm: 3, md: 4 }}
          maxWidth={1}
          position="relative"
        >
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
          <Box
            color={primaryColor}
            bgcolor="transparent"
            display={{ xs: 'flex', sm: 'flex', md: 'unset' }}
            justifyContent="center"
            alignItems="center"
          >
            <Box component="span" fontSize={22} fontWeight={700} ml={1.5}>
              Настройки WorkSpace
            </Box>
          </Box>
          {isMobile && (
            <Box
              component="h3"
              fontSize={24}
              fontWeight={400}
              color={primaryColor}
              mt={5}
              mb={4}
              textAlign="center"
              width={1}
              bgcolor="transparent"
              px={{ xs: 3, sm: 3, md: 0 }}
            >
              Добро пожаловать на страницу управления Вашим рабочим
              пространством!
            </Box>
          )}
          <Box
            mt={3}
            display="grid"
            gridTemplateColumns={{ xs: 'unset', sm: 'unset', md: '50% 50%' }}
          >
            <Control isMobile={isMobile} />
            {!isMobile && <Balance />}
          </Box>
        </Box>
      </Template>
    </>
  );
}

export default WorkspaceSettings;
