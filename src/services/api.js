import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const fetchTestCases = async (project) => {
  const response = await api.get(`/testcases?project=${encodeURIComponent(project)}`);
  return response.data;
};

export default api;