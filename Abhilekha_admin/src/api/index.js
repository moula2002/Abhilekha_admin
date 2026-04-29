import axios from 'axios';

const API = axios.create({
  baseURL: 'https://abhilekha-admin.onrender.com/api',
});

// Add a request interceptor to include the JWT token
API.interceptors.request.use((config) => {
  const adminInfo = localStorage.getItem('adminInfo');
  if (adminInfo) {
    const { token } = JSON.parse(adminInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (formData) => API.post('/auth/login', formData);
export const fetchClients = () => API.get('/clients');
export const fetchJobs = () => API.get('/jobs');
export const createClient = (clientData) => API.post('/clients', clientData);
export const updateClient = (id, clientData) => API.put(`/clients/${id}`, clientData);
export const deleteClient = (id) => API.delete(`/clients/${id}`);
export const createJob = (jobData) => API.post('/jobs', jobData);
export const updateJob = (id, jobData) => API.put(`/jobs/${id}`, jobData);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);




export default API;
