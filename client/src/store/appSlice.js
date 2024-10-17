import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAlert: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleAlert: (state) => {
      state.showAlert = !state.showAlert;
    },
  },
});

export const { toggleAlert } = appSlice.actions;

export default appSlice.reducer;
