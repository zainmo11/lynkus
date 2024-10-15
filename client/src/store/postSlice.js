import { createSlice } from "@reduxjs/toolkit";
import logo from "../assets/logo.png";

const initialState = {
  posts: [
    {
      username: "User One",
      name: "@Hat",
      profileImg: logo,
      body: "Tried to cook a fancy dinner last night. Ended up with a smoke alarm Maybe I should just stick to boiling water ?",
      postImg: "",
      likes: 176,
      comments: 65,
      showPost: true,
      postLiked: false,
    },
    {
      username: "User Two",
      name: "@Fat",
      profileImg: logo,
      body: "Why do they call it a 'building' if it's already built? Shouldn't we call it a 'built'? I demand answers.",
      postImg: logo,
      likes: 305,
      comments: 157,
      showPost: true,
      postLiked: false,
    },
    {
      username: "User Three",
      name: "@Bat",
      profileImg: logo,
      body: "Every time I try to eat healthy, a chocolate bar looks at me and says, 'Come on, live a little!' I guess my chocolate bar is a motivational speaker.",
      postImg: "",
      likes: 120,
      comments: 42,
      showPost: true,
      postLiked: false,
    },
    {
      username: "User Four",
      name: "@Mat",
      profileImg: logo,
      body: "Went to the gym today. Well, I went to the gym parking lot and sat in my car. Does that count ?",
      postImg: logo,
      likes: 276,
      comments: 108,
      showPost: true,
      postLiked: false,
    },
  ],
  userPosts: [
    {
      username: "Sam Guy",
      name: "@samguy",
      profileImg: logo,
      body: "Tried to cook a fancy dinner last night. Ended up with a smoke alarm Maybe I should just stick to boiling water ?",
      postImg: "",
      likes: 176,
      comments: 65,
      showPost: true,
      postLiked: false,
    },
    {
      username: "Sam Guy",
      name: "@samguy",
      profileImg: logo,
      body: "Why do they call it a 'building' if it's already built? Shouldn't we call it a 'built'? I demand answers.",
      postImg: logo,
      likes: 305,
      comments: 157,
      showPost: true,
      postLiked: false,
    },
    {
      username: "Sam Guy",
      name: "@samguy",
      profileImg: logo,
      body: "Every time I try to eat healthy, a chocolate bar looks at me and says, 'Come on, live a little!' I guess my chocolate bar is a motivational speaker.",
      postImg: "",
      likes: 120,
      comments: 42,
      showPost: true,
      postLiked: false,
    },
    {
      username: "Sam Guy",
      name: "@samguy",
      profileImg: logo,
      body: "Went to the gym today. Well, I went to the gym parking lot and sat in my car. Does that count ?",
      postImg: logo,
      likes: 276,
      comments: 108,
      showPost: true,
      postLiked: false,
    },
  ],
  likedPosts: [
    {
      username: "Sam Guy",
      name: "@samguy",
      profileImg: logo,
      body: "Tried to cook a fancy dinner last night. Ended up with a smoke alarm Maybe I should just stick to boiling water ?",
      postImg: "",
      likes: 176,
      comments: 65,
      showPost: true,
      postLiked: true,
    },
    {
      username: "Sam Guy",
      name: "@samguy",
      profileImg: logo,
      body: "Why do they call it a 'building' if it's already built? Shouldn't we call it a 'built'? I demand answers.",
      postImg: logo,
      likes: 305,
      comments: 157,
      showPost: true,
      postLiked: true,
    },
    {
      username: "Sam Guy",
      name: "@samguy",
      profileImg: logo,
      body: "Every time I try to eat healthy, a chocolate bar looks at me and says, 'Come on, live a little!' I guess my chocolate bar is a motivational speaker.",
      postImg: "",
      likes: 120,
      comments: 42,
      showPost: true,
      postLiked: true,
    },
    {
      username: "Sam Guy",
      name: "@samguy",
      profileImg: logo,
      body: "Went to the gym today. Well, I went to the gym parking lot and sat in my car. Does that count ?",
      postImg: logo,
      likes: 276,
      comments: 108,
      showPost: true,
      postLiked: true,
    },
  ],
};

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
});

export const { togglePost, likePost, toggleLikedPosts } = postSlice.actions;

export default postSlice.reducer;
