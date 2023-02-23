import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (personObject) => {
  const request = axios.post(`${baseUrl}`, personObject);
  return request.then((response) => response.data);
};

const erase = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  console.log(request.then((response) => response.data));
  return request.then((response) => response.data);
};

export default { getAll, create, erase };