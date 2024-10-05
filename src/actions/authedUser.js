import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { login, logout } from '../utils/api';

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const SET_LOGOUT = 'SET_LOGOUT';

export function setAuthedUser(username) {
  return {
    type: SET_AUTHED_USER,
    username,
  };
}

export const setLogOut = () => ({
  type: SET_LOGOUT,
});

export const handleLogin = (username) => async (dispatch) => {
  try {
    dispatch(showLoading('login'));
    const success = await login(username);
    if (success) {
      dispatch(setAuthedUser(username));
    } else {
      alert('ACCESS DENIED');
    }
  } finally {
    dispatch(hideLoading('login'));
  }
};

export const handleLogout = () => async (dispatch) => {
  try {
    dispatch(showLoading('logout'));
    await logout();
    dispatch(setLogOut());
    dispatch(setAuthedUser(''));
  } finally {
    dispatch(hideLoading('logout'));
  }
};
