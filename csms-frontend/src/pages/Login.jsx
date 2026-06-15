import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../api/services'
import './Auth.css'

export default function Login() {
const navigate = useNavigate()
const [form, setForm] = useState({ email: '', password: '', 
role: 'customer' })
const [error, setError] = useState('')
const handleSubmit = async (e) => {
e.preventDefault()
setError('')
try {
const res = await loginUser({ email: form.email, 
password: form.password })
const user = res.data
localStorage.setItem('csms_user', JSON.stringify(user))
if (user.role === 'ADMIN') navigate('/admin')
else navigate('/user')
} catch (err) {
const msg = err.response?.data
      
if (msg && typeof msg === 'object') {
setError(msg.message || msg.error || 'Invalid email or password')
} else {
setError(msg || 'Invalid email or password')
}
}
}

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">🚗 CSMS</div>
        <h2 className="auth-tagline">Welcome back to your service hub</h2>
        <p className="auth-sub">Manage your vehicles and service requests with ease.</p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2 className="auth-title">Sign In</h2>
          <p className="auth-desc">Enter your credentials to continue</p>

          {error && (
            <div style={{ background:'#f8d7da', color:'#721c24', padding:'10px 14px', borderRadius:8, marginBottom:16, fontSize:'0.88rem' }}>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
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
              <label className="form-label">Login As</label>
              <select
                className="form-input"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="customer">Customer</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <button type="submit" className="auth-submit-btn">Sign In</button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
          <p className="auth-switch">
            <Link to="/">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
