import React from 'react'

const BlogForm = ({ title, author, url, titleChange, authorChange, urlChange, addBlog }) => (
  <div className="blog-form">
    <form onSubmit={addBlog}>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={title}
          onChange={titleChange}
          placeholder="Enter title"
          id="title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          value={author}
          onChange={authorChange}
          placeholder="Enter author"
          id="author"
        />
      </div>
      <div className="form-group">
        <label htmlFor="url">URL:</label>
        <input
          type="url"
          value={url}
          onChange={urlChange}
          placeholder="Enter URL"
          id="url"
        />
      </div>

      <button type="submit" id="create" className="btn btn-primary">
        Create
      </button>
    </form>
  </div>
)

export default BlogForm
