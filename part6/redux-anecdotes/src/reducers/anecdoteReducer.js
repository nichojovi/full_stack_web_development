import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import anecdoteService from './../services/anecdotes';

export const voteAnecdote = createAsyncThunk(
  'anecdotes/voteAnecdote',
  async (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const response = await anecdoteService.update(anecdote.id, updatedAnecdote);
    return response;
  }
);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(_, action) {
      return action.payload;
    },
  },
  extraReducers: {
    [voteAnecdote.fulfilled]: (state, action) => {
      const updatedAnecdote = action.payload;
      const index = state.findIndex(a => a.id === updatedAnecdote.id);
      if (index !== -1) {
        state[index] = updatedAnecdote;
      }
    },
  },
});

export const { addAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch(addAnecdote(newAnecdote));
  }
}

export default anecdoteSlice.reducer;
