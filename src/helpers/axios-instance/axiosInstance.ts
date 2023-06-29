import { RootState, store } from '@/infrastructure/store/store';
import axios, { InternalAxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_PORTAL_API_BASE_URL;

const API = axios.create({
  baseURL: `${BASE_URL}`,
});

API.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const token = store.getState() as RootState;
  if (token) {
    config.headers.Authorization = `Bearer ${token.auth.token}`;
    return config;
  } else {
    return config;
  }
});
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  },
);

export default API;
