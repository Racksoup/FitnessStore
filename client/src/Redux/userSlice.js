import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCart } from "./cartSlice";
import { getWishlist } from "./wishlistSlice";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export const selectToken = (state) => state.user.token;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectLoading = (state) => state.user.loading;
export const selectUser = (state) => state.user.user;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoaded: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem("userToken", action.payload.token);
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    },
    updatedUserAddress: (state, action) => {
      state.user = action.payload;
    },
    changedUserPassword: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const changeUserPassword =
  (newPassword, oldPassword) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ newPassword, oldPassword });

    try {
      const res = await axios.post(
        "/api/users/change-user-password",
        body,
        config
      );
      dispatch(changedUserPassword(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };

export const updateUserAddress = (id, address) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    id,
    address,
  });

  try {
    const res = await axios.post("/api/users/update-address", body, config);
    dispatch(updatedUserAddress(res.data));
  } catch (error) {
    console.log(error.message);
  }
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.userToken) {
    setAuthToken(localStorage.userToken);
  }

  try {
    if (localStorage.userToken) {
      const res = await axios.get("/api/users");
      dispatch(userLoaded(res.data));
      dispatch(getCart(res.data._id));
      dispatch(getWishlist(res.data._id));
    }
  } catch (error) {
    console.log(error);
    dispatch(logout());
  }
};

export const login = (form) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name: form.username, password: form.password });

  try {
    const res = await axios.post("/api/users/userAuth", body, config);
    dispatch(loginSuccess(res.data));
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
    dispatch(logout());
  }
};

export const createUser = (user) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    email: user.email,
    name: user.name,
    password: user.password,
  });

  try {
    const res = await axios.post("/api/users", body, config);
    dispatch(loginSuccess(res.data));
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
  }
};

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export const {
  userLoaded,
  loginSuccess,
  logout,
  updatedUserAddress,
  changedUserPassword,
} = userSlice.actions;
export default userSlice.reducer;
