import { ExternalLink } from 'lucide-react';
import './MapPlaceholder.css';

type MapPlaceholderProps = {
  /** Shop name shown on the card */
  title: string;
  /** One-line address shown on the card and used for the Open in Maps link */
  address: string;
};

/**
 * DEMO: a stand-in that looks like an embedded map. The "Open in Maps" link is real.
 * When there is a real shop address, replace the art and pin with a map embed and keep the card.
 */
export default function MapPlaceholder({ title, address }: MapPlaceholderProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="map-placeholder" role="group" aria-label="Map showing where the shop is">
      {/* Street-map look: water, a park, blocks and roads. Only for show. */}
      <svg
        className="map-placeholder__art"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="400" height="300" fill="#f1efe9" />

        {/* River along the bottom */}
        <path
          d="M-10 268C80 244 160 292 250 266S375 238 410 248"
          fill="none"
          stroke="#aad3f5"
          strokeWidth="40"
          strokeLinecap="round"
        />

        {/* City blocks */}
        <g fill="#e8e4db">
          <rect x="10" y="12" width="76" height="48" rx="6" />
          <rect x="108" y="12" width="98" height="48" rx="6" />
          <rect x="10" y="84" width="76" height="56" rx="6" />
          <rect x="108" y="84" width="98" height="56" rx="6" />
          <rect x="226" y="84" width="94" height="56" rx="6" />
          <rect x="342" y="84" width="48" height="56" rx="6" />
          <rect x="10" y="164" width="76" height="64" rx="6" />
          <rect x="108" y="164" width="98" height="64" rx="6" />
          <rect x="226" y="164" width="94" height="64" rx="6" />
          <rect x="342" y="164" width="48" height="64" rx="6" />
        </g>

        {/* Park with a few trees */}
        <rect x="236" y="14" width="140" height="58" rx="14" fill="#cfe8c4" />
        <g fill="#b8dba9">
          <circle cx="268" cy="38" r="9" />
          <circle cx="300" cy="52" r="11" />
          <circle cx="336" cy="34" r="8" />
          <circle cx="352" cy="56" r="7" />
        </g>

        {/* Roads: a grey outline first, then the road on top */}
        <g fill="none" strokeLinecap="round">
          <g stroke="#dcd7cc" strokeWidth="12">
            <path d="M-10 72H410" />
            <path d="M-10 152H410" />
            <path d="M96 -10V310" />
            <path d="M214 -10V310" />
            <path d="M330 -10V310" />
          </g>
          <g stroke="#ffffff" strokeWidth="9">
            <path d="M-10 72H410" />
            <path d="M-10 152H410" />
            <path d="M96 -10V310" />
            <path d="M214 -10V310" />
            <path d="M330 -10V310" />
          </g>

          {/* Main road */}
          <path d="M-10 214C120 190 240 130 410 100" stroke="#eacb6f" strokeWidth="16" />
          <path d="M-10 214C120 190 240 130 410 100" stroke="#fde7a0" strokeWidth="12" />
        </g>

        {/* Street names */}
        <g fill="#6f7782" fontSize="8" fontWeight="500">
          <text x="20" y="149">
            Sample Street
          </text>
          <text x="226" y="69">
            Harbour Road
          </text>
        </g>
      </svg>

      {/* Info card, top left, like an embedded map */}
      <div className="map-placeholder__card">
        <p className="map-placeholder__title">{title}</p>
        <p className="map-placeholder__address">{address}</p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="button-primary map-placeholder__open"
        >
          <ExternalLink size={16} aria-hidden="true" />
          Open in Maps
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>

      {/* Pin */}
      <svg
        className="map-placeholder__pin"
        viewBox="0 0 28 38"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M14 0C6.3 0 0 6.2 0 13.9c0 9.6 11.2 22.1 13 23.9a1.4 1.4 0 0 0 2 0C16.8 36 28 23.5 28 13.9 28 6.2 21.7 0 14 0Z"
          fill="#f47b35"
        />
        <circle cx="14" cy="14" r="5.5" fill="#ffffff" />
      </svg>
    </div>
  );
}
