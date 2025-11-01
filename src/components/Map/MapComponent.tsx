import Map, { MapInstance, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { BACKEND_URL } from "@/shared";

const MapComponent = ({
  setMap,
  defaultLat,
  defaultLng,
  token,
}: {
  setMap: (map: MapInstance | null) => void;
  defaultLat?: number | null;
  defaultLng?: number | null;
  token?: string | null;
}) => {
  return (
    <div className="w-full h-full">
      <Map
        onRender={(e) => {
          setMap(e.target as unknown as MapInstance);
        }}
        initialViewState={{
          longitude: defaultLng || -0.09,
          latitude: defaultLat || 51.505,
          zoom: 13,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={{
          version: 8,
          sources: {
            osm: {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "© OpenStreetMap Contributors",
            },
          },
          layers: [
            {
              id: "osm",
              type: "raster",
              source: "osm",
            },
          ],
        }}
        transformRequest={(url) => {
          if (url.startsWith(BACKEND_URL)) {
            return {
              url: url,
              headers: { Authorization: `Bearer ${token}` },
            };
          }
        }}
      >
        <NavigationControl position="top-left" />
      </Map>
    </div>
  );
};

export default MapComponent;
