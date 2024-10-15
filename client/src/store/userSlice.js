import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import logo from "../assets/logo.png";
import api from "../utils/axios";

const initialState = {
  // Dummy data (replace with actual data fetching logic later)
  userData: {
    name: "Sam Guy",
    userName: "samguy",
    // bio: "Lorem ipsum odor amet, consectetuer adipiscing elit. Congue lectus fermentum nisl accumsan ut fames amet justo.",
    bio: "",
    profileImg:
      "https://avatar.iran.liara.run/username?username=Lynkus&background=008080&color=F0F8FF&length=1",
    headerImg: "https://placeholder.pics/svg/700/DEDEDE/DEDEDE/",
  },
  userPosts: [],
  userLikedPosts: [],
  userFollowers: [],
  userFollowings: [],
  message: null,
  users: [
    { name: "User One", username: "@Hat", profileImg: logo },
    { name: "User Two", username: "@Fat", profileImg: logo },
    { name: "User Three", username: "@Bat", profileImg: logo },
    { name: "User Four", username: "@Mat", profileImg: logo },
  ],
  loading: true,
  err: null,
};

//API CALLS
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (username, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users/profile/${username}`);
      // const res = await api.get(`/users/profile/3bkr`);
      return res.data.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const editUserProfile = createAsyncThunk(
  "user/editUserProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.put("/users", {
        ...userData,
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
      const res = await api.delete("/users");
      return res.data.message;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "user/getUserPosts",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/posts/user/${userId}`); //TODO: make it dynamic
      return res.data.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const getUserLikedPosts = createAsyncThunk(
  "user/getUserLikedPosts",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/posts/likes/${userId}`);
      return res.data.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const getUserFollowers = createAsyncThunk(
  "user/getUserFollowers",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/follows/followers/${userId}?page=1&limit=50`);
      return res.data.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const getUserFollowings = createAsyncThunk(
  "user/getUserFollowings",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/follows/following/${userId}?page=1&limit=50`);
      return res.data.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const toggleFollow = createAsyncThunk(
  "user/toggleFollow",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.post(`/follows/${userId}`); //TODO: make it dynamic
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        console.log("Getting user data...");
        state.loading = true;
      })
      .addCase(getUserData.rejected, (state, action) => {
        console.log("Error getting user data");
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        console.log("Done getting user data");
        state.userData = { ...state.userData, ...action.payload };
        state.loading = false;
      })
      .addCase(editUserProfile.pending, (state) => {
        console.log("Updating user data...");
        state.loading = true;
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        console.log("Error updating user data");
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        console.log("Done updating user data");
        state.userData = { ...state.userData, ...action.payload };
        state.loading = false;
      })
      .addCase(deleteUserProfile.pending, (state) => {
        console.log("Deleting user profile...");
        state.loading = true;
      })
      .addCase(deleteUserProfile.rejected, (state, action) => {
        console.log("Error deleting user profile");
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(deleteUserProfile.fulfilled, (state, action) => {
        console.log("Done deleting user profile");
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(getUserPosts.pending, (state) => {
        console.log("Getting user posts...");
        state.loading = true;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        console.log("Error getting user posts");
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        console.log("Done getting user posts");
        state.userPosts = action.payload;
        state.loading = false;
      })
      .addCase(getUserLikedPosts.pending, (state) => {
        console.log("Getting user liked posts...");
        state.loading = true;
      })
      .addCase(getUserLikedPosts.rejected, (state, action) => {
        console.log("Error getting user liked posts");
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(getUserLikedPosts.fulfilled, (state, action) => {
        console.log("Done getting user liked posts");
        state.userLikedPosts = action.payload;
        state.loading = false;
      })
      .addCase(getUserFollowers.pending, (state) => {
        console.log("Getting user followers...");
        state.loading = true;
      })
      .addCase(getUserFollowers.rejected, (state, action) => {
        console.log("Error getting user followers");
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(getUserFollowers.fulfilled, (state, action) => {
        console.log("Done getting user followers");
        state.userFollowers = action.payload;
        state.loading = false;
      })
      .addCase(getUserFollowings.pending, (state) => {
        console.log("Getting user followings...");
        state.loading = true;
      })
      .addCase(getUserFollowings.rejected, (state, action) => {
        console.log("Error getting user followings");
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(getUserFollowings.fulfilled, (state, action) => {
        console.log("Done getting user followings");
        state.userFollowings = action.payload;
        state.loading = false;
      })
      .addCase(toggleFollow.pending, (state) => {
        console.log("Toggle Follow...");
        state.loading = true;
      })
      .addCase(toggleFollow.rejected, (state, action) => {
        console.log("Error Toggling Follow");
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(toggleFollow.fulfilled, (state, action) => {
        console.log("Done Toggling Follow");
        state.message = action.payload;
        state.loading = false;
      });
  },
});

// export const {} = userSlice.actions

export default userSlice.reducer;
