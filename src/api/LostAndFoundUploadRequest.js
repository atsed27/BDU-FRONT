import axios from "axios";

const API = axios.create({ baseURL:'https://bdu-app-server-api.onrender.com'});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const uploadLostAndFoundImage = (data) => API.post("/uploadLostAndFoundPhoto/", data);
export const uploadLostAndFoundPost = (data) => API.post("/lostAndFounds/create",data);
