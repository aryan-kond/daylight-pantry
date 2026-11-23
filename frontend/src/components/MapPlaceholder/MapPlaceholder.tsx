import { MapPin } from 'lucide-react';
import './MapPlaceholder.css';

/** DEMO: a stand-in for a real map. Replace the contents with a map embed when there is one. */
export default function MapPlaceholder() {
  return (
    <div
      className="map-placeholder"
      role="img"
      aria-label="Map placeholder showing where the shop is"
    >
      {/* Faint blocks and roads, only to look like a map */}
      <svg
        className="map-placeholder__art"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="400" height="300" fill="#f1f4f9" />

        <g fill="#e6ebf3">
          <rect x="10" y="10" width="125" height="95" rx="8" />
          <rect x="165" y="10" width="110" height="95" rx="8" />
          <rect x="305" y="10" width="85" height="95" rx="8" />
          <rect x="10" y="135" width="125" height="70" rx="8" />
          <rect x="165" y="135" width="110" height="70" rx="8" />
          <rect x="305" y="135" width="85" height="70" rx="8" />
          <rect x="10" y="235" width="125" height="55" rx="8" />
          <rect x="165" y="235" width="110" height="55" rx="8" />
          <rect x="305" y="235" width="85" height="55" rx="8" />
        </g>

        {/* Each road is drawn twice: a grey outline, then a white line on top */}
        <g fill="none" strokeLinecap="round">
          <g stroke="#dde3ec" strokeWidth="18">
            <path d="M-10 120H410" />
            <path d="M-10 220H410" />
            <path d="M150 -10V310" />
            <path d="M290 -10V310" />
            <path d="M200 -10L410 150" />
          </g>
          <g stroke="#ffffff" strokeWidth="13">
            <path d="M-10 120H410" />
            <path d="M-10 220H410" />
            <path d="M150 -10V310" />
            <path d="M290 -10V310" />
            <path d="M200 -10L410 150" />
          </g>
        </g>
      </svg>

      <span className="map-placeholder__pin">
        <MapPin size={22} aria-hidden="true" />
      </span>
      <span className="map-placeholder__label">Map placeholder</span>
    </div>
  );
}
