import axios from "axios";

const API = axios.create({ baseURL: 'https://bdu-app-server-api.onrender.com' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const uploadAdvertImage = (data) => API.post("/uploadAdvertPhoto/", data);
export const uploadAdvertPost = (data) => API.post("/adverts/create",data);
export const updateAdvert = (adId, data)=> API.put(`/adverts/${adId}/update`, data);
