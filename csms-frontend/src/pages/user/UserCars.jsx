import { useState, useEffect } from 'react'
import { getCarsByUser, addCar, deleteCar } from '../../api/services'
import '../../components/Layout.css'

export default function UserCars() {
  const user = JSON.parse(localStorage.getItem('csms_user') || '{}')
  const [cars, setCars] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ brand: '', model: '', number: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user.id) {
      getCarsByUser(user.id)
        .then((res) => setCars(res.data))
        .catch(() => setCars([]))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const handleAddCar = async (e) => {
    e.preventDefault()
    try {
      const res = await addCar({
        userId: user.id,
        carBrand: form.brand,
        carModel: form.model,
        carNumber: form.number,
      })
      setCars([...cars, res.data])
      setForm({ brand: '', model: '', number: '' })
      setShowForm(false)
    } catch (err) {
      alert(err.response?.data || 'Failed to add car')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this car?')) return
    try {
      await deleteCar(id)
      setCars(cars.filter((c) => c.id !== id))
    } catch {
      alert('Failed to delete car')
    }
  }

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="page-title">My Cars</div>
          <div className="page-subtitle">Manage your registered vehicles</div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Car'}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 20, fontWeight: 700 }}>Add New Car</h3>
          <form onSubmit={handleAddCar}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Car Brand</label>
                <input className="form-input" placeholder="e.g. Toyota"
                  value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Car Model</label>
                <input className="form-input" placeholder="e.g. Camry"
                  value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Car Number</label>
              <input className="form-input" placeholder="e.g. TN01AB1234"
                value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} required />
            </div>
            <button type="submit" className="btn btn-primary">Add Car</button>
          </form>
        </div>
      )}

      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
      ) : cars.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
          No cars added yet. Click "+ Add Car" to get started.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {cars.map((car) => (
            <div key={car.id} className="card">
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>🚘</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>
                {car.carBrand} {car.carModel}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: 16 }}>
                Plate: {car.carNumber}
              </div>
              <button className="btn btn-secondary btn-sm" style={{ color: '#e74c3c' }}
                onClick={() => handleDelete(car.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
