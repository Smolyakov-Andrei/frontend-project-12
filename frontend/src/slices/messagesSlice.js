import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './channelsSlice.js'; // Импортируем тот же Thunk

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;

