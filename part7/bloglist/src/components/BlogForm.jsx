import React from "react";

const InputField = ({ label, value, onChange, placeholder, id }) => (
  <div>
    {label}:
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      id={id}
    />
  </div>
);

const BlogForm = ({
  title,
  author,
  url,
  titleChange,
  authorChange,
  urlChange,
  addBlog,
}) => (
  <div>
    <form onSubmit={addBlog}>
      <InputField
        label="title"
        value={title}
        onChange={titleChange}
        placeholder="title"
        id="title"
      />
      <InputField
        label="author"
        value={author}
        onChange={authorChange}
        placeholder="author"
        id="author"
      />
      <InputField
        label="url"
        value={url}
        onChange={urlChange}
        placeholder="url"
        id="url"
      />

      <button type="submit" id="create">
        create
      </button>
    </form>
  </div>
);

export default BlogForm;
