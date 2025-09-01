import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'

describe('<Blog />', () => {
  let container
  const deleteBlog = vi.fn()
  const incrementLikes = vi.fn()
  const blog = {
    title: 'Undefined',
    author: '404',
    likes: 69,
    user: {
      name: 'Internal Error',
      username: '500',
      id: 'gibeyr8f478fg390docdojc',
    },
  }

  beforeEach(() => {
    container = render(
      <Blog deleteBlog={deleteBlog} incrementLikes={incrementLikes} blog={blog} user={blog.user} />,
    ).container
  })

  test("renders blog's title and author", async () => {
    await screen.findByText('Undefined 404')
  })

  test('does not render number of likes and url by default', () => {
    const div = container.querySelector('.invisibleByDefault')
    expect(div).toHaveStyle('display: none')
  })

  test('clicking the view button renders the likes and URL', async () => {
    const user = userEvent.setup()
    const button = await screen.findByText('view')
    await user.click(button)

    const div = container.querySelector('.invisibleByDefault')
    expect(div).not.toHaveStyle('display: none')
  })

  test('double clicking the like button calls the event handle twice', async () => {
    const user = userEvent.setup()
    const button = await screen.findByText('like')
    await user.dblClick(button)

    expect(incrementLikes.mock.calls).toHaveLength(2)
  })
})
