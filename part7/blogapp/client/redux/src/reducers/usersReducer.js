import { createSlice } from '@reduxjs/toolkit'
import { getAll } from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsersAction(state, action) {
      return action.payload
    },
  },
})

export const { setUsersAction } = usersSlice.actions

export const setUsersThunk = () => {
  return async (dispatch) => {
    const blogs = await getAll()
    dispatch(setUsersAction(blogs))
  }
}

export default usersSlice.reducer