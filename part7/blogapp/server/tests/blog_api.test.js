const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let token = null

beforeEach(async () => {
  await User.deleteMany({})
  const user = new User({
    username: 'testuser',
    name: 'Test User',
    passwordHash: await bcrypt.hash('password123', 10),
  })
  const savedUser = await user.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'password123' })

  token = loginResponse.body.token

  await Blog.deleteMany({})
  const blogsWithUser = helper.initialBlogs.map((blog) => ({
    ...blog,
    user: savedUser._id,
  }))
  await Blog.insertMany(blogsWithUser)
})

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blogs have unique identifier named id', async () => {
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)

    const ids = response.body.map((blog) => {
      assert.ok(Object.prototype.hasOwnProperty.call(blog, 'id'))
      return blog.id
    })

    const idSet = new Set(ids)
    assert.strictEqual(idSet.size, ids.length)
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((blog) => blog.title)
    assert(titles.includes('Canonical string reduction'))
  })

  test('defaults likes to 0 if not provided', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
  })

  test('fails with status code 400 if title is missing', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })

  test('fails with status code 400 if url is missing', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })

  test('fails with status code 401 if token is not provided', async () => {
    const newBlog = {
      title: 'Unauthorized Blog',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map((b) => b.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('when there is intially users in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('passw', 10)
    const user = new User({
      username: 'root',
      name: 'Superuser',
      passwordHash,
    })

    await user.save()
  })

  describe('addition of a new user', () => {
    test('succeeds with a valid username and password', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'akasr',
        name: 'Akash Raj Roshini',
        password: 'password123',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
      const usernames = usersAtEnd.map((user) => user.username)
      assert(usernames.includes(newUser.username))
    })

    test('fails with status code 400 if username is already used', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Anonymous',
        password: 'password',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      assert(result.body.error.includes('must be unique'))
    })

    test('fails with status code 400 if username is too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'ak',
        name: 'Akash',
        password: 'password123',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)

      assert(result.body.error.includes('at least 3 characters'))
    })

    test('fails with status code 400 if password is too short', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'akash',
        name: 'Akash Raj Roshini',
        password: 'pw',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)

      assert(result.body.error.includes('at least 3 characters'))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
