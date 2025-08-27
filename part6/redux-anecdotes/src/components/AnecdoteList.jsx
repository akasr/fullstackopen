import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteThunk, initializeAnecdotesThunk } from '../reducers/anecdoteReducer'
import { setNotificationThunk } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotesThunk())
  }, [])

  const { filter, anecdotes } = useSelector(state => state)
  const regex = new RegExp(filter, 'ig')
  const anecdotesToShow = anecdotes.filter(a => regex.test(a.content))

  const vote = (id, content) => {
    dispatch(voteThunk(id))
    dispatch(setNotificationThunk(`voted ${content}`, 10))
  }

  return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList