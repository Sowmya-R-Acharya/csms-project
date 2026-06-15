import { useState, useEffect } from 'react'
import { getRequestsByUser } from '../../api/services'
import '../../components/Layout.css'

const statusBadge = (s) => {
  const map = { PENDING: 'badge-pending', IN_PROGRESS: 'badge-progress', COMPLETED: 'badge-completed', CANCELLED: 'badge-cancelled' }
  return <span className={`badge ${map[s] || ''}`}>{s.replace('_', ' ')}</span>
}

const statusStep = (s) => ({ PENDING: 0, IN_PROGRESS: 1, COMPLETED: 2 }[s] ?? 0)

export default function UserServiceStatus() {
  const user = JSON.parse(localStorage.getItem('csms_user') || '{}')
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user.id) {
      getRequestsByUser(user.id)
        .then((res) => setRequests(res.data))
        .catch(() => setRequests([]))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) return <p style={{ color: 'var(--text-muted)', padding: 32 }}>Loading...</p>

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Service Status</div>
        <div className="page-subtitle">Track the progress of your service requests</div>
      </div>

      {requests.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
          No service requests yet.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {requests.map((r) => (
            <div key={r.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{r.serviceType}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {r.carInfo} · Requested: {r.requestDate}
                  </div>
                </div>
                {statusBadge(r.status)}
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  {['PENDING', 'IN PROGRESS', 'COMPLETED'].map((step, i) => (
                    <div key={step} style={{
                      fontSize: '0.78rem', fontWeight: 600,
                      color: i <= statusStep(r.status) ? 'var(--primary)' : 'var(--text-muted)'
                    }}>{step}</div>
                  ))}
                </div>
                <div style={{ height: 6, background: '#e0e0e0', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', background: 'var(--primary)', borderRadius: 4,
                    width: `${(statusStep(r.status) / 2) * 100}%`,
                    transition: 'width 0.4s ease'
                  }} />
                </div>
              </div>

              {r.notes && (
                <div style={{ background: '#f8f9fa', borderRadius: 8, padding: '10px 14px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  📝 {r.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
