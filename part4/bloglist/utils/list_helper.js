const { blogsDifferentTotalLikes } = require('../tests/blogsLists')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length
    ? blogs.reduce(
      (maxm, curr) => (curr.likes > maxm.likes ? curr : maxm),
      blogs[0]
    )
    : {}
}

const mostBlogs = (blogs) => {
  if (!blogs.length) {
    return {}
  }

  const authors = blogs.reduce((acc, blog) => {
    if (Object.prototype.hasOwnProperty.call(acc, blog.author)) {
      acc[blog.author] += 1
    } else {
      acc[blog.author] = 1
    }
    return acc
  }, {})

  const authorWithMostBlogs = Object.keys(authors).reduce(
    (acc, curr) => (authors[curr] <= authors[acc] && acc ? acc : curr),
    ''
  )

  return {
    author: authorWithMostBlogs,
    blogs: authors[authorWithMostBlogs],
  }
}

const mostLikes = (blogs) => {
  if (!blogs.length) {
    return {}
  }

  const authors = blogs.reduce((acc, blog) => {
    if (Object.prototype.hasOwnProperty.call(acc, blog.author)) {
      acc[blog.author] += blog.likes
    } else {
      acc[blog.author] = blog.likes
    }
    return acc
  }, {})

  const authorWithMostLikes = Object.keys(authors).reduce(
    (acc, curr) => (authors[curr] <= authors[acc] && acc ? acc : curr),
    ''
  )

  return {
    author: authorWithMostLikes,
    likes: authors[authorWithMostLikes],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
