const express = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const router = express.Router()

const authenticateUser = (request, response, next) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  blog ? res.json(blog) : res.status(404).end()
})

router.post('/', authenticateUser, async (req, res) => {
  const { title, author, url, likes = 0 } = req.body
  if (!title || !url) {
    return res.status(400).end()
  }
  const blog = new Blog({ title, author, url, likes, user: req.user.id })
  const savedBlog = await blog.save()
  req.user.blogs = req.user.blogs.concat(savedBlog._id)
  await req.user.save()
  res.status(201).json(savedBlog)
})

router.delete('/:id', authenticateUser, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog && blog.user.toString() === req.user.id) {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } else {
    res.status(401).json({ error: 'Unauthorized to delete the blog' })
  }
})

router.put('/:id', async (req, res) => {
  const { title, author, url, likes = 0 } = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { title, author, url, likes },
    { new: true }
  )
  res.json(updatedBlog)
})

module.exports = router
