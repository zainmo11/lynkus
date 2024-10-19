import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { setAuthToken } from "../utils/axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const token = cookies.get("token") || null;
const cookieUserData = cookies.get("user");

const initialState = {
  authUserData: cookieUserData || {},
  userData: {},
  isOwnProfile: false,
  userPosts: null,
  userLikedPosts: null,
  userFollowers: null,
  userFollowings: null,
  userRecommendation: [],
  message: null,
  loading: false,
  err: null,
};

export const fetchUserDataFromCookies = createAsyncThunk(
  "user/fetchUserDataFromCookies",
  async (_, { rejectWithValue }) => {
    try {
      const userData = cookies.get("user");
      if (userData) {
        return userData;
      } else {
        return null;
      }
    } catch (error) {
      return rejectWithValue("Failed to fetch user data from cookies" + error);
    }
  }
);

//API CALLS
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (userId, { rejectWithValue }) => {
    try {
      setAuthToken(token);
      const [posts, likedPosts, followers, followings] = await Promise.all([
        api.get(`/posts/user/${userId}`),
        api.get(`/posts/likes/${userId}`),
        api.get(`/follows/followers/${userId}?page=1&limit=50`),
        api.get(`/follows/following/${userId}?page=1&limit=50`),
      ]);
      return {
        posts: posts.data,
        likedPosts: likedPosts.data,
        followers: followers.data.data,
        followings: followings.data.data,
      };
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Failed to fetch user data"
      );
    }
  }
);

export const recommendedUsers = createAsyncThunk(
  "user/recommendedUsers",
  async (_, { rejectWithValue }) => {
    try {
      setAuthToken(token);
      const res = await api.get(`/follows/recommended`);
      console.log(res.data.recommendedUsers);
      return res.data.recommendedUsers;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data.message);
    }
  }
);

// export const getAuthUserData = createAsyncThunk(
//   "user/getAuthUserData",
//   async (username, { rejectWithValue }) => {
//     try {
//       setAuthToken(token);
//       const res = await api.get(`/users/profile/${username}`);
//       return res.data.data;
//     } catch (e) {
//       return rejectWithValue(e.response.data.message);
//     }
//   }
// );

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (username, { rejectWithValue }) => {
    try {
      setAuthToken(token);
      const res = await api.get(`/users/profile/${username}`);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const editUserProfile = createAsyncThunk(
  "user/editUserProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      setAuthToken(token);
      console.log("UPDATING USER DATA: ");
      console.log(updatedData);

      const res = await api.put("/users", updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const deleteUserProfile = createAsyncThunk(
  "user/deleteUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      setAuthToken(token);
      const res = await api.delete("/users");
      console.log("DELETED");
      console.log(res.data.message);

      return res.data.message;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data.message);
    }
  }
);

// export const getUserPosts = createAsyncThunk(
//   "user/getUserPosts",
//   async (userId, { rejectWithValue }) => {
//     try {
//       setAuthToken(token);
//       const res = await api.get(`/posts/user/${userId}`);
//       return res.data;
//     } catch (e) {
//       console.log(e);
//       return rejectWithValue(e.response.data.message);
//     }
//   }
// );

// export const getUserLikedPosts = createAsyncThunk(
//   "user/getUserLikedPosts",
//   async (userId, { rejectWithValue }) => {
//     try {
//       setAuthToken(token);
//       const res = await api.get(`/posts/likes/${userId}`);
//       return res.data;
//     } catch (e) {
//       console.log(e);
//       return rejectWithValue(e.response.data.message);
//     }
//   }
// );

// export const getUserFollowers = createAsyncThunk(
//   "user/getUserFollowers",
//   async (userId, { rejectWithValue }) => {
//     try {
//       setAuthToken(token);
//       const res = await api.get(`/follows/followers/${userId}?page=1&limit=50`);
//       return res.data.data;
//     } catch (e) {
//       console.log(e);
//       return rejectWithValue(e.response.data.message);
//     }
//   }
// );

// export const getUserFollowings = createAsyncThunk(
//   "user/getUserFollowings",
//   async (userId, { rejectWithValue }) => {
//     try {
//       setAuthToken(token);
//       const res = await api.get(`/follows/following/${userId}?page=1&limit=50`);
//       return res.data.data;
//     } catch (e) {
//       console.log(e);
//       return rejectWithValue(e.response.data.message);
//     }
//   }
// );

export const toggleFollow = createAsyncThunk(
  "user/toggleFollow",
  async (userId, { rejectWithValue }) => {
    try {
      setAuthToken(token);
      const res = await api.post(`/follows/${userId}`);
      return res.data.message;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const toggleLikeUserPost = createAsyncThunk(
  "user/toggleLikeUserPost",
  async (postId, { rejectWithValue }) => {
    try {
      setAuthToken(token);
      const res = await api.post(`/likes`, {
        postId: postId,
      });
      return res.data.message;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // fetchUserDataFromCookies: (state) => {
    //   const userData = cookies.get("user");
    //   if (userData) {
    //     state.authUserData = userData;
    //   } else {
    //     console.log("NO USER DATA FROM COOKIES");
    //     state.authUserData = null;
    //   }
    // },
    clearUserData: (state) => {
      state.userData = null;
      state.userPosts = null;
      state.userLikedPosts = null;
      state.userFollowers = null;
      state.userFollowings = null;
    },
    checkOwnProfile: (state, action) => {
      console.log("CHECKING IF OWN PROFILE");

      const userData = cookies.get("user");
      console.log("CHECKING IF OWN PROFILE, GET USER DATA", userData);
      if (userData) {
        const username = state.authUserData.userName
          ? state.authUserData?.userName
          : state.authUserData.data?.userName;
        console.log("CHECKING IF OWN PROFILE, GET USER NAME", username);
        console.log(
          "CHECKING IF OWN PROFILE, GET USER NAME FROM PARAMS",
          action.payload
        );
        state.isOwnProfile = username === action.payload;
        console.log("FINISHED CHECKING IF OWN PROFILE: ", state.isOwnProfile);
      } else {
        state.isOwnProfile = false;
        console.log("FINISHED CHECKING IF OWN PROFILE: ", state.isOwnProfile);
      }
    },
  },
  extraReducers: (builder) => {
    // builder
    // .addCase(getAuthUserData.pending, (state) => {
    //   console.log("Getting auth user data...");
    //   state.loading = true; state.err = null;
    // })
    // .addCase(getAuthUserData.rejected, (state, action) => {
    //   console.log("Error getting auth user data");
    //   state.loading = false;
    //   state.err = action.payload;
    // })
    // .addCase(getAuthUserData.fulfilled, (state, action) => {
    //   state.err = null;
    //   console.log("Done getting auth user data");
    //   console.log(action.payload);
    //   state.authUserData = { ...state.authUserData, ...action.payload };
    //   state.loading = false;
    // })
    builder
      .addCase(fetchUserDataFromCookies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDataFromCookies.fulfilled, (state, action) => {
        state.loading = false;
        state.authUserData = action.payload;
      })
      .addCase(fetchUserDataFromCookies.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(getUserData.pending, (state) => {
        console.log("Getting user data...");
        // state.loading = true;
        state.err = null;
      })
      .addCase(getUserData.rejected, (state, action) => {
        console.log("Error getting user data");
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.err = null;
        console.log("Done getting user data");
        console.log(action.payload);
        if (state.isOwnProfile) {
          state.authUserData = action.payload;
          cookies.set("user", JSON.stringify(action.payload), { path: "/" });
        } else {
          state.userData = action.payload;
        }
        state.loading = false;
      })
      .addCase(fetchUserData.pending, (state) => {
        // state.loading = true;
        state.err = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload.posts.reverse();
        state.userLikedPosts = action.payload.likedPosts.reverse();
        state.userFollowers = action.payload.followers.reverse();
        state.userFollowings = action.payload.followings.reverse();
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(editUserProfile.pending, (state) => {
        console.log("Updating user data...");
        state.loading = true;
        state.err = null;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        console.log("Error updating user data");
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.err = null;
        console.log("Done updating user data");
        state.authUserData = { ...state.authUserData, ...action.payload };
        state.loading = false;
      })
      .addCase(deleteUserProfile.pending, (state) => {
        console.log("Deleting user profile...");
        state.loading = true;
        state.err = null;
      })
      .addCase(deleteUserProfile.rejected, (state, action) => {
        console.log("Error deleting user profile");
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(deleteUserProfile.fulfilled, (state, action) => {
        state.err = null;
        console.log("Done deleting user profile");
        state.message = action.payload;
        state.loading = false;
      })
      // .addCase(getUserPosts.pending, (state) => {
      //   console.log("Getting user posts...");
      //   state.loading = true;
      //   state.err = null;
      // })
      // .addCase(getUserPosts.rejected, (state, action) => {
      //   console.log("Error getting user posts");
      //   state.loading = false;
      //   state.err = action.payload;
      // })
      // .addCase(getUserPosts.fulfilled, (state, action) => {
      //   state.err = null;
      //   console.log("Done getting user posts");
      //   state.userPosts = action.payload;
      //   state.loading = false;
      // })
      // .addCase(getUserLikedPosts.pending, (state) => {
      //   console.log("Getting user liked posts...");
      //   state.loading = true;
      //   state.err = null;
      // })
      // .addCase(getUserLikedPosts.rejected, (state, action) => {
      //   console.log("Error getting user liked posts");
      //   state.loading = false;
      //   state.err = action.payload;
      // })
      // .addCase(getUserLikedPosts.fulfilled, (state, action) => {
      //   state.err = null;
      //   console.log("Done getting user liked posts");
      //   state.userLikedPosts = action.payload;
      //   state.loading = false;
      // })
      // .addCase(getUserFollowers.pending, (state) => {
      //   console.log("Getting user followers...");
      //   state.loading = true;
      //   state.err = null;
      // })
      // .addCase(getUserFollowers.rejected, (state, action) => {
      //   console.log("Error getting user followers");
      //   state.loading = false;
      //   state.err = action.payload;
      // })
      // .addCase(getUserFollowers.fulfilled, (state, action) => {
      //   state.err = null;
      //   console.log("Done getting user followers");
      //   state.userFollowers = action.payload;
      //   state.loading = false;
      // })
      // .addCase(getUserFollowings.pending, (state) => {
      //   console.log("Getting user followings...");
      //   state.loading = true;
      //   state.err = null;
      // })
      // .addCase(getUserFollowings.rejected, (state, action) => {
      //   console.log("Error getting user followings");
      //   state.loading = false;
      //   state.err = action.payload;
      // })
      // .addCase(getUserFollowings.fulfilled, (state, action) => {
      //   state.err = null;
      //   console.log("Done getting user followings");
      //   state.userFollowings = action.payload;
      //   state.loading = false;
      // })
      // .addCase(toggleFollow.pending, (state) => {
      //   console.log("Toggle Follow...");
      //   state.loading = true;
      //   state.err = null;
      // })
      // .addCase(toggleFollow.rejected, (state, action) => {
      //   console.log("Error Toggling Follow");
      //   state.loading = false;
      //   state.err = action.payload;
      // })
      .addCase(toggleFollow.fulfilled, (state, action) => {
        state.err = null;
        console.log("Done Toggling Follow");
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(recommendedUsers.pending, (state) => {
        console.log("Getting recommended users...");
        state.loading = true;
        state.err = null;
      })
      .addCase(recommendedUsers.rejected, (state, action) => {
        console.log("Error getting recommended users");
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(recommendedUsers.fulfilled, (state, action) => {
        console.log("Done getting recommended users");
        state.userRecommendation = action.payload;
        state.loading = false;
      })
      .addCase(toggleLikeUserPost.fulfilled, (state) => {
        state.err = null;
        state.loading = false;
      })
      // .addCase(toggleLikeUserPost.pending, (state) => {
      //   state.err = null;
      //   state.loading = true;
      // })
      .addCase(toggleLikeUserPost.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload.message;
      });
  },
});

// export const { fetchUserDataFromCookies, checkOwnProfile } = userSlice.actions;
export const { checkOwnProfile, clearUserData } = userSlice.actions;

export default userSlice.reducer;
