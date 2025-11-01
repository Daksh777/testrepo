import api from "@/lib/api";
import { BACKEND_URL } from "@/shared";
import { MapInstance, MapMouseEvent } from "react-map-gl/maplibre";

const wfsLayer = `${BACKEND_URL}/api/data/wms/`;
export const getFeatureInfo = (
  e: MapMouseEvent,
  map: MapInstance,
  layer: string,
  abortController: AbortController | null
) => {
  const urlParams = new URLSearchParams();
  urlParams.set("service", "WMS");
  urlParams.set("version", "1.1.1");
  urlParams.set("request", "GetFeatureInfo");
  urlParams.set("layers", layer);
  urlParams.set("query_layers", layer);
  urlParams.set("info_format", "application/json");

  // Convert MapLibre bounds to the format needed for WMS (minX,minY,maxX,maxY)
  const bounds = map.getBounds();
  const bbox = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;
  urlParams.set("bbox", bbox);

  // Get container size
  const width = map.getContainer().clientWidth;
  const height = map.getContainer().clientHeight;
  urlParams.set("width", width.toString());
  urlParams.set("height", height.toString());

  // Convert geographic coordinates to pixel coordinates
  const point = map.project(e.lngLat);
  urlParams.set("x", Math.floor(point.x).toString());
  urlParams.set("y", Math.floor(point.y).toString());

  urlParams.set("srs", "EPSG:4326");
  urlParams.set("feature_count", "1");
  urlParams.set("exceptions", "application/vnd.ogc.se_inimage");

  const wmsUrl = `${wfsLayer}?${urlParams.toString()}`;
  return api.get(wmsUrl, {
    signal: abortController?.signal,
  });
};
