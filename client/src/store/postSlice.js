import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { setAuthToken } from "../utils/axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (_, thunkapi) => {
    try {
      setAuthToken(token);
      const res = await api.get("posts");
      return res.data;
    } catch (e) {
      return thunkapi.rejectWithValue(
        e.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const likePostToggle = createAsyncThunk(
  "post/likePostToggle",
  async (likeDetails, thunkapi) => {
    try {
      const res = await api.post("likes", likeDetails);
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
      return thunkapi.rejectWithValue(
        e.response?.data || { message: "An error occurred" }
      );
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // togglePost: (state, action) => {
    //   state.posts[action.payload].showPost =
    //     !state.posts[action.payload].showPost;
    // },
    likeNumberChange: (state, action) => {
      if (state.posts[action.payload].likedByUser) {
        state.posts[action.payload].likes =
          state.posts[action.payload].likes - 1;
        state.posts[action.payload].likedByUser =
          !state.posts[action.payload].likedByUser;
      } else {
        state.posts[action.payload].likes =
          state.posts[action.payload].likes + 1;
        state.posts[action.payload].likedByUser =
          !state.posts[action.payload].likedByUser;
      }
    },
    // toggleLikedPosts: (state, action) => {
    //   state.likedPosts[action.payload].postLiked =
    //     !state.likedPosts[action.payload].postLiked;
    // },
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
      })
      .addCase(likePostToggle.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(likePostToggle.pending, (state) => {
        state.loading = true;
      })
      .addCase(likePostToggle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { togglePost, likeNumberChange, toggleLikedPosts } =
  postSlice.actions;

export default postSlice.reducer;
