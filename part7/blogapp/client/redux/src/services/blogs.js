import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const api = axios.create({
  baseURL: baseUrl,
})

api.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await api.get('/')
  return response.data
}

const create = async (blog) => {
  const response = await api.post('/', blog)
  return response.data
}

const update = async (blog) => {
  const response = await api.put(`/${blog.id}`, blog)
  return response.data
}

const remove = async (id) => {
  await api.delete(`/${id}`)
}

export default { getAll, create, setToken, update, remove }
