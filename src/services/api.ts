import axios from 'axios';
import { 
  AuthUser, 
  AuthCredentials,
  AuthResponse,
  Booking, 
  ContactRequest, 
  Announcement 
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: (credentials: AuthCredentials) => 
    api.post<AuthResponse>('/auth/login', credentials),
  register: (credentials: AuthCredentials) => 
    api.post<AuthResponse>('/auth/register', credentials),
};

export const bookings = {
  create: (bookingData: Omit<Booking, '_id' | 'status'>) => 
    api.post<Booking>('/bookings', bookingData),
  getAll: () => 
    api.get<Booking[]>('/bookings'),
  updateStatus: (id: string, status: Booking['status']) => 
    api.patch<Booking>(`/bookings/${id}`, { status }),
};

export const requests = {
  create: (requestData: Omit<ContactRequest, '_id' | 'status' | 'date'>) => 
    api.post<ContactRequest>('/requests', requestData),
  getAll: () => 
    api.get<ContactRequest[]>('/requests'),
  updateStatus: (id: string, status: ContactRequest['status']) => 
    api.patch<ContactRequest>(`/requests/${id}`, { status }),
};

export const announcements = {
  create: (announcementData: Omit<Announcement, '_id'>) => 
    api.post<Announcement>('/announcements', announcementData),
  getAll: () => 
    api.get<Announcement[]>('/announcements'),
  update: (id: string, data: Partial<Announcement>) => 
    api.patch<Announcement>(`/announcements/${id}`, data),
  delete: (id: string) => 
    api.delete<Announcement>(`/announcements/${id}`),
};

// Error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 