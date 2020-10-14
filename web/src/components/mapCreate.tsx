import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Leaflet from "leaflet";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import mapIcon from "@/utils/mapIcon";

interface MapCreateProps {
  handleMapClick: () => void;
  position: { latitudade: string; longigute: string };
}

function MapCreate({ handleMapClick, position }) {
  return (
    <Map
      center={[-22.227077, -54.8025487]}
      style={{ width: "100%", height: 280 }}
      zoom={15}
      onClick={handleMapClick}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_TOKEN}`}
      />

      {position.latitude !== 0 && (
        <Marker
          interactive={false}
          icon={mapIcon}
          position={[position.latitude, position.longitude]}
        />
      )}
    </Map>
  );
}

export default MapCreate;
