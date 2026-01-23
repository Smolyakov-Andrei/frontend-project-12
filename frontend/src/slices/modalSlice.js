import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    type: null,
    item: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpen = true;
      state.type = payload.type;
      state.item = payload.item || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.item = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
