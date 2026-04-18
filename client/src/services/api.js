import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    req.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
  }
  return req;
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/auth/profile');

export const getAllDoctors = (params) => API.get('/doctors', { params });
export const getDoctorById = (id) => API.get(`/doctors/${id}`);
export const getDoctorProfile = () => API.get('/doctors/profile');
export const updateDoctorProfile = (data) => API.put('/doctors/profile', data);

export const bookAppointment = (data) => API.post('/appointments', data);
export const getMyAppointments = () => API.get('/appointments/my');
export const getDoctorAppointments = () => API.get('/appointments/doctor');
export const getAllAppointments = () => API.get('/appointments/all');
export const updateAppointmentStatus = (id, data) => API.put(`/appointments/${id}`, data);
export const cancelAppointment = (id) => API.delete(`/appointments/${id}`);

export const getMyNotifications = () => API.get('/notifications');
export const markNotificationRead = (id) => API.put(`/notifications/${id}/read`);

export const getAllUsers = () => API.get('/admin/users');
export const getAllDoctorsAdmin = () => API.get('/admin/doctors');
export const approveDoctor = (id) => API.put(`/admin/doctors/${id}/approve`);
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);