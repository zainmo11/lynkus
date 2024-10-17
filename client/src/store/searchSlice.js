import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { setAuthToken } from "../utils/axios";
import { isAuthorized } from "../utils/checkAuth";
import Cookies from "universal-cookie";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async ({ query, activeTab }) => {
    const cookies = new Cookies();

    if (isAuthorized()) {
      const token = cookies.get("token");
      setAuthToken(token);
    }

    let data = [];

    if (activeTab === "Users") {
      const userResponse = await api.get(`/users?search=${query}`);
      data = userResponse.data;
    } else if (activeTab === "") {
      const postsResponse = await api.get(`/posts/searchPost/${query}`);
      data = postsResponse.data;
    }

    return data;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQuery: "",
    activeTab: "",
    users: [],
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        if (state.activeTab === "Users") {
          state.users = action.payload;
        } else if (state.activeTab === "") {
          state.posts = action.payload;
        }
        state.loading = false;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setSearchQuery, setActiveTab } = searchSlice.actions;
export default searchSlice.reducer;
