import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import find from 'lodash/find';

import fetch from '../fetch';
import { useTheme } from '../theme';
import { useAuth } from './auth';

const WorkspacesContext = createContext({});

function WorkspacesProvider({ children }) {
  const {
    setPrimaryColor,
    setSecondaryColor,
    setThirdColor,
    setFourthColor,
  } = useTheme();
  const { user } = useAuth();

  const [workspaces, setWorkspaces] = useState([]);
  const [isWorkspacesLoaded, setIsWorkspacesLoaded] = useState(false);
  const [found, setFound] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [currentWorkspace, setCurrenWorkspace] = useState(null);
  const [isCurrentWorkspaceLoaded, setIsCurrenWorkspaceLoaded] = useState(
    false,
  );
  const [users, setUsers] = useState([]);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);

  async function createWorkspeace({ title }) {
    const data = new FormData();

    data.append('title', title);

    try {
      const payload = await fetch('/workspaces/create', {
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

  async function getWorkspaces() {
    try {
      const payload = await fetch('/workspaces/list');

      if (!payload.error) {
        setWorkspaces(payload);
        setIsWorkspacesLoaded(true);
        if (payload.length > 0 && !selectedWorkspace) {
          let active = payload[0];
          if (
            user &&
            user.workspace_id &&
            find(payload, i => i.id == user.workspace_id)
          ) {
            active = find(payload, i => i.id == user.workspace_id);
          }
          setSelectedWorkspace(active);
          // push()
        }
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }
  async function workspacesSet({ id }) {
    const data = new FormData();
    data.append('id', id);

    try {
      const payload = await fetch('/workspaces/set', {
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

  async function search({ title }) {
    const data = new FormData();

    data.append('title', title);

    try {
      const payload = await fetch('/workspaces/search', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        setFound(payload);
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function editWorkspace({
    id,
    design,
    image,
    title,
    messenger,
    news,
    ideas,
    contests,
    cafeteria,
    status,
    price,
    password,
    domain,
  }) {
    const data = new FormData();

    data.append('id', id);

    if (design) {
      data.append('design', design);
    }

    if (image) {
      data.append('image', image);
    }

    if (title) {
      data.append('title', title);
    }

    if (typeof messenger !== 'undefined') {
      data.append('messenger', messenger);
    }

    if (typeof news !== 'undefined') {
      data.append('news', news);
    }

    if (typeof ideas !== 'undefined') {
      data.append('ideas', ideas);
    }

    if (typeof contests !== 'undefined') {
      data.append('contests', contests);
    }

    if (typeof cafeteria !== 'undefined') {
      data.append('cafeteria', cafeteria);
    }

    if (typeof status !== 'undefined') {
      data.append('status', status);
    }

    if (typeof price !== 'undefined') {
      data.append('price', price);
    }

    if (typeof domain !== 'undefined') {
      data.append('domain', domain);
    }

    if (typeof password !== 'undefined') {
      data.append('password', password);
    }

    try {
      const payload = await fetch('/workspaces/edit', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        setSelectedWorkspace(payload);
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function viewWorkspace({ id }) {
    const data = new FormData();

    data.append('id', id);

    try {
      const payload = await fetch('/workspaces/view', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        setSelectedWorkspace(payload);
        setCurrenWorkspace(payload);
        setIsCurrenWorkspaceLoaded(true);
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function getUsers({ id }) {
    setIsUsersLoaded(false);
    const data = new FormData();

    data.append('id', id);

    try {
      const payload = await fetch('/workspaces/users', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        setUsers(payload);
        setIsUsersLoaded(true);
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function joinWorkspace({ id, password }) {
    const data = new FormData();

    data.append('id', id);

    if (typeof password !== 'undefined') {
      data.append('password', password);
    }

    try {
      const payload = await fetch('/workspaces/join', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        setSelectedWorkspace(payload);
        setCurrenWorkspace(payload);
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function leaveWorkspace({ id }) {
    const data = new FormData();

    data.append('id', id);

    try {
      const payload = await fetch('/workspaces/leave', {
        method: 'post',
        data,
      });

      if (!payload.error) {
        getWorkspaces();
        return { status: 'success' };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function setRole({ user_id, workspace_id, role }) {
    const data = new FormData();

    data.append('user_id', user_id);
    data.append('workspace_id', workspace_id);
    data.append('role', role);

    try {
      const payload = await fetch('/workspaces/setrole', {
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

  async function getUsersExel({ id }) {
    const data = new FormData();

    data.append('id', id);

    try {
      const payload = await fetch('/workspaces/usersexcel', {
        method: 'post',
        data,
        responseType: 'arraybuffer',
      });

      if (!payload.error) {
        return { status: 'success', file: payload };
      } else {
        return { status: 'error', error: payload.error };
      }
    } catch (err) {
      console.error('>>> API Error', err);
      return err;
    }
  }

  async function deleteWorkspace({ id }) {
    const data = new FormData();

    data.append('id', id);

    try {
      const payload = await fetch('/workspaces/delete', {
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

  async function deleteLogo({ id }) {
    const data = new FormData();

    data.append('id', id);

    try {
      const payload = await fetch('/workspaces/deleteimage', {
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

  async function setUserPoints({ id, user_id, points }) {
    const data = new FormData();

    data.append('id', id);
    data.append('user_id', user_id);
    data.append('points', points);

    try {
      const payload = await fetch('/workspaces/setpoints', {
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

  async function setUserBalance({ id, user_id, balance }) {
    const data = new FormData();

    data.append('id', id);
    data.append('user_id', user_id);
    data.append('balance', balance);

    try {
      const payload = await fetch('/workspaces/setbalance', {
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

  useEffect(() => {
    if (selectedWorkspace) {
      if (selectedWorkspace.design.length > 0) {
        const colors = JSON.parse(selectedWorkspace.design);
        setPrimaryColor(get(colors, 'primaryColor', '#003166'));
        setSecondaryColor(get(colors, 'secondaryColor', '#007AFF'));
        setThirdColor(get(colors, 'thirdColor', '#E9F0F9'));
        setFourthColor(get(colors, 'fourthColor', '#FFFFFF'));
      } else {
        setPrimaryColor('#003166');
        setSecondaryColor('#007AFF');
        setThirdColor('#E9F0F9');
        setFourthColor('#FFFFFF');
      }
    }
  }, [selectedWorkspace]);

  useEffect(() => {
    if (
      workspaces.length === 0 &&
      localStorage.getItem('token') &&
      window.location.href.indexOf('/welcome?id=') === -1
    ) {
      getWorkspaces();
    }
  }, [user]);

  return (
    <WorkspacesContext.Provider
      value={{
        workspaces,
        isWorkspacesLoaded,
        found,
        selectedWorkspace,
        currentWorkspace,
        isCurrentWorkspaceLoaded,
        users,
        isUsersLoaded,
        createWorkspeace,
        getWorkspaces,
        search,
        setSelectedWorkspace,
        editWorkspace,
        viewWorkspace,
        getUsers,
        workspacesSet,
        joinWorkspace,
        leaveWorkspace,
        setRole,
        getUsersExel,
        deleteWorkspace,
        deleteLogo,
        setUserPoints,
        setUserBalance,
      }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
}

WorkspacesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useWorkspaces = () => {
  return useContext(WorkspacesContext);
};

export { WorkspacesProvider, useWorkspaces };
