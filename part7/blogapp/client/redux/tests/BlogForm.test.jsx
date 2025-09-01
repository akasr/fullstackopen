import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../src/components/BlogForm'

test('calls the event handler passed as prop when the form is submitted', async () => {
  const setMessage = vi.fn()
  const setBlogs = vi.fn()
  const addBlog = vi.fn() // Event handler
  const user = userEvent.setup()

  render(<BlogForm setMessage={setMessage} setBlogs={setBlogs} addBlog={addBlog} />)

  const [titleInput, authorInput, urlInput] = screen.getAllByRole('textbox')
  const createBtn = await screen.findByText('create')

  await user.type(titleInput, 'Blog Title')
  await user.type(authorInput, 'Blog Author')
  await user.type(urlInput, 'https://blog.url')
  await user.click(createBtn)

  expect(addBlog.mock.calls).toHaveLength(1)
  console.log(addBlog.mock.calls)
  expect(addBlog.mock.calls[0][0]).toEqual({
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'https://blog.url',
  })
})
