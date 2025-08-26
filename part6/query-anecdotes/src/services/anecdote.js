import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
  const respone = await axios.get(baseUrl)
  return respone.data
}

const createAnecdote = async (anecdote) => {
  try {
    const response = await axios.post(baseUrl, anecdote)
    return response.data
  } catch (error) {
    throw error
  }
}

const voteAnecdote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return response.data
}

export { getAnecdotes, createAnecdote, voteAnecdote }