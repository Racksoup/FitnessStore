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
  },
});

export const { subbedToNewsLetter, unsubbed, checkedSubbed } = mailSlice.actions;

export const checkSub = (email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email });

  try {
    const res = await axios.post('/api/mailing/check-subbed', body, config);
    dispatch(checkedSubbed(res.data));
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

  console.log('subtonewsletter');
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

// export const sendNewsletter = (newsletter) => async (dispatch) => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   const { text, link } = newsletter;

//   const body = JSON.stringify({ text, link });

//   try {
//     const res = await axios.post('api/mailing/new-email', body, config);
//     dispatch({ type: NEWSLETTER_SENT, payload: res.data });
//   } catch (error) {
//     console.log(error);
//   }
// };

export default mailSlice.reducer;
