import { Map, TileLayer } from "react-leaflet";

function MapCustom() {
  return (
    <Map
      center={[-22.227077, -54.8025487]}
      zoom={15}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_TOKEN}`}
      />
    </Map>
  );
}

export default MapCustom;
