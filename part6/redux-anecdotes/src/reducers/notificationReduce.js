import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return "";
    },
  },
});

export const { setNotification, removeNotification } = notificationSlice.actions;

export const notificationHandler = (content, time = 10) => {
  return (dispatch) => {
    const msTime = time * 1000;
    dispatch(setNotification(content));
    setTimeout(() => {
      dispatch(removeNotification());
    }, msTime);
  };
};

export default notificationSlice.reducer;
