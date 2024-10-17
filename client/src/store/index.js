import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import notificationSlice from "./notificationSlice";
import authReducer from "./authSlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
    post: postSlice,
    notification: notificationSlice,
    auth: authReducer,
    search: searchReducer,
  },
});
