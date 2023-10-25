import axios from 'axios'

const baseUrl = '/api/persons'

const getAllPerson = () => { return axios.get(baseUrl) }

const addPerson = data => { return axios.post(baseUrl, data) }

const updatePerson = (id, data) => { return axios.put(`${baseUrl}/${id}`, data) }

const deletePerson = (id) => { return axios.delete(`${baseUrl}/${id}`) }

const personService = {
  getAllPerson,
  addPerson,
  updatePerson,
  deletePerson
}

export default personService