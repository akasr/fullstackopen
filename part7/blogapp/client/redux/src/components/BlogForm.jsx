import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { createBlogThunk } from '../reducers/blogReducer'
import { setVisibility } from '../reducers/formVisibilityReducer'

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
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:{' '}
          <input
            type="text"
            value={title}
            data-testid="title"
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div>
          author:{' '}
          <input
            type="text"
            value={author}
            data-testid="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            type="text"
            value={url}
            data-testid="url"
            onChange={({ target }) => setUrl(target.value)}
            required
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
