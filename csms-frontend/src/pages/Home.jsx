import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      {/* Navbar */}
      <nav className="home-nav">
        <div className="home-nav-brand">🚗 CSMS</div>
        <div className="home-nav-links">
          <button className="nav-link-btn" onClick={() => navigate('/login')}>Login</button>
          <button className="nav-btn" onClick={() => navigate('/register')}>Register</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-center">
          <h1 className="hero-title">
            Car Service <span className="hero-highlight">Management</span> System
          </h1>
          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={() => navigate('/register')}>
              Get Started
            </button>
            <button className="hero-btn-secondary" onClick={() => navigate('/login')}>
              Sign In
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
