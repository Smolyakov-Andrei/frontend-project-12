import { createSlice, nanoid } from '@reduxjs/toolkit';
import { fetchData, removeChannel } from './channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    addMessage: {
      reducer: (state, { payload }) => {
        state.messages.push(payload);
      },
      prepare: (message) => ({ payload: { id: nanoid(), ...message } }),
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
      })
      .addCase(removeChannel, (state, { payload: id }) => {
        state.messages = state.messages.filter((m) => m.channelId !== id);
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
