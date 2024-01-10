import axios from 'axios';

const url = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

const createNew = async content => {
  const anecdote = { content, votes: 0, id:(100000 * Math.random()).toFixed(0)};
  const response = await axios.post(url, anecdote);
  return response.data;
};

const update = async (id, updatedAnecdote) => {
  const response = await axios.put(`${url}/${id}`, updatedAnecdote);
  return response.data;
};

export default { getAll, createNew, update };
