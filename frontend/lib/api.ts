import axios from 'axios';
import { 
  Client, 
  CreateClientRequest, 
  Invoice, 
  CreateInvoiceRequest, 
  Contract, 
  CreateContractRequest,
  InvoiceTemplate 
} from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  // Only access localStorage in browser environment
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only handle in browser environment
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Client API
export const clientsApi = {
  getAll: async (): Promise<Client[]> => {
    const response = await api.get('/clients');
    return response.data;
  },

  getById: async (id: string): Promise<Client> => {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },

  create: async (data: CreateClientRequest): Promise<Client> => {
    const response = await api.post('/clients', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateClientRequest>): Promise<Client> => {
    const response = await api.patch(`/clients/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/clients/${id}`);
  },
};

// Contract API
export const contractsApi = {
  getAll: async (): Promise<Contract[]> => {
    const response = await api.get('/contracts');
    return response.data;
  },

  getById: async (id: string): Promise<Contract> => {
    const response = await api.get(`/contracts/${id}`);
    return response.data;
  },

  create: async (data: CreateContractRequest): Promise<Contract> => {
    const response = await api.post('/contracts', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateContractRequest>): Promise<Contract> => {
    const response = await api.patch(`/contracts/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/contracts/${id}`);
  },
};

// Invoice API
export const invoicesApi = {
  getAll: async (): Promise<Invoice[]> => {
    const response = await api.get('/invoices');
    return response.data;
  },

  getById: async (id: string): Promise<Invoice> => {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  },

  create: async (data: CreateInvoiceRequest): Promise<Invoice> => {
    const response = await api.post('/invoices', data);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateInvoiceRequest>): Promise<Invoice> => {
    const response = await api.patch(`/invoices/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/invoices/${id}`);
  },
};

// Template API
export const templatesApi = {
  getAll: async (): Promise<InvoiceTemplate[]> => {
    const response = await api.get('/templates');
    return response.data;
  },

  getById: async (id: string): Promise<InvoiceTemplate> => {
    const response = await api.get(`/templates/${id}`);
    return response.data;
  },

  create: async (data: any): Promise<InvoiceTemplate> => {
    const response = await api.post('/templates', data);
    return response.data;
  },

  update: async (id: string, data: any): Promise<InvoiceTemplate> => {
    const response = await api.patch(`/templates/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/templates/${id}`);
  },
};

// Files API
export const filesApi = {
  uploadLogo: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/files/upload/logo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  uploadTemplate: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/files/upload/template', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  deleteFile: async (folder: string, filename: string) => {
    await api.delete(`/files/${folder}/${filename}`);
  },
};

// PDF API
export const pdfApi = {
  generateInvoicePdf: async (invoiceId: string) => {
    const response = await api.post(`/invoices/${invoiceId}/generate-pdf`);
    return response.data;
  },
};

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (email: string, password: string, name?: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export default api;