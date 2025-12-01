import { User } from '@/types/wiki';

// Configure your Spring API base URL here
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH !== 'false'; // Default to true

interface LoginResponse {
  token: string;
  user: User;
}

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'Administrador',
  email: 'admin@gmail.com',
  departments: ['atendimento', 'ti', 'financeiro', 'estoque', 'admin'],
  role: 'admin',
};

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    // Mock authentication
    if (USE_MOCK) {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (email === 'admin@gmail.com' && password === '1234') {
        return {
          token: 'mock-jwt-token-' + Date.now(),
          user: mockUser,
        };
      } else {
        throw new Error('Credenciais inválidas');
      }
    }

    // Real API call
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(error.message || 'Invalid credentials');
    }

    return response.json();
  },

  getCurrentUser: async (): Promise<User> => {
    const token = localStorage.getItem('authToken');

    // Mock authentication
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      if (token?.startsWith('mock-jwt-token-')) {
        return mockUser;
      } else {
        throw new Error('Invalid token');
      }
    }

    // Real API call
    const response = await fetch(`${API_BASE_URL}/auth/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return response.json();
  },

  logout: async (): Promise<void> => {
    // Mock authentication - just resolve
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return;
    }

    // Real API call
    const token = localStorage.getItem('authToken');
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      // Logout locally even if API call fails
      console.error('Logout API call failed:', error);
    }
  },
};

// Helper to get auth headers for other API calls
export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};
