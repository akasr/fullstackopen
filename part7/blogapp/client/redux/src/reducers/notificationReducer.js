import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'blogs',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    },
  },
})

export const { setNotification, clearNotification } = notificationReducer.actions

export default notificationReducer.reducer
