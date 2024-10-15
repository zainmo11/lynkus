import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../utils/axios";

const initialState = {
  //   notifications: [
  //     {
  //       type: "follow",
  //       username: "sarah_j",
  //       read: false,
  //     },
  //     {
  //       type: "like",
  //       username: "tech_guru42",
  //       read: true,
  //     },
  //     {
  //       type: "comment",
  //       username: "coffee_lover",
  //       read: false,
  //     },
  //     {
  //       type: "follow",
  //       username: "photo_master",
  //       read: true,
  //     },
  //     {
  //       type: "like",
  //       username: "fitness_freak",
  //       read: false,
  //     },
  //     {
  //       type: "comment",
  //       username: "bookworm99",
  //       read: true,
  //     },
  //     {
  //       type: "like",
  //       username: "travel_addict",
  //       read: false,
  //     },
  //     {
  //       type: "follow",
  //       username: "music_lover22",
  //       read: true,
  //     },
  //     {
  //       type: "comment",
  //       username: "food_explorer",
  //       read: false,
  //     },
  //     {
  //       type: "like",
  //       username: "art_enthusiast",
  //       read: true,
  //     },
  //     {
  //       type: "follow",
  //       username: "nature_seeker",
  //       read: false,
  //     },
  //     {
  //       type: "comment",
  //       username: "movie_buff",
  //       read: true,
  //     },
  //     {
  //       type: "like",
  //       username: "pet_parent",
  //       read: false,
  //     },
  //     {
  //       type: "follow",
  //       username: "code_ninja",
  //       read: true,
  //     },
  //     {
  //       type: "comment",
  //       username: "fashion_icon",
  //       read: false,
  //     },
  //   ],
  notifications: [],
  loading: true,
  err: null,
  hasNewNotifications: false,
};

//API CALLS
export const getAllNotifications = createAsyncThunk(
  "notifications/getAllNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/notifications");
      return res.data.Notifications;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    readNotification: (state, action) => {
      state.notifications[action.payload].read = true;
      state.hasNewNotifications = state.notifications.some((n) => !n.read);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotifications.pending, (state) => {
        console.log("Getting all notifications...");
        state.loading = true;
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        console.log("Error getting all notifications");
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        console.log("Done getting all notifications");
        const newNotifications = action.payload.filter(
          (newNotification) =>
            !state.notifications.some(
              (oldNotification) => oldNotification.id === newNotification.id
            )
        );
        state.notifications = action.payload;
        state.hasNewNotifications =
          newNotifications.length > 0 ||
          state.notifications.some((n) => !n.read);
        state.loading = false;
      });
  },
});

export const { readNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
