import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const catUnparsed = localStorage.getItem("category");

const initialState = {
  categories: null,
  category: JSON.parse(catUnparsed),
  categoryClicked: false,
};

export const selectCategories = (state) => state.category.categories;
export const selectCategory = (state) => state.category.category;
export const selectCategoryClicked = (state) => state.category.categoryClicked;

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    categoryCreated: (state, action) => {
      state.categories.push(action.payload);
    },
    categoryDeleted: (state, action) => {
      state.categories = state.categories.filter(
        (cat) => cat._id !== action.payload._id
      );
    },
    gotCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategory: (state, action) => {
      localStorage.setItem("category", JSON.stringify(action.payload));
      state.category = action.payload;
    },
    categoryClicked: (state) => {
      state.categoryClicked = !state.categoryClicked;
    },
  },
});

export const {
  categoryCreated,
  categoryDeleted,
  gotCategories,
  setCategory,
  categoryClicked,
} = categorySlice.actions;

export const createCategory = (item) => async (dispatch) => {
  let body = new FormData();
  body.append("category", item.category);
  body.append("main", item.main);
  if (item.mainID) {
    body.append("mainID", item.mainID);
  }
  body.append("file", item.image);

  const config = {
    headers: {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data; boundary=${body._boundary}`,
    },
  };

  try {
    const res = await axios.post("/api/category/", body, config);
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
    const res = await axios.get("/api/category");
    dispatch(gotCategories(res.data));
  } catch (error) {
    console.log(error);
  }
};

export default categorySlice.reducer;
