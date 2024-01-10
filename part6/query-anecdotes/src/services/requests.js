import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(url).then(res => res.data)

export const createAnecdotes = newAnecdote =>
  axios.post(url, newAnecdote).then(res => res.data)

export const updateAnecdotes = updatedAnecdote => 
  axios.put(`${url}/${updatedAnecdote.id}`, updatedAnecdote).then (res => res.data)