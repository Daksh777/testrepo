import { NearbyLocation } from "@/types/types";
import { Marker } from "maplibre-gl";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MapInstance } from "react-map-gl/maplibre";
import { bngToWgs84 } from "../utils/mapUtils";

const Markers = ({
  location,
  map,
  handleMarkerClick,
  rank,
}: {
  location: NearbyLocation;
  map: MapInstance;
  handleMarkerClick: (location: NearbyLocation) => void;
  rank: number;
}) => {
  const markerRef = useRef<Marker | null>(null);
  // a ref for an element to hold the marker's content
  const contentRef = useRef(document.createElement("div"));

  // instantiate the marker on mount, remove it on unmount
  useEffect(() => {
    markerRef.current = new Marker({
      element: contentRef.current,
    })
      .setLngLat(bngToWgs84(location.bng_x, location.bng_y))
      .addTo(map);

    return () => {
      markerRef.current?.remove();
    };
  }, []);
  return (
    <>
      {createPortal(
        <div
          onClick={() => handleMarkerClick(location)}
          style={{
            width: "24px",
            height: "24px",
            backgroundColor: "#0e2245",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            border: "2px solid white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
          className="custom-marker cursor-pointer"
        >
          {rank}
        </div>,
        contentRef.current
      )}
    </>
  );
};

export default Markers;
