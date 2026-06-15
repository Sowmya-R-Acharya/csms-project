import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { registerUser } from '../api/services'
import './Auth.css'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    try {
      await registerUser({ name: form.name, email: form.email, phone: form.phone, password: form.password })
      navigate('/login')
    } catch {
      // fallback for demo without backend
      navigate('/login')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">🚗 CSMS</div>
        <h2 className="auth-tagline">Join CSMS today</h2>
        <p className="auth-sub">Register to manage your vehicles and service requests.</p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-desc">Fill in your details to get started</p>

          {error && <div style={{ background:'#f8d7da', color:'#721c24', padding:'10px 14px', borderRadius:8, marginBottom:16, fontSize:'0.88rem' }}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                placeholder="+1 234 567 8900"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn">Create Account</button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
          <p className="auth-switch">
            <Link to="/">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
