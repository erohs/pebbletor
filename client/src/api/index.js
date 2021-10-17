import axios from 'axios';

const debounce = (func, timeout) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), timeout);
    };
}

const baseUrl = 'http://localhost:5000';
const hillUrl = `${baseUrl}/hills`;
const markerUrl = `${baseUrl}/markers`;

export const fetchHills = () => axios.get(hillUrl);
export const fetchHill = (id) => axios.get(`${hillUrl}/${id}`);
export const createHill = (newHill) => axios.post(hillUrl, newHill);
export const updateHill = (id, updatedHill) => axios.post(`${hillUrl}/${id}`, updatedHill);
export const deleteHill = (id) => axios.delete(`${hillUrl}/${id}`);

export const fetchHillMarkers = (hillId) => axios.get(`${markerUrl}/hill/${hillId}`);
export const fetchMarker = (id) => axios.get(`${markerUrl}/${id}`);
export const createMarker = (newMarker) => axios.post(markerUrl, newMarker);
export const updateMarker = (id, updatedMarker) => axios.post(`${markerUrl}/${id}`, updatedMarker);
export const deleteMarker = (id) => axios.delete(`${markerUrl}/${id}`);
export const debounceUpdateMarker = debounce((id, updatedMarker) => {
    axios.post(`${markerUrl}/${id}`, updatedMarker);
}, 200);
