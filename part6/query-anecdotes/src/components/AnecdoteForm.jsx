import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdotes } from '../services/requests';
import { useNotification } from '../notificationContext';

const AnecdoteForm = () => {
  const [anecdoteText, setAnecdoteText] = useState('');
  const queryClient = useQueryClient();
  const notify = useNotification();

  const anecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['anecdotes']})
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (anecdoteText.trim().length >= 5) {
      anecdoteMutation.mutate({content: anecdoteText, votes:0, id:(100000 * Math.random()).toFixed(0)});
      notify(`${anecdoteText} added`);
      setAnecdoteText('');
    } else {
      notify("Anecdote is too short (min 5 characters).");
    }
  }

  return (
    <div>
      <h3>Create new:</h3>
      <form onSubmit={handleSubmit}>
        <input value={anecdoteText} onChange={(e) => setAnecdoteText(e.target.value)}/>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm;
