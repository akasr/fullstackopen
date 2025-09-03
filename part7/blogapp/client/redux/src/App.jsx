import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'
import { setBlogsThunk } from './reducers/blogReducer'
import { setNotification, clearNotification } from './reducers/notificationReducer'
import { setUsersThunk } from './reducers/usersReducer'
import blogService from './services/blogs'

// User Components
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'

const App = () => {
  const [user, setUser] = useState(null)

  const notification = useSelector((store) => store.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setBlogsThunk())
    dispatch(setUsersThunk())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    dispatch(setNotification('user logged out'))
    setTimeout(() => {
      dispatch(clearNotification(null))
    }, 5000)
  }

  const padding = {
    padding: 5,
  }

  return (
    <div>
      {notification && <Error message={notification} />}
      {user ? (
        <>
          <Navigation />
          <h1>BlogApp</h1>
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </>
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </div>
  )
}

export default App
