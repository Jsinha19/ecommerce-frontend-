import axios from 'axios';
import { AuthResponse, Item, ItemsResponse, Cart, FilterParams } from '../types';

const API_BASE_URL = 'https://ecommerce-backend-spdi.onrender.com/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const authAPI = {
    register: async (userData: { name: string; email: string; password: string }): Promise<AuthResponse> => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    login: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get('/auth/profile');
        return response.data;
    },
};

// Items API
export const itemsAPI = {
    getItems: async (filters: FilterParams = {}): Promise<ItemsResponse> => {
        const params = new URLSearchParams();

        if (filters.category && filters.category !== 'all') params.append('category', filters.category);
        if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
        if (filters.search) params.append('search', filters.search);
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());

        const response = await api.get(`/items?${params.toString()}`);
        return response.data;
    },

    getItem: async (id: string): Promise<Item> => {
        const response = await api.get(`/items/${id}`);
        return response.data;
    },
};

// Cart API
export const cartAPI = {
    getCart: async (): Promise<Cart> => {
        const response = await api.get('/cart');
        return response.data;
    },

    addToCart: async (itemId: string, quantity: number = 1) => {
        const response = await api.post('/cart/add', { itemId, quantity });
        return response.data;
    },

    updateCartItem: async (itemId: string, quantity: number) => {
        const response = await api.put('/cart/update', { itemId, quantity });
        return response.data;
    },

    removeFromCart: async (itemId: string) => {
        const response = await api.delete(`/cart/remove/${itemId}`);
        return response.data;
    },

    clearCart: async () => {
        const response = await api.delete('/cart/clear');
        return response.data;
    },
};

export default api;
