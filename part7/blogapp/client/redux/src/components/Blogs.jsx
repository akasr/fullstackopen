import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { Divider } from '@mui/material'

import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = () => {
  const blogs = useSelector((store) => store.blogs)

  return (
    <>
      <Togglable buttonLabel={'new blog'}>
        <BlogForm />
      </Togglable>

      <h2>Blogs</h2>
      <List>
        {blogs.map((blog) => (
          <>
            <ListItem key={blog.id}>
              <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
                <ListItemText primary={blog.title} />
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
          </>
        ))}
      </List>
    </>
  )
}

export default Blogs
