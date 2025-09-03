import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { createBlogThunk } from '../reducers/blogReducer'
import { setVisibility } from '../reducers/formVisibilityReducer'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleCreate = async (e) => {
    e.preventDefault()
    const newBlog = { title, author, url, likes: 0 }

    dispatch(setVisibility())
    setTitle('')
    setAuthor('')
    setUrl('')

    dispatch(createBlogThunk(newBlog))
    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <Box sx={{ p: 2 }}>
      <h2>Add a Blog</h2>
      <Box
        component="form"
        onSubmit={handleCreate}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Title"
          value={title}
          data-testid="title"
          onChange={({ target }) => setTitle(target.value)}
          required
          fullWidth
        />
        <TextField
          label="Author"
          value={author}
          data-testid="author"
          onChange={({ target }) => setAuthor(target.value)}
          fullWidth
        />
        <TextField
          label="URL"
          value={url}
          data-testid="url"
          onChange={({ target }) => setUrl(target.value)}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="success" sx={{ mt: 1 }}>
          Create
        </Button>
      </Box>
    </Box>
  )
}

export default BlogForm
