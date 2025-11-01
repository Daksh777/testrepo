import { BACKEND_URL } from "@/shared";
import BreadCrumb from "../utils/BreadCrumb";
import SharedBg from "../utils/SharedBg";
import FeatureInfo from "./FeatureInfo";
import MapComponent from "../Map/MapComponent";
import { useEffect, useState } from "react";
import { MapInstance } from "react-map-gl/maplibre";
import { useLocation } from "react-router";
import { useAuthStore } from "@/stores/authStore";

const ReferenceLocation = () => {
  const [map, setMap] = useState<MapInstance | null>(null);
  const user = useAuthStore((state) => state.user);
  const { state } = useLocation();
  const lat = state?.lat ? parseFloat(state.lat) : null;
  const lng = state?.lng ? parseFloat(state.lng) : null;

  useEffect(() => {
    if (!map) return;
    map.addSource("wms-layer", {
      type: "raster",
      tiles: [
        `${BACKEND_URL}/api/data/wms/?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&STYLES&LAYERS=unmapt:nhood&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&SRS=EPSG:3857&WIDTH=256&HEIGHT=256&BBOX={bbox-epsg-3857}`,
      ],
    });
    map.addLayer({
      id: "wms-layer",
      type: "raster",
      source: "wms-layer",
    });
    return () => {
      if (map && map.getLayer("wms-layer")) {
        map.removeLayer("wms-layer");
        map.removeSource("wms-layer");
      }
    };
  }, [map]);

  const simulateMapClick = (lat: number, lng: number) => {
    if (!map) return;

    // Create a synthetic click event
    const point = map.project([lng, lat]);
    const clickEvent = {
      point: { x: point.x, y: point.y },
      lngLat: { lng, lat },
      target: map,
    };

    // Trigger the click handler
    map.fire("click", clickEvent);
  };

  useEffect(() => {
    if (lat && lng && map) {
      simulateMapClick(lat, lng);
    }
  }, [lat, lng, map]);

  return (
    <div className="min-h-[calc(100vh-4rem)] relative bg-base-secondary flex flex-col text-white">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <SharedBg />
      </div>
      <div className="absolute top-4 left-10 md:left-20">
        <BreadCrumb
          flow={[
            {
              link: "/",
              label: "Search",
            },
            {
              link: `/reference-location`,
              label: "Choose reference location",
            },
          ]}
        />
      </div>
      <div className="flex flex-col px-10 md:px-20 mt-12 md:mt-16 z-10 justify-center items-center my-auto">
        <div className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center">
          Select a Reference Location{" "}
        </div>
        <div className="text-sm md:text-base lg:text-lg text-center mt-4">
          Just click on the map to choose a reference location.
        </div>
        <div className="overflow-hidden relative flex flex-col w-full  md:w-[80%] lg:w-[70%] h-[60vh]  rounded-4xl  my-8 md:my-16 justify-center items-center bg-gray-100 border-4 border-base-secondary">
          <MapComponent
            setMap={setMap}
            defaultLat={lat}
            defaultLng={lng}
            token={user?.token}
          />

          {map && <FeatureInfo map={map} />}
        </div>
      </div>
    </div>
  );
};

export default ReferenceLocation;
