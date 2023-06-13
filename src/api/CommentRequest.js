import axios from 'axios'


const API = axios.create({ baseURL: 'https://bdu-app-server-api.onrender.com' });

export const createComment = (postId,data) => API.post(`/comment/${postId}/create`, data);
export const updateComment = (comId, data) => API.put(`/comment/${comId}/update`, data);
export const deleteComment = (comId, userId) => API.delete(`/comment/${comId}/${userId}/delete`)
export const getAllComments = () => API.get('comment/getAll');