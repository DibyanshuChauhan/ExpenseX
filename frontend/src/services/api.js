// Centralized API client syncing with backend forward proxy

// Get JWT token from storage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const errorMsg = data.message || `Request failed with status ${res.status}`;
    const error = new Error(errorMsg);
    error.data = data;
    throw error;
  }
  return data;
};

export const api = {
  // Auth & User Management
  auth: {
    login: (username, password) =>
      fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      }).then(handleResponse),

    register: (username, password) =>
      fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      }).then(handleResponse),

    forgotPassword: (username) =>
      fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      }).then(handleResponse),

    changePassword: (username, currentPassword, newPassword) =>
      fetch('/api/auth/change-password', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ username, currentPassword, newPassword }),
      }).then(handleResponse),

    getUsers: () =>
      fetch('/api/auth/users', {
        headers: getAuthHeaders(),
      }).then(handleResponse),

    createUser: (username, password, isAdmin) =>
      fetch('/api/auth/users', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ username, password, isAdmin }),
      }).then(handleResponse),

    deleteUser: (username) =>
      fetch(`/api/auth/users/${encodeURIComponent(username)}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }).then(handleResponse),
  },

  // Expenses & Budget
  expenses: {
    getByUser: (username) =>
      fetch(`/api/expenses?username=${encodeURIComponent(username)}`, {
        headers: getAuthHeaders(),
      }).then(handleResponse),

    add: (expenseData) =>
      fetch('/api/expenses', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(expenseData),
      }).then(handleResponse),

    delete: (id) =>
      fetch(`/api/expenses/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }).then(handleResponse),

    reset: (username) =>
      fetch('/api/expenses/reset', {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({ username }),
      }).then(handleResponse),

    getAllGrouped: () =>
      fetch('/api/expenses/all-grouped', {
        headers: getAuthHeaders(),
      }).then(handleResponse),

    getBudget: (username) =>
      fetch(`/api/expenses/budget?username=${encodeURIComponent(username)}`, {
        headers: getAuthHeaders(),
      }).then(handleResponse),

    setBudget: (username, budget) =>
      fetch('/api/expenses/budget', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ username, budget }),
      }).then(handleResponse),
  },

  // Feedback
  feedback: {
    getAll: () =>
      fetch('/api/feedback', {
        headers: getAuthHeaders(),
      }).then(handleResponse),

    send: (username, feedback) =>
      fetch('/api/feedback', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ username, feedback }),
      }).then(handleResponse),

    delete: (id) =>
      fetch(`/api/feedback/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }).then(handleResponse),

    clearAll: () =>
      fetch('/api/feedback/all', {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }).then(handleResponse),
  },
};
