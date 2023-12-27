import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import Button from './components/Button'

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }
  return <div className={className}>{message}</div>
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [className, setClassName] = useState('')
  const [sortedBlogs, setSortedBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const loginFormRef = useRef()
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const sorted = [...blogs].sort((a, b) => b.likes - a.likes)
    setSortedBlogs(sorted)
  }, [blogs])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setClassName('error')
    }
  }

  const addBlog = async (event) => {
    blogFormRef.current.toggleVisibility()
    event.preventDefault()
    const newBlogObject = {
      title: title,
      author: author,
      url: url,
    }
    try {
      const createdBlog = await blogService.create(newBlogObject)
      setBlogs([...blogs, createdBlog])
      setTitle('')
      setAuthor('')
      setUrl('')
      setSortedBlogs([...sortedBlogs, createdBlog])
      setErrorMessage(`${title} by ${author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setClassName('success')
    } catch (error) {
      setErrorMessage('Cannot add Blog to the list')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setClassName('error')
    }
  }

  const updateLike = async (blog) => {
    console.log(blog)
    const blogToUpdate = { ...blog }
    const likes = blogToUpdate.likes + 1
    try {
      console.log('askakslaksl')
      const updatedBlog = await blogService.update(blog.id, {
        ...blogToUpdate,
        likes: likes,
      })
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      )
    } catch (error) {
      setErrorMessage('Cannot likes the blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setClassName('error')
    }
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id)
        const updatedSortedBlogs = sortedBlogs.filter((b) => b.id !== blog.id)
        setSortedBlogs(updatedSortedBlogs)
      } catch (error) {
        setErrorMessage('Could not delete the blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setClassName('error')
      }
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <Togglable buttonLabel="login" ref={loginFormRef}>
      <Notification message={errorMessage} className={className} />
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <div>
      <Togglable buttonLabel="New Note" ref={blogFormRef}>
        <BlogForm
          title={title}
          author={author}
          url={url}
          addBlog={addBlog}
          titleChange={({ target }) => setTitle(target.value)}
          authorChange={({ target }) => setAuthor(target.value)}
          urlChange={({ target }) => setUrl(target.value)}
        />
      </Togglable>
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>

      {!user && loginForm()}

      {user && (
        <div>
          <Notification message={errorMessage} className={className} />
          <p>
            {user.name} logged in <Button onClick={handleLogout} text="logout" />
          </p>
          <h1>Create New</h1>
          {blogForm()}
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              updateLike={updateLike}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
