/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { MapInstance } from "react-map-gl/maplibre";
import { getFeatureInfo } from "../utils/getFeatureInfo";
import { Feature, MapMouseEvent } from "maplibre-gl";
import { bbox } from "@turf/bbox";
import { useNavigate } from "react-router";
import { useBreadCrumbStore } from "@/stores/breadCrumbStore";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

const FeatureInfo = ({ map }: { map: MapInstance }) => {
  const abortControllerRef = useRef<AbortController | null>(null);
  const [featureInfo, setFeatureInfo] = useState<Feature | null>(null);
  const setBreadCrumbs = useBreadCrumbStore((state) => state.setBreadCrumbs);
  const navigate = useNavigate();
  const GetFeatureInfo = useCallback(
    async (event: MapMouseEvent) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      await getFeatureInfo(
        event,
        map,
        "unmapt:nhood",
        abortControllerRef.current
      )
        .then((res) => {
          if (res.data.numberReturned == 0) return;
          const feature = res.data.features[0];

          if (featureInfo) {
            map.removeLayer(featureInfo.id + "-fill");
            map.removeLayer(featureInfo.id + "-border");
            map.removeSource(featureInfo.id);
          }

          // Add source
          map.addSource(feature.id, {
            type: "geojson",
            data: feature,
          });

          map.addLayer({
            id: `${feature.id}-border`,
            type: "line",
            source: feature.id,
            paint: {
              "line-color": "#0e2245",
              "line-width": 2,
            },
          });

          map.addLayer(
            {
              id: `${feature.id}-fill`,
              type: "fill",
              source: feature.id,
              paint: {
                "fill-color": "#0e2245",
                "fill-opacity": 0.4,
              },
            },
            feature.id + "-border"
          );

          const bounds = bbox(feature);
          map.fitBounds(
            [
              [bounds[0], bounds[1]],
              [bounds[2], bounds[3]],
            ],
            { padding: 50 }
          );

          setFeatureInfo(feature);
        })
        .catch((err) => {
          if (err.response?.status === 403) {
            toast.error("You are not authorized to access this resource");
            navigate("/user/profile");
            return;
          }
        });
    },
    [featureInfo]
  );

  useEffect(() => {
    map.on("click", GetFeatureInfo);
    return () => {
      map.off("click", GetFeatureInfo);
    };
  }, [map, GetFeatureInfo]);

  const onNext = () => {
    const statePayload = {
      nhood: featureInfo?.properties?.nhood_id,
      display_name: featureInfo?.properties?.name,
    };
    navigate(`/preferences`, { state: statePayload });
    setBreadCrumbs("/preferences", statePayload);
  };

  if (featureInfo) {
    return (
      <>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-primary-blue text-sm font-medium bg-gray-100/50 backdrop-blur px-4 py-1 rounded-full text-center">
          {featureInfo.properties.name}
        </div>
        <div
          onClick={onNext}
          className="flex items-center gap-2 absolute text-base md:text-lg right-4 top-4 bg-primary-blue  text-white px-4 py-1 rounded-full font-medium tracking-wide border-2 border-white cursor-pointer hover:bg-base-green transition-all duration-300"
        >
          <span>Next</span>
          <ArrowRight
            className="w-4 h-4 md:w-5 md:h-5 animate-caret-blink"
            strokeWidth={3}
          />
        </div>
      </>
    );
  }

  return null;
};

export default FeatureInfo;
