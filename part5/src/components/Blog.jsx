import { useState } from 'react'
import Button from './Button'

const Blog = ({ blog, user, updateLike, deleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetails = () => setDetailsVisible(!detailsVisible)

  const isOwnedByUser = blog.user && blog.user.username === user.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog' style={blogStyle}>
      <p>
        {blog.title} {blog.author}
        <Button onClick={toggleDetails} id='showDetails' text={detailsVisible ? 'Hide Details' : 'Show Details'} />
      </p>
      {detailsVisible && (
        <div>
          <p><a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
          <div>
            likes: {blog.likes}
            <Button text='like' id='likes' onClick={() => updateLike(blog)} />
          </div>
          {isOwnedByUser && <Button text='remove' id='remove' onClick={() => deleteBlog(blog)} />}
        </div>
      )}
    </div>
  )
}

export default Blog
