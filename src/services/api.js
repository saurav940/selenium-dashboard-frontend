import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Get allowed projects
export const fetchProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

// ✅ Get test cases for selected project
export const fetchTestCases = async (project) => {
  const response = await api.get(`/testcases?project=${encodeURIComponent(project)}`);
  return response.data;
};

// ✅ Get browser(s) for selected project
export const fetchBrowsers = async (project) => {
  const response = await api.get(`/browser?project=${encodeURIComponent(project)}`);
  return response.data;
};

// ✅ Start test with selected project, test case, and browser
export const startTest = async ({ project, testCase, browser }) => {
  const response = await api.post('/start-test', {
    project,
    testCase,
    browser,
  });
  return response.data;
};

export default api;
