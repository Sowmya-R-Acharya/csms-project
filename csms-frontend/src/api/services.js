import api from './axios'

// ── Auth ──────────────────────────────────────────
export const registerUser  = (data) => api.post('/users/register', data)
export const loginUser     = (data) => api.post('/users/login', data)

// ── Users (Admin) ─────────────────────────────────
export const getAllCustomers = ()     => api.get('/users')
export const getUserById     = (id)  => api.get(`/users/${id}`)
export const updateUser      = (id, data) => api.put(`/users/${id}`, data)
export const deleteUser      = (id)  => api.delete(`/users/${id}`)

// ── Cars ──────────────────────────────────────────
export const addCar          = (data)   => api.post('/cars', data)
export const getCarsByUser   = (userId) => api.get(`/cars/user/${userId}`)
export const getAllCars       = ()       => api.get('/cars')
export const deleteCar       = (id)     => api.delete(`/cars/${id}`)

// ── Service Requests ──────────────────────────────
export const createRequest      = (data)        => api.post('/service-requests', data)
export const getAllRequests      = ()            => api.get('/service-requests')
export const getRequestsByUser  = (userId)      => api.get(`/service-requests/user/${userId}`)
export const filterByStatus     = (status)      => api.get(`/service-requests/filter?status=${status}`)
export const filterByService    = (serviceType) => api.get(`/service-requests/filter?serviceType=${serviceType}`)
export const updateStatus       = (id, value)   => api.put(`/service-requests/${id}/status?value=${value}`)
export const deleteRequest      = (id)          => api.delete(`/service-requests/${id}`)
