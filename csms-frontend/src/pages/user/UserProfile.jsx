import { useState } from 'react'
import { updateUser } from '../../api/services'
import '../../components/Layout.css'

export default function UserProfile() {
  const stored = JSON.parse(localStorage.getItem('csms_user') || '{}')
  const [form, setForm] = useState({
    name: stored.name || '',
    email: stored.email || '',
    phone: stored.phone || '',
    password: '',
    confirm: '',
  })
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password && form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    try {
      const res = await updateUser(stored.id, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password || stored.password,
      })
      localStorage.setItem('csms_user', JSON.stringify(res.data))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      setError(err.response?.data || 'Update failed')
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Edit Profile</div>
        <div className="page-subtitle">Update your personal information</div>
      </div>

      <div className="card" style={{ maxWidth: 600 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--primary)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem', fontWeight: 700
          }}>
            {form.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{form.name}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{form.email}</div>
          </div>
        </div>

        {error && (
          <div style={{ background: '#f8d7da', color: '#721c24', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: '0.88rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input className="form-input" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input type="password" className="form-input" placeholder="Leave blank to keep current"
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input type="password" className="form-input" placeholder="Confirm new password"
                value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            {saved && <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: '0.9rem' }}>✓ Profile updated!</span>}
          </div>
        </form>
      </div>
    </div>
  )
}
