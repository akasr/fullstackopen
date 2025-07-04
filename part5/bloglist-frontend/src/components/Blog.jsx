import { useState } from 'react'

const Blog = ({ deleteBlog, incrementLikes, blog, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLikes = async (e) => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    }
    await incrementLikes(newBlog, blog.id)
  }

  const removeBlog = async () => {
    const isApproved = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (isApproved) {
      await deleteBlog(blog.id)
    }
  }

  const buttonLabel = visible ? 'hide' : 'view'
  const displayStyle = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const removeButtonStyle = {
    backgroundColor: 'blue',
    border: 'none',
    padding: 3,
    borderRadius: 3,
    display: user.id === blog.user.id ? '' : 'none'
  }

  return (
    <div style={blogStyle}>
      <span>{blog.title} {blog.author} </span>
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={displayStyle} className='invisibleByDefault'>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <div>
          likes {blog.likes} <button onClick={updateLikes}>like</button>
        </div>
        <p>{blog?.user?.name}</p>
        <div>
          <button onClick={removeBlog} style={removeButtonStyle}>
            remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog
