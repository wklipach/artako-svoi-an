import React, { useState, useEffect, useCallback, memo } from 'react';
import Head from 'next/head';

import { Box } from '@material-ui/core';
import Template from '../Components/Template';
import UserAnalyticsCard from '../Components/UserAnalyticsCard';
import UserTransactionsFilterModal from '../Components/UserTransactionsFilterModal';
import Button from '../Components/Button';

import { useTheme } from '../lib/theme';
import { usePratners } from '../lib/api/partners';
import { useWorkspaces } from '../lib/api/workspaces';

import MenuIcon from '@material-ui/icons/Menu';
import FiltersIcon from '../Components/CustomIcons/filtersIcon';
import InvoiceIcon from '../Components/CustomIcons/invoiceIcon';
import StarIcon from '../Components/CustomIcons/star';
import CoinIcon from '../Components/CustomIcons/coinIcon';

function Analytics() {
  const { primaryColor, thirdColor, fourthColor } = useTheme();
  const {
    getUserTransactions,
    // userTransactions,
    isUserTransactionsLoaded,
    getCategories,
    categories,
  } = usePratners();
  const { selectedWorkspace } = useWorkspaces();

  const [isMenuOpen, setIsMenuOpen] = useState();
  const [isFiltersModalOpened, setIsFiltersModalOpened] = useState(false);
  const [userTransactions, setUserTransactions] = useState([]);
  const [query, setQuery] = useState({});
  const [offset, setOffset] = useState(30);
  const [hasMoreItems, setHasMoreItems] = useState(true);

  useEffect(() => {
    getCategories({});
  }, []);

  useEffect(() => {
    if (selectedWorkspace) {
      getUserTransactions({
        ws_id: selectedWorkspace.id,
        admin: selectedWorkspace.role == 1 ? 1 : 0,
        limit: 30,
      }).then(res => {
        if (res.status === 'success') {
          setUserTransactions(res.payload);
          if (res.payload.length < 30) {
            setHasMoreItems(false);
          }
        }
      });
    }
  }, [selectedWorkspace]);

  const getCategoryName = useCallback(
    cat_id => categories.find(i => i.id == cat_id)?.title,
    [categories],
  );

  const onFilter = useCallback(
    ({ partner, userName, cat, dateFrom, dateTo }) => {
      const requestData = {
        ws_id: selectedWorkspace.id,
        admin: selectedWorkspace.role == 1 ? 1 : 0,
      };

      if (dateFrom) {
        requestData.date_from = new Date(dateFrom).getTime() / 1000;
      }

      if (dateTo) {
        requestData.date_to = new Date(dateTo).getTime() / 1000;
      }

      if (userName !== '') {
        requestData.user_name = userName;
      }

      if (cat !== '') {
        requestData.cat_id = cat;
      }

      if (partner !== '') {
        requestData.partner = partner;
      }

      setQuery(requestData);

      getUserTransactions(requestData);
    },
    [selectedWorkspace, getUserTransactions],
  );

  const onLoadMore = useCallback(() => {
    const requestData = query;
    requestData.ws_id = selectedWorkspace.id;
    requestData.admin = selectedWorkspace.role == 1 ? 1 : 0;
    requestData.offset = offset;
    requestData.limit = 30;

    getUserTransactions(requestData).then(res => {
      if (res.status === 'success') {
        setUserTransactions([...userTransactions, ...res.payload]);
        setOffset(p => p + 30);
        if (res.payload.length < 30) {
          setHasMoreItems(false);
        }
      }
    });
  }, [
    selectedWorkspace,
    offset,
    getUserTransactions,
    setUserTransactions,
    userTransactions,
    setOffset,
  ]);

  if (!isUserTransactionsLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Аналитика | Свои</title>
      </Head>
      <UserTransactionsFilterModal
        closeModal={() => setIsFiltersModalOpened(false)}
        categories={categories}
        onFilter={onFilter}
        isShown={isFiltersModalOpened}
        isAdmin={selectedWorkspace.role == 1}
      />
      <Template isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
        <Box
          bgcolor={thirdColor}
          minHeight={1}
          maxWidth={1}
          width={1}
          display="flex"
          px={{ xs: 2.5, sm: 2.5, md: 0 }}
          py={{ xs: 5.5, sm: 5.5, md: 0 }}
          position="relative"
          maxHeight="100vh"
        >
          <Box
            minWidth={{ xs: 1, sm: 1, md: 0.7 }}
            width={{ xs: 1, sm: 1, md: 0.7 }}
            px={{ xs: 0, sm: 0, md: 3 }}
            py={{ xs: 0, sm: 0, md: 4 }}
            maxHeight="100vh"
            overflow="auto"
          >
            <Box
              display="flex"
              alignItems="flex-end"
              mb={3}
              width={1}
              justifyContent={{
                xs: 'space-between',
                sm: 'space-between',
                md: 'flex-start',
              }}
            >
              <Box
                onClick={() => setIsMenuOpen(true)}
                display={{ xs: 'block', sm: 'block', md: 'none' }}
              >
                <MenuIcon />
              </Box>
              <Box
                fontSize={22}
                fontWeight={700}
                color={primaryColor}
                mr={{ xs: 0, sm: 0, md: 4 }}
              >
                Аналитика
              </Box>
              <Box
                style={{ cursor: 'pointer' }}
                onClick={() => setIsFiltersModalOpened(true)}
              >
                <FiltersIcon fill={primaryColor} />
              </Box>
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="center">
              {userTransactions.map(i => (
                <UserAnalyticsCard
                  key={Math.round(Math.random() * 10000000)}
                  transaction={i}
                  getCategoryName={getCategoryName}
                  isAdmin={selectedWorkspace.role == 1}
                />
              ))}
            </Box>
            {hasMoreItems && (
              <Box display="flex" justifyContent="center">
                <Box width={338}>
                  <Button onClick={onLoadMore}>Загрузить еще результаты</Button>
                </Box>
              </Box>
            )}
          </Box>
          <Box
            width={0.3}
            borderLeft={`1px solid ${primaryColor}1f`}
            px={{ xs: 0, sm: 0, md: 4.5 }}
            py={{ xs: 0, sm: 0, md: 10.5 }}
            display={{ xs: 'none', sm: 'none', md: 'flex' }}
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box
              width={1}
              py={3.5}
              px={4}
              bgcolor={fourthColor}
              borderRadius={20}
            >
              <Box
                fontSize={15}
                fontWeight={700}
                color={`${primaryColor}9e`}
                mb={4}
              >
                ИТОГО
              </Box>
              <Box
                mt={1.5}
                fontSize={17}
                fontWeight={500}
                color={primaryColor}
                width={1}
                display="flex"
                justifyContent="space-between"
              >
                <Box display="flex" alignItems="center">
                  <InvoiceIcon fill={primaryColor} />
                  <Box ml={1}>
                    {userTransactions.reduce(
                      (acc, curVal) => acc + curVal.sum,
                      0,
                    )}
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <StarIcon fill={primaryColor} />
                  <Box ml={1}>
                    {userTransactions.reduce(
                      (acc, curVal) => acc + curVal.points,
                      0,
                    )}
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <CoinIcon fill={primaryColor} />
                  <Box ml={1}>
                    {userTransactions.reduce(
                      (acc, curVal) => acc + curVal.balance,
                      0,
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box maxWidth={1}>
              <Box component="img" src="/user-tansaction-icon.svg" width={1} />
            </Box>
          </Box>
          <Box
            position="absolute"
            display={{ xs: 'flex', sm: 'flex', md: 'none' }}
            bottom={0}
            left={0}
            right={0}
            bgcolor="#D1E2F8"
            borderRadius="45px 45px 0 0"
            px={5}
            py={2.5}
            flexDirection="column"
          >
            <Box fontSize={15} fontWeight={700} color={`${primaryColor}9e`}>
              ИТОГО
            </Box>
            <Box
              mt={1.5}
              fontSize={17}
              fontWeight={500}
              color={primaryColor}
              width={1}
              display="flex"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <InvoiceIcon fill={primaryColor} />
                <Box ml={1}>
                  {userTransactions.reduce(
                    (acc, curVal) => acc + curVal.sum,
                    0,
                  )}
                </Box>
              </Box>
              <Box display="flex" alignItems="center">
                <StarIcon fill={primaryColor} />
                <Box ml={1}>
                  {userTransactions.reduce(
                    (acc, curVal) => acc + curVal.points,
                    0,
                  )}
                </Box>
              </Box>
              <Box display="flex" alignItems="center">
                <CoinIcon fill={primaryColor} />
                <Box ml={1}>
                  {userTransactions.reduce(
                    (acc, curVal) => acc + curVal.balance,
                    0,
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Template>
    </>
  );
}

export default memo(Analytics);
