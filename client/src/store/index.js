import { configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./darkModeSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeSlice,
    user: userSlice,
  },
});
