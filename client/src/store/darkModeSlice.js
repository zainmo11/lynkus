import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

export const darkmodeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = darkmodeSlice.actions;

export default darkmodeSlice.reducer;
