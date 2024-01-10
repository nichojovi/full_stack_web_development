import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotificationWithTimeout } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const filter = useSelector(state => state.filter.toLowerCase());
  const dispatch = useDispatch();

  const getFilteredAndSortedAnecdotes = () => {
    return anecdotes
      .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
      .sort((a, b) => b.votes - a.votes);
  };

  const filteredAnecdotes = getFilteredAndSortedAnecdotes();

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotificationWithTimeout(`You voted for '${anecdote.content}'`, 5));
  };

  return (
    <div>
      {filteredAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;