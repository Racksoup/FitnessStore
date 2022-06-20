import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  headerImages: null,
};

export const selectHeaderImages = (state) => state.headerImages.headerImages;

export const headerImagesSlice = createSlice({
  name: 'headerImages',
  initialState,
  reducers: {
    headerImageCreated: (state, action) => {
      state.headerImages.push(action.payload);
    },
    headerImageDeleted: (state, action) => {
      state.headerImages = state.headerImages.filter((img) => img._id !== action.payload._id);
    },
    gotHeaderImages: (state, action) => {
      state.headerImages = action.payload;
    },
  },
});

export const { headerImageCreated, headerImageDeleted, gotHeaderImages } =
  headerImagesSlice.actions;

export const createHeaderImage = (img) => async (dispatch) => {
  let data = new FormData();
  const config = {
    headers: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    },
  };
  data.append('file', img);

  try {
    const res = await axios.post('/api/header-images/', data, config);
    dispatch(headerImageCreated(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteHeaderImage = (filename) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/header-images/${filename}`);
    dispatch(headerImageDeleted(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getHeaderImages = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/header-images');
    dispatch(gotHeaderImages(res.data));
  } catch (error) {
    console.log(error);
  }
};

export default headerImagesSlice.reducer;
