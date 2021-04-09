import axios from 'axios';

const fetch = async (path, options) => {
  const { method = 'get', data = null, headers = {}, responseType = null } =
    options || {};

  const defaultHeaders = {
    'Content-Type': 'multipart/form-data',
  };

  if (localStorage.getItem('token')) {
    defaultHeaders.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  const requestParams = {
    // eslint-disable-next-line no-undef
    url: `https://api.svoi.club/api${path}`,
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    data,
  };

  if (method === 'get') {
    delete requestParams.data;
  }

  if (responseType !== null) {
    requestParams.responseType = responseType;
  }

  try {
    const response = await axios(requestParams);

    if (response.data.error && response.data.error === 'TOKEN_NOT_FOUND') {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return response.data;
  } catch (err) {
    console.error('>>> API Error ', err);
    throw err;
  }
};

export default fetch;
