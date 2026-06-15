import { useState, useEffect } from 'react'
import { getAllRequests } from '../../api/services'
import '../../components/Layout.css'

const statusBadge = (s) => {
  const map = { PENDING: 'badge-pending', IN_PROGRESS: 'badge-progress', COMPLETED: 'badge-completed', CANCELLED: 'badge-cancelled' }
  return <span className={`badge ${map[s] || ''}`}>{s.replace('_', ' ')}</span>
}

export default function AdminServiceRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllRequests()
      .then((r) => setRequests(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Service Requests</div>
        <div className="page-subtitle">All customer service requests</div>
      </div>

      <div className="card">
        {loading ? <p style={{ color: 'var(--text-muted)' }}>Loading...</p> : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>#</th><th>Customer</th><th>Car</th><th>Service</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {requests.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 32 }}>No requests yet.</td></tr>
                ) : requests.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.userName}</td>
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
