import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useRouter } from 'next/router';

import { Box } from '@material-ui/core';

import { useTheme } from '../../lib/theme';

import InvoiceIcon from '../CustomIcons/invoiceIcon';
import StarIcon from '../CustomIcons/star';
import CoinIcon from '../CustomIcons/coinIcon';

function UserAnalyticsCard({ transaction, getCategoryName, isAdmin }) {
  const { primaryColor, secondaryColor, fourthColor } = useTheme();
  const { push } = useRouter();

  return (
    <Box
      p={4}
      bgcolor={fourthColor}
      borderRadius={10}
      mb={3}
      maxWidth={1}
      width={610}
      mr={3}
    >
      <Box fontSize={17} fontWeight={500} color={`${primaryColor}66`} mb={1.5}>
        {moment(transaction.date * 1000).format('DD.MM.YYYY hh:mm')}
      </Box>
      <Box>
        {isAdmin && (
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Box
              height={46}
              minWidth={46}
              width={46}
              overflow="hidden"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              mr={2}
              border={`2px solid ${secondaryColor}`}
            >
              <Box component="img" src={transaction.photo} width={1} />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              flexDirection="column"
              height={1}
            >
              <Box fontSize={17} fontWeight={700} color={primaryColor}>
                {transaction.user_name}
              </Box>
              <Box fontSize={17} fontWeight={400} color={primaryColor}>
                {`+${transaction.phone}`}
              </Box>
            </Box>
          </Box>
        )}
        {isAdmin && (
          <Box
            width={1}
            ml="23px"
            borderLeft={`2px dashed ${secondaryColor}`}
            height={30}
          />
        )}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          onClick={() => push(`/place?id=${transaction.partner_id}`)}
          style={{ cursor: 'pointer' }}
        >
          <Box
            height={46}
            minWidth={46}
            width={46}
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="50%"
            mr={2}
            border={`2px solid ${secondaryColor}`}
          >
            <Box component="img" src={transaction.image} width={1} />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            height={1}
          >
            <Box fontSize={17} fontWeight={700} color={primaryColor}>
              {transaction.title}
            </Box>
            <Box fontSize={17} fontWeight={400} color={`${primaryColor}87`}>
              {getCategoryName(transaction.category_id)}
            </Box>
          </Box>
        </Box>
        <Box
          mt={1.5}
          fontSize={17}
          fontWeight={500}
          color={`${primaryColor}66`}
          width={1}
          display="flex"
          justifyContent="space-around"
        >
          <Box display="flex" alignItems="center">
            <InvoiceIcon fill={`${primaryColor}66`} />
            <Box ml={1}>{transaction.sum}</Box>
          </Box>
          <Box display="flex" alignItems="center">
            <StarIcon fill={`${primaryColor}66`} />
            <Box ml={1}>{transaction.points}</Box>
          </Box>
          <Box display="flex" alignItems="center">
            <CoinIcon fill={`${primaryColor}66`} />
            <Box ml={1}>{transaction.balance}</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

UserAnalyticsCard.propTypes = {
  transaction: PropTypes.shape().isRequired,
  getCategoryName: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default UserAnalyticsCard;
