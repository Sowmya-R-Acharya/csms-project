import { useState, useEffect } from 'react'
import { getCarsByUser, createRequest } from '../../api/services'
import '../../components/Layout.css'

const serviceTypes = [
  'Oil Change', 'Brake Repair', 'Tire Rotation', 'Engine Check',
  'AC Service', 'Battery Replacement', 'Wheel Alignment', 'Full Service',
]

export default function UserRequestService() {
  const user = JSON.parse(localStorage.getItem('csms_user') || '{}')
  const [cars, setCars] = useState([])
  const today = new Date().toISOString().split('T')[0]
  const [form, setForm] = useState({ carId: '', serviceType: '', date: today, notes: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user.id) {
      getCarsByUser(user.id)
        .then((res) => setCars(res.data))
        .catch(() => setCars([]))
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await createRequest({
        userId: user.id,
        carId: form.carId,
        serviceType: form.serviceType,
        notes: form.notes,
      })
      setSubmitted(true)
      setForm({ carId: '', serviceType: '', date: '', notes: '' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      setError(err.response?.data || 'Failed to submit request')
    }
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Request Service</div>
        <div className="page-subtitle">Submit a new service request for your vehicle</div>
      </div>

      <div className="card" style={{ maxWidth: 600 }}>
        {submitted && (
          <div style={{ background: '#d4edda', color: '#155724', padding: '14px 18px', borderRadius: 10, marginBottom: 24, fontWeight: 600 }}>
            ✅ Service request submitted successfully!
          </div>
        )}
        {error && (
          <div style={{ background: '#f8d7da', color: '#721c24', padding: '14px 18px', borderRadius: 10, marginBottom: 24 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Car</label>
            <select className="form-input" value={form.carId}
              onChange={(e) => setForm({ ...form, carId: e.target.value })} required>
              <option value="">-- Choose your car --</option>
              {cars.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.carBrand} {c.carModel} - {c.carNumber}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Service Type</label>
            <select className="form-input" value={form.serviceType}
              onChange={(e) => setForm({ ...form, serviceType: e.target.value })} required>
              <option value="">-- Select service --</option>
              {serviceTypes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Preferred Date</label>
            <input type="date" className="form-input" value={form.date}
              min={today}
              onChange={(e) => setForm({ ...form, date: e.target.value })} required />
          </div>

          <div className="form-group">
            <label className="form-label">Additional Notes (optional)</label>
            <textarea className="form-input" rows={4}
              placeholder="Describe any specific issues..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              style={{ resize: 'vertical' }} />
          </div>

          <button type="submit" className="btn btn-primary">Submit Request</button>
        </form>
      </div>
    </div>
  )
}
