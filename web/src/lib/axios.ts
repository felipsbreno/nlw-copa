import axios from 'axios';

export const apiRequest = axios.create({
  baseURL: 'http://localhost:3333/',
});

export const axiosRequest = (path: string) => {
  const data = apiRequest.get(path);
  return data;
};
