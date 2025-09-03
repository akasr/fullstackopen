const express = require('express')
const blogRouter = express.Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blog = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(request.user)
  if (!user) {
    return response.status(404).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    ...body,
    author: body.author || user.name,
    user: user._id,
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  const user = await User.findById(request.user)
  if (!user) {
    return response.status(404).json({ error: 'user not found' })
  }

  if (blog.user.toString() !== user.id) {
    return response
      .status(401)
      .json({ error: 'unauthorized to delete this blog' })
  }
  user.blogs = user.blogs.filter((b) => b.toString() !== request.params.id)
  await user.save()

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true }
  )

  response.json(updatedBlog)
})

blogRouter.put('/:id/comments', express.json(), async (request, response) => {
  const { comment } = request.body || {}
  const commentText = typeof comment === 'string' ? comment.trim() : ''

  if (!commentText) {
    return response
      .status(400)
      .json({ error: 'comment must be a non-empty string' })
  }

  const updated = await Blog.findByIdAndUpdate(
    request.params.id,
    { $push: { comments: commentText } },
    { new: true, runValidators: true }
  )

  if (!updated) {
    return response.status(404).json({ error: 'blog not found' })
  }

  response.status(200).json(updated)
})

module.exports = blogRouter
