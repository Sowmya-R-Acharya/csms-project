import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import './Layout.css'

const adminLinks = [
  { to: '/admin', label: 'Dashboard', icon: '🏠', end: true },
  { to: '/admin/customers', label: 'View & Edit Customers', icon: '👥' },
  { to: '/admin/service-requests', label: 'Service Requests', icon: '📋' },
  { to: '/admin/update-status', label: 'Update Service Status', icon: '🔄' },
  { to: '/admin/filter', label: 'Filter Requests', icon: '🔍' },
]

export default function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">🚗</span>
          <div>
            <div className="brand-title">CSMS</div>
            <div className="brand-role">Admin Panel</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {adminLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `nav-item ${isActive ? 'nav-item-active' : ''}`
              }
            >
              <span className="nav-icon">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <span>🚪</span> Logout
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
