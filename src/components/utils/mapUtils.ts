import proj4 from "proj4";

// Define the coordinate systems
const bng =
  "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs";
const wgs84 = "+proj=longlat +datum=WGS84 +no_defs";

// Function to convert BNG to WGS84
export const bngToWgs84 = (x: number, y: number): [number, number] => {
  const [lon, lat] = proj4(bng, wgs84, [x, y]);
  return [lon, lat];
};
