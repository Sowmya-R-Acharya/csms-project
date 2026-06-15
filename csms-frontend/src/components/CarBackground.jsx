import './CarBackground.css'

function BmwCar() {
  return (
    <svg viewBox="0 0 240 95" xmlns="http://www.w3.org/2000/svg" className="bmw-svg">
      {/* Shadow */}
      <ellipse cx="120" cy="90" rx="100" ry="5" fill="rgba(0,0,0,0.18)" />

      {/* Main body */}
      <rect x="10" y="42" width="220" height="34" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      {/* Roof / cabin */}
      <path d="M65 42 Q78 14 108 11 L148 11 Q175 11 178 42 Z"
        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

      {/* Windshield front */}
      <path d="M148 42 Q158 18 172 15 L176 42 Z"
        fill="rgba(100,180,255,0.15)" stroke="rgba(100,180,255,0.2)" strokeWidth="0.5" />

      {/* Windshield rear */}
      <path d="M72 42 Q68 18 80 13 L108 11 Q94 14 86 42 Z"
        fill="rgba(100,180,255,0.15)" stroke="rgba(100,180,255,0.2)" strokeWidth="0.5" />

      {/* Side window */}
      <rect x="110" y="14" width="34" height="25" rx="4"
        fill="rgba(100,180,255,0.12)" stroke="rgba(100,180,255,0.18)" strokeWidth="0.5" />

      {/* Hood */}
      <path d="M178 42 L222 42 Q230 42 230 50 L230 62 L178 62 Z"
        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

      {/* Trunk */}
      <path d="M10 50 L10 62 L44 62 L44 42 Q28 42 10 50 Z"
        fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

      {/* Front bumper */}
      <rect x="222" y="58" width="12" height="8" rx="3"
        fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />

      {/* Rear bumper */}
      <rect x="6" y="58" width="12" height="8" rx="3"
        fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />

      {/* Headlight glow */}
      <ellipse cx="228" cy="52" rx="6" ry="4" fill="rgba(249,231,159,0.5)" />
      <ellipse cx="228" cy="52" rx="3" ry="2.5" fill="rgba(255,255,255,0.7)" />

      {/* Tail light */}
      <rect x="8" y="48" width="8" height="9" rx="2" fill="rgba(255,80,80,0.5)" />

      {/* Door line */}
      <line x1="116" y1="43" x2="116" y2="75" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />

      {/* Door handles */}
      <rect x="92"  y="54" width="14" height="3" rx="1.5" fill="rgba(255,255,255,0.15)" />
      <rect x="124" y="54" width="14" height="3" rx="1.5" fill="rgba(255,255,255,0.15)" />

      {/* BMW logo on hood */}
      <circle cx="215" cy="41" r="6" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2"/>
      <line x1="215" y1="35" x2="215" y2="47" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
      <line x1="209" y1="41" x2="221" y2="41" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>

      {/* FRONT WHEEL */}
      <g className="bmw-wheel-front">
        <circle cx="183" cy="72" r="17" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <circle cx="183" cy="72" r="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
        <circle cx="183" cy="72" r="6"  fill="rgba(255,255,255,0.08)" />
        <circle cx="183" cy="72" r="2.5" fill="rgba(255,255,255,0.2)" />
        <line x1="183" y1="60" x2="183" y2="84" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
        <line x1="171" y1="72" x2="195" y2="72" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
        <line x1="175" y1="63" x2="191" y2="81" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
        <line x1="191" y1="63" x2="175" y2="81" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
      </g>

      {/* REAR WHEEL */}
      <g className="bmw-wheel-rear">
        <circle cx="57" cy="72" r="17" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        <circle cx="57" cy="72" r="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
        <circle cx="57" cy="72" r="6"  fill="rgba(255,255,255,0.08)" />
        <circle cx="57" cy="72" r="2.5" fill="rgba(255,255,255,0.2)" />
        <line x1="57" y1="60" x2="57" y2="84" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
        <line x1="45" y1="72" x2="69" y2="72" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
        <line x1="49" y1="63" x2="65" y2="81" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
        <line x1="65" y1="63" x2="49" y2="81" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
      </g>

      {/* Exhaust puffs */}
      <circle cx="8"   cy="64" r="3" fill="rgba(255,255,255,0.06)" className="bmw-puff1" />
      <circle cx="2"   cy="61" r="4" fill="rgba(255,255,255,0.04)" className="bmw-puff2" />
      <circle cx="-5"  cy="58" r="5" fill="rgba(255,255,255,0.02)" className="bmw-puff3" />
    </svg>
  )
}

export default function CarBackground() {
  return (
    <div className="car-bg-wrapper" aria-hidden="true">
      {/* Road strip */}
      <div className="car-bg-road">
        <div className="car-bg-dashes" />
      </div>
      {/* Moving car */}
      <div className="car-bg-mover">
        <BmwCar />
        {/* headlight beam */}
        <div className="car-bg-beam" />
      </div>
    </div>
  )
}
