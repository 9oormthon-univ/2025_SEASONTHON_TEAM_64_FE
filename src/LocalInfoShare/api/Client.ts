// src/LocalInfoShare/api/Client.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.planhub.site",
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
