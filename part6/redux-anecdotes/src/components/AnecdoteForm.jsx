import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from './../reducers/anecdoteReducer';
import { setNotificationWithTimeout } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const [anecdoteInput, setAnecdoteInput] = useState('');
  const dispatch = useDispatch();

  const handleCreateAnecdote = (e) => {
    e.preventDefault();
    const trimmedAnecdote = anecdoteInput.trim();
    if (trimmedAnecdote) {
      dispatch(createAnecdote(trimmedAnecdote));
      dispatch(setNotificationWithTimeout(trimmedAnecdote, 5));
      setAnecdoteInput('');
    } else {
      console.log('Please enter a valid anecdote.');
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div>
          <input
            value={anecdoteInput}
            onChange={(e) => setAnecdoteInput(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;