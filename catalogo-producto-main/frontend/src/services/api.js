import axios from 'axios';

// Para GitHub Codespaces - usa tu URL específica
const api = axios.create({
  baseURL: 'https://redesigned-acorn-jj4r6vgv4qjj25v97-5173.app.github.dev',
  withCredentials: true
});

export default api;