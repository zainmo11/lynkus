import { configureStore } from "@reduxjs/toolkit";
import darkModeSlice from "./darkModeSlice";
import userSlice from "./userSlice";
import postSlice from "./postSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeSlice,
    user: userSlice,
    post: postSlice,
  },
});
