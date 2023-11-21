const _ = require("lodash")

const dummy = (blogs) => { return  1 }

const totalLikes = (blogs) => { return blogs.reduce((sum, blog) => sum + blog.likes, 0) }

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    let favorite = blogs[0]
    for (const blog of blogs) {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    }
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    const blogCounts = _.countBy(blogs, 'author')
    let maxBlogs = 0
    let mostActiveAuthor = ''
    Object.entries(blogCounts).forEach(([author, count]) => {
        if (count > maxBlogs) {
            maxBlogs = count
            mostActiveAuthor = author
        }
    })
    return {
        author: mostActiveAuthor,
        blogs: maxBlogs
    }
}

const mostLikes = (blogs) => {
    const authorLikes = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes
        return acc
    }, {})
    let maxLikes = 0
    let mostLikedAuthor = ''
    for (const author in authorLikes) {
        if (authorLikes[author] > maxLikes) {
            maxLikes = authorLikes[author]
            mostLikedAuthor = author
        }
    }
    return {
        author: mostLikedAuthor,
        likes: maxLikes
    }
}

const reverse = (string) => {
  return string.split('').reverse().join('')
}

const average = array => {
  const reducer = (sum, item) => { return sum + item }
  return array.length === 0 ? 0 : array.reduce(reducer, 0) / array.length
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
	average,
	reverse
}