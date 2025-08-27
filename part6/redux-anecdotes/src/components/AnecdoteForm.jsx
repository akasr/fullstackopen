import { useDispatch } from 'react-redux'
import { createAnecdoteThunk } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value
    dispatch(createAnecdoteThunk(content))
    event.target.anecdote.value = ''

    dispatch(setNotification(`created ${content}`, 10))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm;