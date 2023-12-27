import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getConfig = () => ({
  headers: { Authorization: token },
})

const handleResponse = response => response.data
const catchError = error => {
  console.error('Error in network request:', error.message)
  throw error
}

const getAll = () => {
  return axios.get(baseUrl).then(handleResponse).catch(catchError)
}

const create = async newObject => {
  try {
    const response = await axios.post(baseUrl, newObject, getConfig())
    return handleResponse(response)
  } catch (error) {
    catchError(error)
  }
}

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return handleResponse(response)
  } catch (error) {
    catchError(error)
  }
}

const remove = async id => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
    return handleResponse(response)
  } catch (error) {
    catchError(error)
  }
}

export default { getAll, create, update, remove, setToken }
