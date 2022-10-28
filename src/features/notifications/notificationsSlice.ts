import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { add, remove } from "../../utils";
import { NotificationsState } from "./types";

const initialState: NotificationsState = {
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    requestAddNotification: (
      state: NotificationsState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        notifications: add(state.notifications, action.payload),
      };
    },
    requestRemoveNotification: (
      state: NotificationsState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        notifications: remove(state.notifications, action.payload),
      };
    },
  },
});

export const selectNotifications = (state: RootState) => state.notifications;

export const { requestAddNotification, requestRemoveNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
