import { createSlice } from '@reduxjs/toolkit';

const initialState = 'Welcome to the Anecdote App!';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(_, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    }
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

let notificationTimeoutId = null;

export const setNotificationWithTimeout = (message, duration) => {
  return dispatch => {
    clearTimeout(notificationTimeoutId);
    dispatch(setNotification(message));
    notificationTimeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
};

export default notificationSlice.reducer;
