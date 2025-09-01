import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import formVisibilityReducer from './reducers/formVisibilityReducer'
import usersReducer from './reducers/usersReducer'
import App from './App'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    formVisibility: formVisibilityReducer,
    users: usersReducer,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
)
