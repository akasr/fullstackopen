import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlogThunk } from '../reducers/blogReducer'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector(store => store.blogs.find(b => b.id === id))
  const dispatch = useDispatch()

  if(!blog) {
    return null
  }

  const updateLikes = async () => {
    dispatch(likeBlogThunk(blog))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <div>
          likes {blog.likes} <button onClick={updateLikes}>like</button>
        </div>
        <p>added by {blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog
