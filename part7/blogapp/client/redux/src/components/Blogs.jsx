import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = () => {
  const blogs = useSelector((store) => store.blogs)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginTop: 5,
    display: 'block'
  }
  return (
    <>
      <Togglable buttonLabel={'new blog'}>
        <BlogForm />
      </Togglable>

      <div>
        {blogs.map((blog) => (
          <Link style={blogStyle} to={`/blogs/${blog.id}`} key={blog.id}>
            {blog.title}
          </Link>
        ))}
      </div>
    </>
  )
}

export default Blogs
