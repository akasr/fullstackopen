import { createSlice } from "@reduxjs/toolkit";

let currentTimer = null

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationThunk = (notification, time) => {
  return async (dispatch) => {
    if (currentTimer) {
      clearTimeout(currentTimer)
    }
    currentTimer = setTimeout(() => {
      dispatch(clearNotification())
      currentTimer = null
    }, time * 1000)
    dispatch(setNotification(notification))
  }
}

export default notificationSlice.reducer