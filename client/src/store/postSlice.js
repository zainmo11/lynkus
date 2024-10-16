import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/axios";

const initialState = {
  posts: [],
  loading: false,
  error: false,
};

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (_, thunkapi) => {
    try {
      const res = await api.get("posts");
      return res.data;
    } catch (e) {
      return thunkapi.rejectWithValue(
        e.res?.data || { message: "An error occurred" }
      );
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    togglePost: (state, action) => {
      state.posts[action.payload].showPost =
        !state.posts[action.payload].showPost;
    },
    likePost: (state, action) => {
      state.posts[action.payload].postLiked =
        !state.posts[action.payload].postLiked;
    },
    toggleLikedPosts: (state, action) => {
      state.likedPosts[action.payload].postLiked =
        !state.likedPosts[action.payload].postLiked;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { togglePost, likePost, toggleLikedPosts } = postSlice.actions;

export default postSlice.reducer;
