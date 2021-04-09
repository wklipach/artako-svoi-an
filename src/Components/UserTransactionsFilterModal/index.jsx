import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { Box, ClickAwayListener } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

import { useTheme } from '../../lib/theme';

import s from '../../styles/Profile.module.scss';

function UserTransactionsFilterModal({
  closeModal,
  categories,
  onFilter,
  isShown,
  isAdmin,
}) {
  const { primaryColor, fourthColor } = useTheme();

  const [partner, setPartner] = useState('');
  const [userName, setUserName] = useState('');
  const [cat, setCat] = useState('');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const handleClickFilter = useCallback(() => {
    onFilter({
      partner,
      userName,
      cat,
      dateFrom,
      dateTo,
    });
  }, [onFilter, partner, userName, cat, dateFrom, dateTo]);

  if (!isShown) {
    return <div />;
  }

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={20}
      bgcolor="rgba(0, 0, 0, 0.24)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <ClickAwayListener onClickAway={closeModal}>
        <Box
          bgcolor={fourthColor}
          p={5}
          borderRadius={10}
          width={470}
          maxWidth={0.95}
        >
          <Input
            name="filter-partner"
            onChange={e => setPartner(e.target.value)}
            label="Название партнера"
            value={partner}
            unBordered
          />
          {isAdmin && (
            <Input
              name="filter-user-name"
              onChange={e => setUserName(e.target.value)}
              label="Имя пользователя"
              value={userName}
              unBordered
            />
          )}
          <DatePicker
            disableFuture
            format="yyyy-MM-dd"
            label="Дата от"
            value={dateFrom ? dateFrom : new Date()}
            className={`${s.datepicker} picker`}
            onChange={date => {
              setDateFrom(format(date, 'yyyy-MM-dd'));
            }}
            style={{ color: primaryColor }}
            cancelLabel="Закрыть"
            okLabel="Сохранить"
          />
          <DatePicker
            disableFuture
            format="yyyy-MM-dd"
            label="Дата до"
            value={dateTo ? dateTo : new Date()}
            className={`${s.datepicker} picker`}
            onChange={date => {
              setDateTo(format(date, 'yyyy-MM-dd'));
            }}
            style={{ color: primaryColor }}
            cancelLabel="Закрыть"
            okLabel="Сохранить"
          />
          <Select
            options={[
              ...[{ name: 'Все', value: '' }],
              ...categories.map(i => {
                const { title, id } = i;
                return { name: title, value: id };
              }),
            ]}
            value={cat}
            onChange={field => {
              setCat(field);
            }}
            label="Категория"
            name="cateory-filter"
            labelColor={primaryColor}
          />
          <Box mt={3}>
            <Button
              onClick={() => {
                handleClickFilter();
                closeModal();
              }}
            >
              Отфильтровать
            </Button>
          </Box>
        </Box>
      </ClickAwayListener>
    </Box>
  );
}

UserTransactionsFilterModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default memo(UserTransactionsFilterModal);
