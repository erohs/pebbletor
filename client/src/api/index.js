import axios from 'axios';

const url = 'https://pebbletor.herokuapp.com/hills';

export const fetchHills = () => axios.get(url);
export const fetchHill = (id) => axios.get(`${url}/${id}`);
export const createHill = (newHill) => axios.post(`${url}/add`, newHill);
export const updateHill = (id, updatedHill) => axios.post(`${url}/update/${id}`, updatedHill);
export const deleteHill = (id) => axios.delete(`${url}/${id}`);