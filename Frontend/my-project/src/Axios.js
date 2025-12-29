import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL1 ,
  withCredentials: true, // needed if your backend sets cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
