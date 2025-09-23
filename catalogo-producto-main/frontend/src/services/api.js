import axios from 'axios';

// Usar URL relativa - Codespaces manejará el proxy automáticamente
const api = axios.create({
  baseURL: '/api',  // ← URL relativa
  withCredentials: true
});

export default api;