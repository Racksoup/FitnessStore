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
  reducers: {},
});

export const {} = refundSlice.actions;

export default refundSlice.reducer;
