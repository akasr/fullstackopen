const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const {
  listWithOneBlog,
  blogs,
  blogsAllDifferentLikes,
  blogsSomeSameLikes,
  blogsDistinctAuthorCounts,
  blogsSomeSameAuthorCounts,
  blogsDifferentTotalLikes,
  blogsSomeSameTotalLikes,
} = require('./blogsLists')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  test('of empty list is an empty object', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, {})
  })

  test('when list has one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('of a bigger list with unique blogs is calculated right', () => {
    const result = listHelper.favoriteBlog(blogsAllDifferentLikes)
    assert.deepStrictEqual(result, {
      _id: '6',
      title: 'Blog 6',
      author: 'Author F',
      url: 'http://blog6.com',
      likes: 6,
      __v: 0,
    })
  })
  test('of a bigger list with more than one blogs with same blog likes is calculated right', () => {
    const result = listHelper.favoriteBlog(blogsSomeSameLikes)
    assert.deepStrictEqual(result, {
      _id: '11',
      title: 'Blog 11',
      author: 'Author E',
      url: 'http://blog11.com',
      likes: 5,
      __v: 0,
    })
  })
})

describe('author with most blogs', () => {
  test('of empty list is an empty object', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, {})
  })

  test('when list has one blog equals the author of that blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  test('of a bigger list with authors having distinct number of blogs', () => {
    const result = listHelper.mostBlogs(blogsDistinctAuthorCounts)
    assert.deepStrictEqual(result, {
      author: 'Author Z',
      blogs: 3,
    })
  })

  test('of a bigger list with few authors having same number of blogs', () => {
    const result = listHelper.mostBlogs(blogsSomeSameAuthorCounts)
    assert.deepStrictEqual(result, {
      author: 'Author M',
      blogs: 2,
    })
  })
})

describe('author with most likess', () => {
  test('of empty list is an empty object', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, {})
  })

  test('when list has one blog equals the author of that blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('of a bigger list with authors having distinct number of blogs', () => {
    const result = listHelper.mostLikes(blogsDifferentTotalLikes)
    assert.deepStrictEqual(result, {
      author: 'Author S',
      likes: 10,
    })
  })

  test('of a bigger list with few authors having same number of blogs', () => {
    const result = listHelper.mostLikes(blogsSomeSameTotalLikes)
    assert.deepStrictEqual(result, {
      author: 'Author U',
      likes: 5,
    })
  })
})
