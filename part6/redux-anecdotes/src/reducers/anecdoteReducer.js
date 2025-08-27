import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      anecdoteToVote.votes++
      state.sort((a, b) => b.votes - a.votes)
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote: voteAction, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotesThunk = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdoteThunk = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createAnecdote({ content, votes: 0})
    dispatch(createAnecdote(anecdote))
  }
}

export const voteThunk = (id) => {
  return async (dispatch) => {
    await anecdoteService.voteAnecdote(id)
    dispatch(voteAction(id))
  }
}

export default anecdoteSlice.reducer