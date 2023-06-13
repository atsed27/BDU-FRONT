import axios from 'axios'


const API = axios.create({ baseURL: 'https://bdu-app-server-api.onrender.com' });

export const createChat = (data) => API.post('/chat/new', data);

export const userChats = (id) => API.get(`/chat/${id}`);

export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);

export const getAllChats = () => API.get('/chat/');
