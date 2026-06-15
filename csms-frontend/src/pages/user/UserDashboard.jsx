import { useState, useEffect } from 'react'
import { getRequestsByUser, getCarsByUser } from '../../api/services'
import '../../components/Layout.css'

const statusBadge = (s) => {
  const map = { PENDING: 'badge-pending', IN_PROGRESS: 'badge-progress', COMPLETED: 'badge-completed', CANCELLED: 'badge-cancelled' }
  return <span className={`badge ${map[s] || ''}`}>{s.replace('_', ' ')}</span>
}

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem('csms_user') || '{}')
  const [requests, setRequests] = useState([])
  const [cars, setCars] = useState([])

  useEffect(() => {
    if (user.id) {
      getRequestsByUser(user.id).then((r) => setRequests(r.data)).catch(() => {})
      getCarsByUser(user.id).then((r) => setCars(r.data)).catch(() => {})
    }
  }, [])

  const stats = [
    { icon: '🚘', label: 'My Cars',       value: cars.length,                                          color: 'blue' },
    { icon: '📋', label: 'Total Requests', value: requests.length,                                      color: 'orange' },
    { icon: '✅', label: 'Completed',      value: requests.filter((r) => r.status === 'COMPLETED').length, color: 'green' },
    { icon: '⏳', label: 'Pending',        value: requests.filter((r) => r.status === 'PENDING').length,   color: 'red' },
  ]

  return (
    <div>
      <div className="page-header">
        <div className="page-title">My Dashboard</div>
        <div className="page-subtitle">Welcome back, {user.name || 'Customer'}!</div>
      </div>

      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            <div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 16, fontWeight: 700 }}>My Recent Service Requests</h3>
        {requests.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', padding: '16px 0' }}>No service requests yet.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th><th>Car</th><th>Service</th><th>Date</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.slice(0, 5).map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.carInfo}</td>
                    <td>{r.serviceType}</td>
                    <td>{r.requestDate}</td>
                    <td>{statusBadge(r.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
