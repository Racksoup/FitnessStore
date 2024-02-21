import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  ticket: null,
  tickets: null,
};

export const selectTicket = (state) => state.ticket.ticket;
export const selectTickets = (state) => state.ticket.tickets;

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    gotTicket: (state, action) => {
      state.ticket = action.payload;
    },
    gotTickets: (state, action) => {
      state.tickets = action.payload;
    },
  },
});

export const { gotTicket, gotTickets } = ticketSlice.actions;

export default ticketSlice.reducer;
