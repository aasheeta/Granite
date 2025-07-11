import axios from 'axios';

// Update this to your actual server URL
const BASE_URL = 'http://localhost:3001'; // Change this to your server URL

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = global.authToken; // We'll store token globally for mobile
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      global.authToken = null;
      // Navigate to login screen if needed
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

// Inventory API
export const inventoryAPI = {
  getBundles: () => api.get('/bundles'),
  createBundle: (bundleData) => api.post('/bundles', bundleData),
  updateBundle: (id, bundleData) => api.put(`/bundles/${id}`, bundleData),
  deleteBundle: (id) => api.delete(`/bundles/${id}`),
};

// Block API
export const blockAPI = {
  getBlocks: () => api.get('/blocks'),
  createBlock: (blockData) => api.post('/blocks', blockData),
  updateBlock: (id, blockData) => api.put(`/blocks/${id}`, blockData),
  deleteBlock: (id) => api.delete(`/blocks/${id}`),
};

// Supplier API
export const supplierAPI = {
  getSuppliers: () => api.get('/suppliers'),
  createSupplier: (supplierData) => api.post('/suppliers', supplierData),
  updateSupplier: (id, supplierData) => api.put(`/suppliers/${id}`, supplierData),
  deleteSupplier: (id) => api.delete(`/suppliers/${id}`),
};

// Material API
export const materialAPI = {
  getMaterials: () => api.get('/materials'),
  createMaterial: (materialData) => api.post('/materials', materialData),
  updateMaterial: (id, materialData) => api.put(`/materials/${id}`, materialData),
  deleteMaterial: (id) => api.delete(`/materials/${id}`),
};

// Order API
export const orderAPI = {
  getOrders: () => api.get('/orders'),
  createOrder: (orderData) => api.post('/orders', orderData),
  updateOrder: (id, orderData) => api.put(`/orders/${id}`, orderData),
  deleteOrder: (id) => api.delete(`/orders/${id}`),
};

export default api;