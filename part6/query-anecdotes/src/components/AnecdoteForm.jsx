import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../services/anecdote"
import { useContext } from "react"
import { NotificationContext } from "./NotificationContextProvider"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, dispatchNotification] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      const timer = setTimeout(() => dispatchNotification({type: "CLEAR"}), 5000)
      dispatchNotification({ type: "SET", payload: { notification: `Created ${data.content}`, timer}})
    },
    onError: (error) => {
      const timer = setTimeout(() => dispatchNotification({type: "CLEAR"}), 5000)
      dispatchNotification({ type: "SET", payload: { notification: `Error: ${error.response?.data?.error || error.message}`, timer}})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
