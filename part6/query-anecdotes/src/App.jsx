import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdotes } from './services/requests'
import { useNotification } from './notificationContext'

const App = () => {
  const queryClient = useQueryClient();
  const notify = useNotification();

  const voteMutation = useMutation({
    mutationFn: updateAnecdotes,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['anecdotes']})
  });

  const onVote = (anecdote) => {
    voteMutation.mutate({...anecdote, votes: anecdote.votes + 1});
    notify(`${anecdote.content} voted`);
  };

  const anecdotesQuery = useQuery({   
     queryKey: ['anecdotes'],    
     queryFn: getAnecdotes,
     retry: 3
  });  
  console.log(JSON.parse(JSON.stringify(anecdotesQuery)));

  if (anecdotesQuery.isLoading) {    
    return <div>Loading...</div>;  
  }

  const anecdotes = anecdotesQuery.data;

  return anecdotes ? (
    <div>
      <h1>Anecdote App</h1>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} 
            <button onClick={() => onVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p>Service is unavailable because of server issue.</p>
  );
}

export default App;
