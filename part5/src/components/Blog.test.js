import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'
import BlogForm from './BlogForm'

describe('Blog Component', () => {
  const blog = {
    title: 'Testing Blog',
    author: 'Test Author',
    url: 'https://example.com',
    likes: 10,
  }

  test('initially displays only title and author, not URL or likes', () => {
    render(<Blog blog={blog} />)

    expect(screen.getByText('Testing Blog Test Author')).toBeDefined()
    expect(screen.queryByText('https://example.com')).not.toBeInTheDocument()
    expect(screen.queryByText('10')).not.toBeInTheDocument()
  })

  test('displays URL and likes after "Show Details" is clicked', async () => {
    render(<Blog blog={blog} />)
    const user = userEvent.setup()
    await user.click(screen.getByText('Show Details'))

    expect(screen.getByText('https://example.com')).toBeInTheDocument()
    expect(screen.getByText('10', { exact: false })).toBeInTheDocument()
  })

  test('calls like button handler twice when clicked twice', async () => {
    const mockUpdateLike = jest.fn()
    render(<Blog blog={blog} updateLike={mockUpdateLike} />)
    const user = userEvent.setup()

    await user.click(screen.getByText('Show Details'))
    await user.click(screen.getByText('like'))
    await user.click(screen.getByText('like'))

    expect(mockUpdateLike).toHaveBeenCalledTimes(2)
  })
})

describe('BlogForm Component', () => {
  test('triggers addBlog event with correct data on form submission', async () => {
    const addBlog = jest.fn()
    render(<BlogForm title="" author="" url="" titleChange={() => {}} authorChange={() => {}} urlChange={() => {}} addBlog={addBlog} />)

    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText('title'), 'Test Blog Title')
    await user.type(screen.getByPlaceholderText('author'), 'Test Author')
    await user.type(screen.getByPlaceholderText('url'), 'https://example.com')
    await user.click(screen.getByText('create'))

    expect(addBlog).toHaveBeenCalledTimes(1)
  })
})
