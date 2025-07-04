import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              data-testid='username'
              onChange={({ target }) => setUsername(target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              data-testid='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm
