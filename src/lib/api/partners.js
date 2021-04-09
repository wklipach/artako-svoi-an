import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import fetch from '../fetch';

const PratnersContext = createContext({});

function PratnersProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(false);
  const [partners, setPartners] = useState([]);
  const [currentPartner, setCurrentPartner] = useState(null);
  const [isCurrentPartnerLoaded, setIsCurrentPartnerLoaded] = useState(false);
  const [userTransactions, setUserTransactions] = useState([]);
  const [isUserTransactionsLoaded, setIsUserTransactionsLoaded] = useState(
    false,
  );

  async function getCategories({ id }) {
    setIsCategoriesLoaded(false);
    const data = new FormData();
    if (id) {
      data.append('id', id);
    }
    try {
      const payload = await fetch('/partners/categories', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        setCategories(payload);
        setIsCategoriesLoaded(true);
        return { status: 'success', payload };
      } else {
        return { status: 'error' };
      }
    } catch (err) {
      console.error('>>> API Error ', err);
      return;
    }
  }

  async function getPartners({ id, cat_id, admin, search }) {
    const data = new FormData();
    if (id) {
      data.append('id', id);
    }
    if (cat_id) {
      data.append('cat_id', cat_id);
    }
    if (admin) {
      data.append('admin', admin);
    }
    if (search) {
      data.append('search', search);
    }
    try {
      const payload = await fetch('/partners/partners', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        payload !== partners && setPartners(payload);
        return { status: 'success' };
      } else {
        return { status: 'error' };
      }
    } catch (err) {
      console.error('>>> API Error ', err);
      return;
    }
  }

  async function getDiscount({ id, partner_id, discount_id }) {
    const data = new FormData();
    if (id) {
      data.append('id', id);
    }
    if (partner_id) {
      data.append('partner_id', partner_id);
    }
    if (discount_id) {
      data.append('discount_id', discount_id);
    }
    try {
      const payload = await fetch('/partners/getdiscount', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        return { status: 'success', data: payload };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error ', err);
      return;
    }
  }

  async function getPartner({ id, partner_id }) {
    setIsCategoriesLoaded(false);
    const data = new FormData();
    if (id) {
      data.append('id', id);
    }
    if (partner_id) {
      data.append('partner_id', partner_id);
    }
    try {
      const payload = await fetch('/partners/partner', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        setCurrentPartner(payload);
        setIsCurrentPartnerLoaded(true);
        return { status: 'success' };
      } else {
        return { status: 'error' };
      }
    } catch (err) {
      console.error('>>> API Error ', err);
      return;
    }
  }

  async function setPartner({ id, partner_id, category_id, status }) {
    const data = new FormData();
    if (id) {
      data.append('id', id);
    }
    if (partner_id) {
      data.append('partner_id', partner_id);
    }
    if (category_id) {
      data.append('category_id', category_id);
    }
    if (typeof status !== 'undefined') {
      data.append('status', status);
    }
    try {
      const payload = await fetch('/partners/set', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        return { status: 'success' };
      }
    } catch (err) {
      console.error('>>> API Error ', err);
      return;
    }
  }

  async function getUserTransactions({
    ws_id,
    date_from,
    date_to,
    limit,
    offset,
    admin,
    user_name,
    cat_id,
    partner,
  } = {}) {
    const data = new FormData();
    data.append('ws_id', ws_id);
    if (typeof date_from !== 'undefined') {
      data.append('date_from', date_from);
    }
    if (typeof date_to !== 'undefined') {
      data.append('date_to', date_to);
    }
    if (typeof limit !== 'undefined') {
      data.append('limit', limit);
    }
    if (typeof offset !== 'undefined') {
      data.append('offset', offset);
    }
    if (typeof admin !== 'undefined') {
      data.append('admin', admin);
    }
    if (typeof user_name !== 'undefined') {
      data.append('user_name', user_name);
    }
    if (typeof cat_id !== 'undefined') {
      data.append('cat_id', cat_id);
    }
    if (typeof partner !== 'undefined') {
      data.append('partner', partner);
    }
    try {
      const payload = await fetch('/partners/usertransactions', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        setIsUserTransactionsLoaded(true);
        setUserTransactions(payload);
        return { status: 'success', payload };
      } else {
        return { status: 'error' };
      }
    } catch (err) {
      console.error('>>> API Error ', err);
      return;
    }
  }

  return (
    <PratnersContext.Provider
      value={{
        categories,
        isCategoriesLoaded,
        partners,
        currentPartner,
        isCurrentPartnerLoaded,
        userTransactions,
        isUserTransactionsLoaded,
        getCategories,
        getPartners,
        getPartner,
        setPartner,
        getDiscount,
        getUserTransactions,
      }}
    >
      {children}
    </PratnersContext.Provider>
  );
}

PratnersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const usePratners = () => {
  return useContext(PratnersContext);
};

export { PratnersProvider, usePratners };
