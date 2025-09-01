import { createSlice } from '@reduxjs/toolkit'

const formVisibilitySlice = createSlice({
  name: 'formVisibility',
  initialState: false,
  reducers: {
    setVisibility(state, action) {
      return !state
    }
  }
})

export const { setVisibility } = formVisibilitySlice.actions
export default formVisibilitySlice.reducer