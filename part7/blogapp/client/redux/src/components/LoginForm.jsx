import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box' // Add Box for layout

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception, 'Wrong Credentials')
      dispatch(setNotification('wrong username or password'))
      setTimeout(() => {
        dispatch(clearNotification(null))
      }, 5000)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: 350,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <h1>Sign In to BlogApp</h1>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            id="username"
            label="Username"
            value={username}
            data-testid="username"
            onChange={({ target }) => setUsername(target.value)}
            fullWidth
            sx={{ my: 2 }}
          />
          <TextField
            type="password"
            label="Password"
            data-testid="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            fullWidth
            sx={{ my: 2 }}
          />
          <Button
            variant="contained"
            color="success"
            type="submit"
            size="large"
            fullWidth
            sx={{ my: 2 }}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default LoginForm
