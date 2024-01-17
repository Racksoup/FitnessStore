import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  subscribed: false,
  newsletter: false,
};

export const selectSubscribed = (state) => state.mail.subscribed;

export const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    subbedToNewsLetter: (state, action) => {
      state.subscribed = action.payload;
    },
    unsubbed: (state, action) => {
      state.subscribed = action.payload;
    },
    checkedSubbed: (state, action) => {
      state.subscribed = action.payload;
    },
    newsletterSent: (state, action) => {
      state.newsletter = action.payload;
    },
  },
});

export const { subbedToNewsLetter, unsubbed, checkedSubbed, newsletterSent } = mailSlice.actions;

export const checkSub = (email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email });

  try {
    const res = await axios.post('/api/mailing/check-subbed', body, config);
    dispatch(checkedSubbed(res.data.subscribed));
  } catch (error) {
    console.log(error);
  }
};

export const subToNewsletter = (email, name) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, name });

  try {
    const res = await axios.post('/api/mailing/member', body, config);
    dispatch(subbedToNewsLetter(true));
  } catch (error) {
    console.log(error);
  }
};

export const unsub = (email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email });

  try {
    const res = await axios.post('/api/mailing/destroy-member', body, config);
    dispatch(unsubbed(false));
  } catch (error) {
    console.log(error);
  }
};

export const sendNewsletter = (subject, text) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ subject, text });

  try {
    const res = await axios.post('api/mailing/new-email', body, config);
    dispatch(newsletterSent(true));
  } catch (error) {
    console.log(error);
  }
};

export default mailSlice.reducer;
