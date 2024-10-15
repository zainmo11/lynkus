import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { setAuthToken } from "../utils/axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const login = createAsyncThunk(
  "auth/login",
  async (loginValues, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", loginValues);

      const { AccessToken, data } = response.data;

      cookies.set("token", AccessToken, { path: "/" });
      cookies.set("user", JSON.stringify(data), { path: "/" });

      setAuthToken(AccessToken);

      return { AccessToken, data };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (values, thunkAPI) => {
    try {
      const response = await api.post("/auth/register", values);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "An error occurred" }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: cookies.get("token") || null,
    user: cookies.get("user") ? JSON.stringify(cookies.get("user")) : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      cookies.remove("token", { path: "/" });
      cookies.remove("user", { path: "/" });

      setAuthToken(null);

      state.token = null;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.AccessToken;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
