import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Leaflet from "leaflet";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

// Centraliza pelo Mapa de Dourados/MS
const mapIcon = Leaflet.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

function MapCustom({ orphanages }) {
  return (
    <Map
      center={[-22.227077, -54.8025487]}
      zoom={15}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_TOKEN}`}
      />

      {orphanages.map((orphanage) => (
        <Marker
          key={orphanage.id}
          icon={mapIcon}
          position={[orphanage.latitude, orphanage.longitude]}
        >
          <Popup
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className="map-popup"
          >
            {orphanage.name}
            <Link href={`orphanages/${orphanage.id}`}>
              <a>
                <FiArrowRight size={20} color="#fff" />
              </a>
            </Link>
          </Popup>
        </Marker>
      ))}
    </Map>
  );
}

export default MapCustom;
