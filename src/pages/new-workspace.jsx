import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useMediaQuery } from 'react-responsive';

import { Box } from '@material-ui/core';
import Template from '../Components/Template';
import Input from '../Components/Input';
import Button from '../Components/Button';

import { useWorkspaces } from '../lib/api/workspaces';

import MenuIcon from '@material-ui/icons/Menu';
import { useTheme } from '../lib/theme';

export default function NewWorkspace() {
  const { push } = useRouter();
  const { createWorkspeace } = useWorkspaces();
  const { primaryColor, thirdColor, fourthColor, secondaryColor } = useTheme();
  const isTablet = useMediaQuery({ maxWidth: 960 });

  const [title, setTitle] = useState('');

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function onCreate() {
    createWorkspeace({ title }).then(res => {
      if (res.status === 'success') {
        push('/workspaces');
      }
    });
  }

  return (
    <>
      <Head>
        <title>Создания рабочего пространства | Свои</title>
      </Head>
      <Template isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
        <Box minHeight={1} display="flex" flexDirection="column">
          <Box
            left={20}
            top={10}
            zIndex={1}
            display={{ sm: 'flex', xs: 'flex', md: 'none' }}
            p={2}
            alignItems="center"
            bgcolor={thirdColor}
          >
            <Box width={24} minWidth={24} onClick={() => setIsMenuOpen(true)}>
              <MenuIcon />
            </Box>
            <Box
              color={primaryColor}
              fontSize={22}
              fontWeight={700}
              pr={3}
              textAlign="center"
              width={1}
            >
              Создание рабочего пространства
            </Box>
          </Box>
          <Box
            px={{ sm: 0, xs: 0, md: 4 }}
            py={{ sm: 0, xs: 0, md: 3 }}
            bgcolor={thirdColor}
            height={{ md: 1, xs: 'unset', sm: 'unset' }}
            flexGrow={1}
            display="flex"
            flexDirection="column"
          >
            <Box
              color={primaryColor}
              fontSize={22}
              fontWeight={700}
              display={{ sm: 'none', xs: 'none', md: 'block' }}
              pl={3}
              pb={4}
            >
              Создание рабочего пространства
            </Box>
            <Box
              width={1}
              display="flex"
              justifyContent="center"
              flexGrow={{ xs: 1, sm: 1, md: 0 }}
            >
              <Box
                display="flex"
                flexDirection={{ sm: 'column', xs: 'column', md: 'row' }}
                maxWidth={1}
                px={{ sm: 4, xs: 0, md: 4 }}
              >
                <Box
                  height={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  bgcolor={thirdColor}
                  px={{ md: 7, sm: 3 }}
                  py={3}
                >
                  <Box
                    component="img"
                    src="new-workspace.svg"
                    alt="new-workspace"
                    maxWidth={{ sm: 0.9, xs: 0.9, md: 'unset' }}
                  />
                </Box>
                <Box
                  px={{ sm: 2.5, xs: 2.5, md: 5 }}
                  py={5}
                  bgcolor={fourthColor}
                  borderRadius={{
                    sm: '36px 36px 0 0',
                    xs: '36px 36px 0 0',
                    md: '0 10px 10px 0',
                  }}
                >
                  <Box
                    color={primaryColor}
                    fontSize={24}
                    fontWeight={400}
                    mb={2}
                  >
                    Добро пожаловать на страницу создания рабочего пространства!
                  </Box>
                  <Box
                    color={primaryColor}
                    fontSize={17}
                    fontWeight={400}
                    mb={2}
                  >
                    После создания рабочего пространства, Вы сможете управлять
                    сотрудниками, определять права доступа, льготы, проводить
                    конкурсы, собирать идеи, рассылать новости, общаться с
                    персоналом с помощью внутреннего месседжера, получать
                    аналитку и многое другое.
                  </Box>
                  <Box width={1} mb={3.5}>
                    <Input
                      first
                      last
                      label={isTablet ? 'Компания' : 'Название компании'}
                      name="company-name"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      borderColor={secondaryColor}
                      activeBorderColor={secondaryColor}
                      clearColor={secondaryColor}
                      labelColor={primaryColor}
                    />
                  </Box>
                  <Box width={1}>
                    <Button onClick={onCreate}>Отправить заявку</Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Template>
    </>
  );
}
