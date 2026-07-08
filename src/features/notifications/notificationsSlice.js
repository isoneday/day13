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
      state.unreadCount += 1;
    },
    allNotificationsMarkedRead(state) {
      state.items = state.items.map((notification) => ({
        ...notification,
        read: true,
      }));
      state.unreadCount = 0;
    },
  },
});

export const { allNotificationsMarkedRead, notificationReceived } = notificationsSlice.actions;

export default notificationsSlice.reducer;
