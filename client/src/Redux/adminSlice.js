import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  admin: null,
};

export const selectToken = (state) => state.admin.token;
export const selectIsAuthenticated = (state) => state.admin.isAuthenticated;
export const selectLoading = (state) => state.admin.loading;
export const selectAdmin = (state) => state.admin.admin;

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.admin = action.payload;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem('adminToken', action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.removeItem('adminToken');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.admin = null;
    },
  },
});

export const loadAdmin = () => async (dispatch) => {
  if (localStorage.adminToken) {
    setAuthToken(localStorage.adminToken);
  }

  try {
    if (localStorage.adminToken) {
      const res = await axios.get('/api/admin');
      dispatch(adminLoaded(res.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(logout());
  }
};

export const login = (form) => async (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ username: form.username, password: form.password });

  try {
    const res = await axios.post('/api/admin/adminAuth', body, config);
    dispatch(loginSuccess(res.data));
    dispatch(loadAdmin());
  } catch (error) {
    console.log(error);
    dispatch(logout());
  }
};

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const { adminLoaded, loginSuccess, logout } = adminSlice.actions;
export default adminSlice.reducer;
