import axios from 'axios'


const API = axios.create({ baseURL: 'https://bdu-app-server-api.onrender.com' });

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessage = (data) => API.post('/message/', data);