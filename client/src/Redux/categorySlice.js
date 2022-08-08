import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const catUnparsed = localStorage.getItem('category');

const initialState = {
  categories: null,
  category: JSON.parse(catUnparsed),
};

export const selectCategories = (state) => state.category.categories;
export const selectCategory = (state) => state.category.category;

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categoryCreated: (state, action) => {
      state.categories.push(action.payload);
    },
    categoryDeleted: (state, action) => {
      state.categories = state.categories.filter((cat) => cat._id !== action.payload._id);
    },
    gotCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategory: (state, action) => {
      localStorage.setItem('category', JSON.stringify(action.payload));
      state.category = action.payload;
    },
  },
});

export const { categoryCreated, categoryDeleted, gotCategories, setCategory } =
  categorySlice.actions;

export const createCategory = (item) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const postItem = {
    category: item.category,
    main: item.main,
  };
  if (item.mainID) {
    postItem.mainID = item.mainID;
  }

  const body = JSON.stringify(postItem);

  try {
    const res = await axios.post('/api/category/', body, config);
    dispatch(categoryCreated(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/category/${id}`);
    dispatch(categoryDeleted(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/category');
    dispatch(gotCategories(res.data));
  } catch (error) {
    console.log(error);
  }
};

export default categorySlice.reducer;
