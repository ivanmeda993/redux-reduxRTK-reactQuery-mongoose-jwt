import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: null,
  id: null,
};
export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.user = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.user = null;
      state.type = null;
      state.id = null;
    },
    addUserModal: (state) => {
      state.type = "add";
      state.isOpen = true;
    },
    editUserModal: (state, action) => {
      state.type = "edit";
      state.id = action.payload;
      state.isOpen = true;
    },
  },
});

//create selectors
export const selectModalStatus = (state) => state.modal.isOpen;
export const selectModalType = (state) => state.modal.type;
export const selectModalUserId = (state) => state.modal.id;

//export actions
export const { openModal, closeModal, editUserModal, addUserModal } =
  modalSlice.actions;

//export reducer
export default modalSlice.reducer;
