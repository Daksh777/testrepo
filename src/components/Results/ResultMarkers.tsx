import { MapInstance } from "react-map-gl/maplibre";
import { NearbyLocation } from "../../types/types";
import { useEffect, useState } from "react";
import { LngLatBounds } from "maplibre-gl";
import Markers from "./Markers";
import Popup from "./Popup";
import { bngToWgs84 } from "../utils/mapUtils";

const ResultMarkers = ({
  map,
  nearbyLocations,
}: {
  map: MapInstance;
  nearbyLocations: NearbyLocation[];
}) => {
  const [activeFeature, setActiveFeature] = useState<NearbyLocation | null>(
    null
  );
  useEffect(() => {
    if (nearbyLocations.length > 0) {
      const bounds = nearbyLocations.reduce((bounds, location) => {
        return bounds.extend(bngToWgs84(location.bng_x, location.bng_y));
      }, new LngLatBounds());
      map.fitBounds(bounds, {
        padding: 50,
      });
    }
  }, [map, nearbyLocations]);

  const handleMarkerClick = (location: NearbyLocation) => {
    const newCopyOfLocation = { ...location };
    setActiveFeature(newCopyOfLocation);
  };

  return (
    <>
      {nearbyLocations.map((location, index) => (
        <Markers
          key={location.nhood_id}
          location={location}
          map={map}
          handleMarkerClick={handleMarkerClick}
          rank={index + 1}
        />
      ))}
      {activeFeature && <Popup map={map} activeFeature={activeFeature} />}
    </>
  );
};

export default ResultMarkers;
