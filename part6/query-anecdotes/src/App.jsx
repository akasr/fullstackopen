import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { getAnecdotes, voteAnecdote } from './services/anecdote'
import { NotificationContext } from './components/NotificationContextProvider'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, dispatchNotification] = useContext(NotificationContext)

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      const timer = setTimeout(() => dispatchNotification({type: "CLEAR"}), 5000)
      dispatchNotification({ type: "SET", payload: { notification: `Voted ${data.content}`, timer}})
    }
  })

  const handleVote = (anecdote) => {
    const anecdoteVoted = {...anecdote, votes: anecdote.votes + 1}
    voteAnecdoteMutation.mutate(anecdoteVoted)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(result)

  if(result.isLoading) {
    return <div>Loading Data...</div>
  }
  if(result.isError) {
    return <div>anecdote service not available due to problem in server</div>
  }
  const anecdotes = result.data 


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
