import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

// Admin pages
import AdminLayout from './components/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminCustomers from './pages/admin/AdminCustomers'
import AdminServiceRequests from './pages/admin/AdminServiceRequests'
import AdminUpdateStatus from './pages/admin/AdminUpdateStatus'
import AdminFilter from './pages/admin/AdminFilter'

// User pages
import UserLayout from './components/UserLayout'
import UserDashboard from './pages/user/UserDashboard'
import UserProfile from './pages/user/UserProfile'
import UserCars from './pages/user/UserCars'
import UserRequestService from './pages/user/UserRequestService'
import UserServiceStatus from './pages/user/UserServiceStatus'

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="service-requests" element={<AdminServiceRequests />} />
          <Route path="update-status" element={<AdminUpdateStatus />} />
          <Route path="filter" element={<AdminFilter />} />
        </Route>

        {/* User Routes */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="cars" element={<UserCars />} />
          <Route path="request-service" element={<UserRequestService />} />
          <Route path="service-status" element={<UserServiceStatus />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
