import { useState, useEffect, useRef } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";

import LoginForm from "./components/Login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Blog from "./components/Blog";
import Button from "./components/Button";

import "./index.css";

const Notification = ({ message, className }) => {
  return message && <div className={className}>{message}</div>;
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    className: "",
  });
  const [user, setUser] = useState(null);
  const [loginFormState, setLoginFormState] = useState({
    username: "",
    password: "",
  });
  const [blogFormState, setBlogFormState] = useState({
    title: "",
    author: "",
    url: "",
  });

  const loginFormRef = useRef();
  const blogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      const initialBlogs = await blogService.getAll();
      setBlogs(sortBlogsByLikes(initialBlogs));
    };

    fetchBlogs();
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  };

  const sortBlogsByLikes = (blogs) => {
    return [...blogs].sort((a, b) => b.likes - a.likes);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(loginFormState);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setLoginFormState({ username: "", password: "" });
      setNotification({
        message: "Logged in successfully",
        className: "success",
      });
    } catch (exception) {
      showNotification("Wrong credentials", "error");
    }
  };

  const addBlog = async (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    try {
      const createdBlog = await blogService.create(blogFormState);
      const newBlogs = [...blogs, createdBlog];
      setBlogs(sortBlogsByLikes(newBlogs));
      setBlogFormState({ title: "", author: "", url: "" });
      showNotification(
        `${blogFormState.title} by ${blogFormState.author} added`,
        "success",
      );
    } catch (error) {
      showNotification("Cannot add Blog to the list", "error");
    }
  };

  const updateLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      });
      setBlogs(
        sortBlogsByLikes(
          blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
        ),
      );
    } catch (error) {
      showNotification("Cannot like the blog", "error");
    }
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id);
        setBlogs(sortBlogsByLikes(blogs.filter((b) => b.id !== blog.id)));
        showNotification("Blog removed successfully", "success");
      } catch (error) {
        showNotification("Could not delete the blog", "error");
      }
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const showNotification = (message, className) => {
    setNotification({ message, className });
    setTimeout(() => setNotification({ message: "", className: "" }), 5000);
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const loginForm = () => (
    <Togglable buttonLabel="login" ref={loginFormRef}>
      <Notification
        message={notification.message}
        className={notification.className}
      />
      <LoginForm
        username={loginFormState.username}
        password={loginFormState.password}
        handleUsernameChange={handleChange((username) =>
          setLoginFormState({ ...loginFormState, username }),
        )}
        handlePasswordChange={handleChange((password) =>
          setLoginFormState({ ...loginFormState, password }),
        )}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const blogForm = () => (
    <Togglable buttonLabel="New Note" ref={blogFormRef}>
      <BlogForm
        {...blogFormState}
        addBlog={addBlog}
        titleChange={handleChange((title) =>
          setBlogFormState({ ...blogFormState, title }),
        )}
        authorChange={handleChange((author) =>
          setBlogFormState({ ...blogFormState, author }),
        )}
        urlChange={handleChange((url) =>
          setBlogFormState({ ...blogFormState, url }),
        )}
      />
    </Togglable>
  );

  return (
    <div>
      <h1>Blogs</h1>
      {!user && loginForm()}
      {user && (
        <div>
          <Notification
            message={notification.message}
            className={notification.className}
          />
          <p>
            {user.name} logged in{" "}
            <Button onClick={handleLogout} text="logout" />
          </p>
          <h1>Create New</h1>
          {blogForm()}
          {blogs.map((blog) => (
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
  );
};

export default App;
