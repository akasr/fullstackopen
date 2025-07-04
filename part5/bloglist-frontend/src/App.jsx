import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Error from './components/Error'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [user])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(newBlog)
    setBlogs(
      blogs.concat({ ...returnedBlog, user }).sort((a, b) => b.likes - a.likes)
    )
    setMessage(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const incrementLikes = async (blog, id) => {
    const returnedBlog = await blogService.update(blog, id)
    setBlogs(
      blogs
        .map((b) => (b.id !== id ? b : { ...b, likes: returnedBlog.likes }))
        .sort((a, b) => b.likes - a.likes)
    )
  }

  const deleteBlog = async (id) => {
    await blogService.remove(id)
    setBlogs(
      blogs.filter((b) => b.id !== id).sort((a, b) => b.likes - a.likes)
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessage('user logged out')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      {message && <Error message={message} />}
      {user ? (
        <>
          <h1>blogs</h1>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>

          <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
            <BlogForm addBlog={createBlog} setMessage={setMessage} />
          </Togglable>

          <div>
            {blogs.map((blog) => (
              <Blog
                blog={blog}
                key={blog.id}
                incrementLikes={incrementLikes}
                deleteBlog={deleteBlog}
                user={user}
              />
            ))}
          </div>
        </>
      ) : (
        <LoginForm setUser={setUser} setMessage={setMessage} />
      )}
    </div>
  )
}

export default App
