import axios from 'axios'


const API = axios.create({ baseURL: 'https://bdu-app-server-api.onrender.com'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getAllLostAndFound = () => API.get(`/lostAndFounds/getAll`);
export const updateLostAndFound = (lfId, updatedData) => API.put(`/lostAndFounds/${lfId}/update`, updatedData);
export const deleteLostAndFound = (lfId, userId) => API.delete(`/lostAndFounds/${lfId}/${userId}/delete`);


