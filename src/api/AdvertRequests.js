import axios from 'axios'


const API = axios.create({ baseURL: 'https://bdu-app-server-api.onrender.com' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getAllAdverts= ()=> API.get(`/adverts/getAll`);
export const deleteAdvert = (adId, userId) => API.delete(`/adverts/${adId}/${userId}/delete`);


