import axios from 'axios';

const rawUrl = import.meta.env.VITE_API_URL || 'https://backend-production-c382.up.railway.app';
const sanitizedUrl = rawUrl.trim().replace(/\/+$/, '');
export const API_BASE_URL = sanitizedUrl.endsWith('/api') ? sanitizedUrl : `${sanitizedUrl}/api`;

// Route prefixes as actually mounted in the backend's server.js:
//   app.use('/api/user', require('./routes/userRoutes'))
//   app.use('/api/todo', require('./routes/todoRoutes'))
export const USER_PREFIX = '/user';
export const TODO_PREFIX = '/todo';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Normalizes backend errors into a single friendly message string,
// while preserving the original error object for callers.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let friendlyMessage = 'Something went wrong. Please try again.';

    if (error.response?.data?.message) {
      friendlyMessage = error.response.data.message;
    } else if (error.response?.data?.error) {
      friendlyMessage = error.response.data.error;
    } else if (error.code === 'ERR_NETWORK' || !error.response) {
      friendlyMessage = 'Unable to connect to backend server. Please verify VITE_API_URL in your hosting platform environment settings and ensure backend is running.';
    } else if (error.response?.status === 404) {
      friendlyMessage = error.response?.data?.message || 'Requested endpoint not found (404).';
    } else if (error.response?.status >= 500) {
      friendlyMessage = 'Internal Server Error. Please check backend server logs.';
    }

    error.friendlyMessage = friendlyMessage;
    return Promise.reject(error);
  }
);

export default api;

