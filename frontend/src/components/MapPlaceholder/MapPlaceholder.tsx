import { ExternalLink } from 'lucide-react';
import './MapPlaceholder.css';

type MapPlaceholderProps = {
  /** Shop name, used for the map's accessible title and the fallback card */
  title: string;
  /** One-line address, used by the fallback card and its Open in Maps link */
  address: string;
  /** Google Maps embed link. When given, the real interactive map is shown. */
  embedUrl?: string;
};

/** Real Google map when embedUrl is set, otherwise a simple card with an Open in Maps link */
export default function MapPlaceholder({ title, address, embedUrl }: MapPlaceholderProps) {
  // Real map: Google draws its own card, pin and controls
  if (embedUrl) {
    return (
      <div className="map-placeholder" role="group" aria-label="Map showing where the shop is">
        <iframe
          title={`Map showing ${title}`}
          src={embedUrl}
          className="map-placeholder__embed"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  // No embed link yet: show the address with a link that opens it in Google Maps
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div
      className="map-placeholder map-placeholder--plain"
      role="group"
      aria-label="Where the shop is"
    >
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
    </div>
  );
}
