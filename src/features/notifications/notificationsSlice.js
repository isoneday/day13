import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  unreadCount: 0,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificationReceived(state, action) {
      state.items.unshift(action.payload);
      state.items = state.items.slice(0, 10);
      state.unreadCount += 1;
    },
    allNotificationsMarkedRead(state) {
      state.items = state.items.map((notification) => ({
        ...notification,
        read: true,
      }));
      state.unreadCount = 0;
    },
    notificationRemoved(state, action) {
      const notification = state.items.find((item) => item.id === action.payload);

      if (!notification) {
        return;
      }

      state.items = state.items.filter((item) => item.id !== action.payload);

      if (!notification.read) {
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
  },
});

export const { allNotificationsMarkedRead, notificationReceived, notificationRemoved } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
