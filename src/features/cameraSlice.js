import { createSlice } from "@reduxjs/toolkit";

export const cameraSlice = createSlice({
  name: "camera",
  initialState: {
    imageSrc: null,
  },
  reducers: {
    setCameraImage: (state, action) => {
      state.imageSrc = action.payload.imageSrc;
    },
    resetCameraImage: (state) => {
      state.imageSrc = null;
    },
  },
});

export const { setCameraImage, resetCameraImage } = cameraSlice.actions;

export const cameraState = (state) => state.camera;

export default cameraSlice.reducer;
