import { createSlice, nanoid } from '@reduxjs/toolkit';
import { fetchData } from './channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    // Мы превращаем addMessage в объект, чтобы использовать prepare callback
    addMessage: {
      reducer: (state, action) => {
        // action.payload теперь будет содержать наш объект с id
        state.messages.push(action.payload);
      },
      prepare: (message) => {
        // Эта функция выполняется ПЕРЕД reducer'ом.
        // Она получает наш объект сообщения без id...
        // ... и добавляет к нему уникальный id, сгенерированный nanoid().
        return { payload: { id: nanoid(), ...message } };
      },
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
