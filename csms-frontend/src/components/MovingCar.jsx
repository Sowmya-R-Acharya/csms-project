import './MovingCar.css'

export default function MovingCar() {
  return (
    <div className="mc-wrapper" aria-hidden="true">
      <div className="mc-road">
        <div className="mc-dashes" />
      </div>
      <img
        className="mc-car"
        src="https://www.freeiconspng.com/uploads/audi-car-png-image-side-view-7.png"
        alt=""
        onError={(e) => { e.target.style.display = 'none' }}
      />
    </div>
  )
}
