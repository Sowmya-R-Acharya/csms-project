import { useState, useEffect } from 'react'
import { getAllRequests, filterByStatus, filterByService } from '../../api/services'
import '../../components/Layout.css'

const statusBadge = (s) => {
  const map = { PENDING: 'badge-pending', IN_PROGRESS: 'badge-progress', COMPLETED: 'badge-completed', CANCELLED: 'badge-cancelled' }
  return <span className={`badge ${map[s] || ''}`}>{s.replace('_', ' ')}</span>
}

export default function AdminFilter() {
  const [allRequests, setAllRequests] = useState([])
  const [filtered, setFiltered] = useState([])
  const [filters, setFilters] = useState({ status: '', serviceType: '', customer: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllRequests()
      .then((r) => { setAllRequests(r.data); setFiltered(r.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const applyFilters = async () => {
    try {
      let result = allRequests

      if (filters.status) {
        const res = await filterByStatus(filters.status)
        result = res.data
      } else if (filters.serviceType) {
        const res = await filterByService(filters.serviceType)
        result = res.data
      }

      // client-side customer filter
      if (filters.customer) {
        result = result.filter((r) =>
          r.userName.toLowerCase().includes(filters.customer.toLowerCase())
        )
      }

      setFiltered(result)
    } catch {
      alert('Filter failed')
    }
  }

  const resetFilters = () => {
    setFilters({ status: '', serviceType: '', customer: '' })
    setFiltered(allRequests)
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Filter Service Requests</div>
        <div className="page-subtitle">Search and filter requests by various criteria</div>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Status</label>
            <select className="form-input" value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Service Type</label>
            <input className="form-input" placeholder="e.g. Oil Change"
              value={filters.serviceType}
              onChange={(e) => setFilters({ ...filters, serviceType: e.target.value })} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Customer Name</label>
            <input className="form-input" placeholder="Customer name"
              value={filters.customer}
              onChange={(e) => setFilters({ ...filters, customer: e.target.value })} />
          </div>
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 10, alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={applyFilters}>Apply Filters</button>
          <button className="btn btn-secondary" onClick={resetFilters}>Reset</button>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Showing {filtered.length} of {allRequests.length} requests
          </span>
        </div>
      </div>

      <div className="card">
        {loading ? <p style={{ color: 'var(--text-muted)' }}>Loading...</p> : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>#</th><th>Customer</th><th>Car</th><th>Service</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 32 }}>No requests match your filters.</td></tr>
                ) : filtered.map((r) => (
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
