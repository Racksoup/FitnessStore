import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  saleImages: null,
};

export const selectSaleImages = (state) => state.saleImages.saleImages;

export const saleImagesSlice = createSlice({
  name: 'saleImages',
  initialState,
  reducers: {
    saleImageCreated: (state, action) => {
      state.saleImages.push(action.payload);
    },
    saleImageDeleted: (state, action) => {
      state.saleImages = state.saleImages.filter((img) => img._id !== action.payload._id);
    },
    gotSaleImages: (state, action) => {
      state.saleImages = action.payload;
    },
  },
});

export const { saleImageCreated, saleImageDeleted, gotSaleImages } = saleImagesSlice.actions;

export const createSaleImage = (img) => async (dispatch) => {
  let data = new FormData();
  const config = {
    sales: {
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    },
  };
  data.append('file', img);

  try {
    const res = await axios.post('/api/sale-images/', data, config);
    dispatch(saleImageCreated(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteSaleImage = (filename) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/sale-images/${filename}`);
    dispatch(saleImageDeleted(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getSaleImages = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/sale-images/data/data');
    dispatch(gotSaleImages(res.data));
  } catch (error) {
    console.log(error);
  }
};

export default saleImagesSlice.reducer;
