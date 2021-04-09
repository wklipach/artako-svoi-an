import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import fetch from '../fetch';

const AuthContext = createContext({});

const authPaths = [
  '/',
  '/login',
  '/lostpass',
  '/reg',
  '/activate',
  '/setnewpass',
];

function AuthProvider({ children }) {
  const { push, pathname, query } = useRouter();
  const { newtoken } = query;
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  async function register({ phone, name }) {
    const data = new FormData();

    data.append('phone', phone);
    data.append('name', name);

    try {
      const payload = await fetch('/account/registration', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function activate({ phone, code, password }) {
    const data = new FormData();

    data.append('phone', phone);
    data.append('code', code);
    data.append('password', password);

    try {
      const payload = await fetch('/account/registration', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        setToken(payload.token);
        localStorage.setItem('token', payload.token);
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function login({ phone, password }) {
    const data = new FormData();

    data.append('phone', phone);
    data.append('password', password);

    try {
      const payload = await fetch('/account/login', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        setToken(payload.token);
        localStorage.setItem('token', payload.token);
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function logout() {
    try {
      const payload = await fetch('/account/logout');

      if (!payload.error) {
        push('/');
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function getProfile() {
    try {
      const payload = await fetch('/account/profile');

      if (!payload.error) {
        setUser(payload);
        if (localStorage.getItem('redirect-to-welcome')) {
          const id = localStorage.getItem('redirect-to-welcome');
          push(`/welcome?id=${id}`);
          return { status: 'qaqik' };
        }
        return { status: 'success', ws_id: payload.workspace_id };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function editProfile({ name, photo, password, sex, birth }) {
    const data = new FormData();

    if (name) {
      data.append('name', name);
    }
    if (photo) {
      data.append('photo', photo);
    }
    if (password) {
      data.append('password', password);
    }
    if (sex) {
      data.append('sex', sex);
    }
    if (birth) {
      data.append('birth', birth);
    }

    try {
      const payload = await fetch('/account/edit', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        setUser(payload);
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function deletePhoto() {
    try {
      const payload = await fetch('/account/deletephoto');

      if (!payload.error) {
        getProfile();
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function forgotPassword({ phone }) {
    const data = new FormData();

    data.append('phone', phone);

    try {
      const payload = await fetch('/account/forgotpassword', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function forgotPasswordConfirm({ phone, code, password }) {
    const data = new FormData();

    data.append('phone', phone);
    data.append('code', code);
    data.append('password', password);

    try {
      const payload = await fetch('/account/forgotpassword', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        localStorage.setItem('token', payload.token);
        setToken(payload.token);
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function editmailphone({ phone_or_mail, code }) {
    const data = new FormData();

    data.append('phone_or_mail', phone_or_mail);
    if (code) {
      data.append('code', code);
    }

    try {
      const payload = await fetch('/account/editmailphone', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function deleteUser() {
    try {
      const payload = await fetch('/account/deleteuser');

      if (!payload.error) {
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  useEffect(() => {
    const _token = localStorage.getItem('token');
    if (_token) {
      setToken(_token);
    } else {
      setIsUserLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getProfile().then(res => {
        if (res.status === 'success') {
          if (authPaths.indexOf(pathname) !== -1) {
            if (res.ws_id != 0) {
              push(`/cafeteria?id=${res.ws_id}`).then(() => {
                setIsUserLoaded(true);
              });
            } else {
              push('/profile').then(() => {
                setIsUserLoaded(true);
              });
            }
          } else {
            setIsUserLoaded(true);
          }
        }
      });
    }
  }, [token]);

  useEffect(() => {
    if (newtoken) {
      localStorage.setItem('token', newtoken);
      setToken(newtoken);
    }
  }, [newtoken]);

  if (
    !isUserLoaded &&
    !(
      pathname.indexOf('/cafeteria') !== -1 ||
      pathname.indexOf('/welcome') !== -1
    )
  ) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        isUserLoaded,
        register,
        activate,
        login,
        logout,
        getProfile,
        editProfile,
        deletePhoto,
        forgotPassword,
        forgotPasswordConfirm,
        editmailphone,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
