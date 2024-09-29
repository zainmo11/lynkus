import { createSlice } from "@reduxjs/toolkit";
import logo from "../assets/logo.png";

const initialState = {
  users: [
    { username: "User One", name: "@Hat", profileImg: logo },
    { username: "User Two", name: "@Fat", profileImg: logo },
    { username: "User Three", name: "@Bat", profileImg: logo },
    { username: "User Four", name: "@Mat", profileImg: logo },
  ],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

// export const {} = userSlice.actions

export default userSlice.reducer;
