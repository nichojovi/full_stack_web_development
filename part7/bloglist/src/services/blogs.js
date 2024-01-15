import axios from "axios";

const url = "http://localhost:3001/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const response = await axios.post(url, newObject, {
    headers: { Authorization: token },
  });
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${url}/${id}`, newObject);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${url}/${id}`, {
    headers: { Authorization: token },
  });
  return response.data;
};

export default { getAll, create, update, remove, setToken };
