import { useState, useEffect } from 'react'
import { getAllCustomers, updateUser, deleteUser } from '../../api/services'
import '../../components/Layout.css'

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([])
  const [editing, setEditing] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllCustomers()
      .then((r) => setCustomers(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const startEdit = (c) => {
    setEditing(c.id)
    setEditForm({ name: c.name, email: c.email, phone: c.phone })
  }

  const saveEdit = async (id) => {
    try {
      const res = await updateUser(id, editForm)
      setCustomers(customers.map((c) => c.id === id ? res.data : c))
      setEditing(null)
    } catch {
      alert('Update failed')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this customer?')) return
    try {
      await deleteUser(id)
      setCustomers(customers.filter((c) => c.id !== id))
    } catch {
      alert('Delete failed')
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Customer Management</div>
        <div className="page-subtitle">View and edit customer details</div>
      </div>

      <div className="card">
        {loading ? <p style={{ color: 'var(--text-muted)' }}>Loading...</p> : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr><th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr><td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 32 }}>No customers yet.</td></tr>
                ) : customers.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>
                      {editing === c.id
                        ? <input className="form-input" style={{ padding: '6px 10px' }} value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                        : c.name}
                    </td>
                    <td>
                      {editing === c.id
                        ? <input className="form-input" style={{ padding: '6px 10px' }} value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                        : c.email}
                    </td>
                    <td>
                      {editing === c.id
                        ? <input className="form-input" style={{ padding: '6px 10px' }} value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                        : c.phone}
                    </td>
                    <td style={{ display: 'flex', gap: 8 }}>
                      {editing === c.id
                        ? <button className="btn btn-primary btn-sm" onClick={() => saveEdit(c.id)}>Save</button>
                        : <button className="btn btn-secondary btn-sm" onClick={() => startEdit(c)}>Edit</button>}
                      <button className="btn btn-secondary btn-sm" style={{ color: '#e74c3c' }} onClick={() => handleDelete(c.id)}>Delete</button>
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
