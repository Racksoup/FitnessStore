import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  refunds: null,
  refund: null,
};

export const selectRefunds = (state) => state.refund.refunds;
export const selectRefund = (state) => state.refund.refund;

export const refundSlice = createSlice({
  name: 'refund',
  initialState,
  reducers: {
    customerRefundReqSent: () => {},

    gotCustomerRefund: (state, action) => {
      state.refund = action.payload;
    },
    createdCustomerRefund: (state, action) => {
      state.refund = action.payload;
    },
  },
});

export const createCustomerRefund = (refundList, id, invoice) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const preBody = {
    userID: id,
    invoice,
    items: refundList
  }

  const body = JSON.stringify(preBody);

  try {
    const res = await axios.post(`/api/refund/`, body, config);
    dispatch(createdCustomerRefund(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const getCustomerRefund = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/refund/${id}`);
    dispatch(gotCustomerRefund(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const { customerRefundReqSent, gotCustomerRefund, createdCustomerRefund } =
  refundSlice.actions;

export default refundSlice.reducer;
