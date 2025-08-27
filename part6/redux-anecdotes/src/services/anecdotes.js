import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const voteAnecdote = async (id) => {
  const anecdoteToVote = (await axios.get(`${baseUrl}/${id}`)).data
  anecdoteToVote.votes++
  await axios.put(`${baseUrl}/${id}`, anecdoteToVote)
}

export default { getAll, createAnecdote, voteAnecdote }