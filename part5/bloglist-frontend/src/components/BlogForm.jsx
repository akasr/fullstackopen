import { useState } from 'react'

const BlogForm = ({ setMessage, blogs, setBlogs, addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (e) => {
    e.preventDefault()
    const newBlog = { title, author, url }
    setTitle('')
    setAuthor('')
    setUrl('')
    await addBlog(newBlog)
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
