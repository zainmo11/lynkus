import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { setAuthToken } from "../utils/axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (loginValues, thunkAPI) => {
    try {
      const response = await api.post("/auth/login", loginValues);
      console.log(loginValues);

      const { AccessToken, data } = response.data;

      cookies.set("token", AccessToken, { path: "/" });
      cookies.set("user", JSON.stringify(data), { path: "/" });
      localStorage.setItem("token", AccessToken);

      setAuthToken(AccessToken);

      return { AccessToken, data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (values, thunkAPI) => {
    try {
      const response = await api.post("/auth/register", values);
      const { AccessToken, user } = response.data;

      cookies.set("token", AccessToken, { path: "/" });
      cookies.set("user", JSON.stringify(user), { path: "/" });
      localStorage.setItem("token", AccessToken);

      setAuthToken(AccessToken);

      return { AccessToken, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const isAuthorized = () => {
  const token = localStorage.getItem("token");
  const cookiesToken = cookies.get("token");
  const cookiesData = cookies.get("user");
  if (token && cookiesToken && cookiesData) {
    return true;
  } else {
    return false;
  }
};

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: cookies.get("token") || null,
    user: cookies.get("user") ? JSON.parse(cookies.get("user")) : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      cookies.remove("token", { path: "/" });
      cookies.remove("user", { path: "/" });
      localStorage.removeItem("token");

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
        state.token = action.payload.AccessToken;
        state.user = action.payload.user;
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
