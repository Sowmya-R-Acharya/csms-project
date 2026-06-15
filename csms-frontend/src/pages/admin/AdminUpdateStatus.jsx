import { useState, useEffect } from 'react'
import { getAllRequests, updateStatus } from '../../api/services'
import '../../components/Layout.css'

const statusOptions = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']

const statusBadge = (s) => {
  const map = { PENDING: 'badge-pending', IN_PROGRESS: 'badge-progress', COMPLETED: 'badge-completed', CANCELLED: 'badge-cancelled' }
  return <span className={`badge ${map[s] || ''}`}>{s.replace('_', ' ')}</span>
}

export default function AdminUpdateStatus() {
  const [requests, setRequests] = useState([])
  const [saved, setSaved] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllRequests()
      .then((r) => setRequests(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateStatus(id, newStatus)
      setRequests(requests.map((r) => r.id === id ? res.data : r))
      setSaved(id)
      setTimeout(() => setSaved(null), 1500)
    } catch {
      alert('Failed to update status')
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Update Service Status</div>
        <div className="page-subtitle">Change the status of service requests</div>
      </div>

      <div className="card">
        {loading ? <p style={{ color: 'var(--text-muted)' }}>Loading...</p> : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>#</th><th>Customer</th><th>Car</th><th>Service</th><th>Current Status</th><th>Update</th></tr>
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
                    <td>{statusBadge(r.status)}</td>
                    <td style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <select
                        className="form-input"
                        style={{ padding: '6px 10px', width: 160 }}
                        value={r.status}
                        onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{s.replace('_', ' ')}</option>
                        ))}
                      </select>
                      {saved === r.id && <span style={{ color: 'var(--success)', fontSize: '0.8rem', fontWeight: 600 }}>✓ Saved</span>}
                    </td>
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
