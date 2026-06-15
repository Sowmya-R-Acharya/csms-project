import { useState, useEffect } from 'react'
import { getAllRequests, getAllCustomers } from '../../api/services'
import '../../components/Layout.css'

const statusBadge = (s) => {
const map = { PENDING: 'badge-pending', IN_PROGRESS: 'badge-progress', 
COMPLETED: 'badge-completed', CANCELLED: 'badge-cancelled' }
  return <span className={`badge ${map[s] || ''}`}>{s.replace('_', ' ')}</span>
}

export default function AdminDashboard() {
  const [requests, setRequests] = useState([])
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    getAllRequests().then((r) => setRequests(r.data)).catch(() => {})
    getAllCustomers().then((r) => setCustomers(r.data)).catch(() => {})
  }, [])

  const stats = [
  { label: 'Total Customers',  value: customers.length, color: 'blue' },
  { label: 'Service Requests', value: requests.length, color: 'orange' },
  { label: 'Completed', value: requests.filter((r) =>
     r.status === 'COMPLETED').length,
  color: 'green' },
  { label: 'Pending', value: requests.filter((r) => 
  r.status === 'PENDING').length, 
  color: 'red' },
  ]

return (
<div>
<div className="page-header">
<div className="page-title">Admin Dashboard</div>
<div className="page-subtitle">
Welcome back! Here's what's happening today.</div>
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
<h3 style={{ marginBottom: 16, fontWeight: 700 }}>
  Recent Service Requests</h3>
{requests.length === 0 ? (
<p style={{ color: 'var(--text-muted)', 
padding: '16px 0' }}>No requests yet.</p>
) : (
<div className="table-wrapper">
<table>
<thead>
<tr><th>#</th><th>Customer</th><th>Car</th>
<th>Service</th><th>Date</th><th>Status</th></tr>
</thead>
<tbody>
{requests.slice(0, 6).map((r) => (
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
