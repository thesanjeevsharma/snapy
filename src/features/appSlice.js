import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    user: null,
    selectedImage: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
    selectImage: (state, action) => {
      state.selectedImage = action.payload.imageUrl;
    },
    resetImage: (state) => {
      state.selectedImage = null;
    },
  },
});

export const { login, logout, selectImage, resetImage } = appSlice.actions;

export const selectApp = (state) => state.app;

export default appSlice.reducer;
