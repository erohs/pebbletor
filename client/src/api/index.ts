import axios from 'axios';
import { IHill } from '../components/Hill/interfaces/IHill';
import { INewHill } from '../components/Hill/interfaces/INewHill';
import { IMarker } from '../components/Marker/interfaces/IMarker';
import { debounce } from '../util/HelperFunctions';

export const baseUrl = 'http://localhost:5000';
const hillUrl = `${baseUrl}/hills`;
const markerUrl = `${baseUrl}/markers`;

export const fetchHills = (page: number, limit: number) => axios.get(`${hillUrl}?page=${page}&limit=${limit}`);
export const fetchHill = (id: string) => axios.get(`${hillUrl}/${id}`);
export const createHill = (newHill: INewHill) => axios.post(hillUrl, newHill);
export const updateHill = (id: string, updatedHill: IHill) => axios.post(`${hillUrl}/${id}`, updatedHill);
export const deleteHill = (id: string) => axios.delete(`${hillUrl}/${id}`);

export const fetchHillMarkers = (hillId: string) => axios.get(`${markerUrl}/hill/${hillId}`);
export const fetchMarker = (id: string) => axios.get(`${markerUrl}/${id}`);
export const createMarker = (newMarker: FormData) => axios.post(markerUrl, newMarker);
export const updateMarker = (id: string, updatedMarker: FormData) => axios.post(`${markerUrl}/${id}`, updatedMarker);
export const deleteMarker = (id: string) => axios.delete(`${markerUrl}/${id}`);
export const debounceUpdateMarker = debounce((id: string, updatedMarker: IMarker) => {
    axios.post(`${markerUrl}/${id}`, updatedMarker);
}, 200);
