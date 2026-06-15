import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import './Layout.css'

const userLinks = [
  { to: '/user', label: 'Dashboard', icon: '🏠', end: true },
  { to: '/user/profile', label: 'Edit Profile', icon: '👤' },
  { to: '/user/cars', label: 'My Cars', icon: '🚘' },
  { to: '/user/request-service', label: 'Request Service', icon: '🔧' },
  { to: '/user/service-status', label: 'Service Status', icon: '📊' },
]

export default function UserLayout() {
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
            <div className="brand-role">Customer Panel</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {userLinks.map((link) => (
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
