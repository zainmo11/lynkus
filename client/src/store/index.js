import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import notificationSlice from "./notificationSlice";
import authReducer from "./authSlice";
<<<<<<< HEAD
import searchReducer from "./searchSlice";
=======
>>>>>>> 895dc27eea43f5047508bab4307754b799cae748
import appSlice from "./appSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    theme: themeSlice,
    user: userSlice,
    post: postSlice,
    notification: notificationSlice,
    auth: authReducer,
    search: searchReducer,
  },
});
