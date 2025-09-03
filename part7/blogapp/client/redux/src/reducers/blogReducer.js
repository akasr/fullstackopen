import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogsAction(state, action) {
      return action.payload
    },
    createBlogAction(state, action) {
      state.push(action.payload)
    },
    likeBlogAction(state, action) {
      const blog = action.payload
      return state.map((b) => (b.id === blog.id ? blog : b)).sort((a, b) => b.likes - a.likes)
    },
    deleteBlogAction(state, action) {
      return state.filter(b => b.id !== action.payload)
    },
    addCommentAction(state, action) {
      const blog = action.payload
      return state.map((b) => (b.id === blog.id ? blog : b))
    }
  },
})

export const { setBlogsAction, createBlogAction, likeBlogAction, deleteBlogAction, addCommentAction } = blogSlice.actions

export const setBlogsThunk = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogsAction(blogs))
  }
}

export const createBlogThunk = (blog) => {
  return async (dispatch) => {
    const retrunedBlog = await blogService.create(blog)
    dispatch(createBlogAction(retrunedBlog))
  }
}

export const likeBlogThunk = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(updatedBlog)
    dispatch(likeBlogAction(updatedBlog))
  }
}

export const deleteBlogThunk = (id) => {
  return async (disptach) => {
    await blogService.remove(id)
    disptach(deleteBlogAction(id))
  }
}

export const addCommentThunk = (blog, comment) => {
  return async (dispatch) => {
    const blogReturned = await blogService.comment(blog.id, comment)
    dispatch(addCommentAction(blogReturned)) 
  }
}

export default blogSlice.reducer
