import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Servicios para cada entidad
export const personajeService = {
  getAll: () => api.get('/personajes'),
  getById: (id) => api.get(`/personajes/${id}`),
  create: (data) => api.post('/personajes', data),
  update: (id, data) => api.put(`/personajes/${id}`, data),
  delete: (id) => api.delete(`/personajes/${id}`),
  restore: (id) => api.put(`/personajes/${id}/restaurar`),
  getDeleted: () => api.get('/personajes/eliminados'),
  searchByName: (nombre) => api.get(`/personajes/buscar/nombre?nombre=${nombre}`),
  getByRaza: (razaId) => api.get(`/personajes/buscar/raza/${razaId}`),
  getByPlaneta: (planetaId) => api.get(`/personajes/buscar/planeta/${planetaId}`),
  getByPower: (nivelPoder) => api.get(`/personajes/buscar/poder?nivelPoder=${nivelPoder}`),
  getByAfiliacion: (afiliacion) => api.get(`/personajes/buscar/afiliacion?afiliacion=${afiliacion}`),
  getOrderedByPower: () => api.get('/personajes/ordenados-por-poder'),
};

export const razaService = {
  getAll: () => api.get('/razas'),
  getById: (id) => api.get(`/razas/${id}`),
  create: (data) => api.post('/razas', data),
  update: (id, data) => api.put(`/razas/${id}`, data),
  delete: (id) => api.delete(`/razas/${id}`),
  search: (nombre) => api.get(`/razas/buscar?nombre=${nombre}`),
};

export const planetaService = {
  getAll: () => api.get('/planetas'),
  getById: (id) => api.get(`/planetas/${id}`),
  create: (data) => api.post('/planetas', data),
  update: (id, data) => api.put(`/planetas/${id}`, data),
  delete: (id) => api.delete(`/planetas/${id}`),
  searchByName: (nombre) => api.get(`/planetas/buscar/nombre?nombre=${nombre}`),
  searchBySystem: (sistema) => api.get(`/planetas/buscar/sistema?sistema=${sistema}`),
};

export const sagaService = {
  getAll: () => api.get('/sagas'),
  getById: (id) => api.get(`/sagas/${id}`),
  create: (data) => api.post('/sagas', data),
  update: (id, data) => api.put(`/sagas/${id}`, data),
  delete: (id) => api.delete(`/sagas/${id}`),
  search: (nombre) => api.get(`/sagas/buscar?nombre=${nombre}`),
};

export const tecnicaService = {
  getAll: () => api.get('/tecnicas'),
  getById: (id) => api.get(`/tecnicas/${id}`),
  create: (data) => api.post('/tecnicas', data),
  update: (id, data) => api.put(`/tecnicas/${id}`, data),
  delete: (id) => api.delete(`/tecnicas/${id}`),
  searchByName: (nombre) => api.get(`/tecnicas/buscar/nombre?nombre=${nombre}`),
  searchByType: (tipo) => api.get(`/tecnicas/buscar/tipo?tipo=${tipo}`),
};

export const transformacionService = {
  getAll: () => api.get('/transformaciones'),
  getById: (id) => api.get(`/transformaciones/${id}`),
  create: (data) => api.post('/transformaciones', data),
  update: (id, data) => api.put(`/transformaciones/${id}`, data),
  delete: (id) => api.delete(`/transformaciones/${id}`),
  search: (nombre) => api.get(`/transformaciones/buscar?nombre=${nombre}`),
};

export const batallaService = {
  getAll: () => api.get('/batallas'),
  getById: (id) => api.get(`/batallas/${id}`),
  create: (data) => api.post('/batallas', data),
  update: (id, data) => api.put(`/batallas/${id}`, data),
  delete: (id) => api.delete(`/batallas/${id}`),
  searchByName: (nombre) => api.get(`/batallas/buscar/nombre?nombre=${nombre}`),
  getBySaga: (sagaId) => api.get(`/batallas/buscar/saga/${sagaId}`),
  searchByLocation: (ubicacion) => api.get(`/batallas/buscar/ubicacion?ubicacion=${ubicacion}`),
};

export default api;