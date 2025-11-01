import { useEffect, useRef, useState } from "react";
import { Popup as MapboxPopup } from "maplibre-gl";
import { MapInstance } from "react-map-gl/maplibre";
import { NearbyLocation } from "../../types/types";
import "./popup.css";
import useCompareStore from "@/stores/compareStore";
import { bngToWgs84 } from "../utils/mapUtils";
import useNeighbourhLiked from "@/hooks/isNeighbourhLiked";

const Popup = ({
  map,
  activeFeature,
}: {
  map: MapInstance;
  activeFeature: NearbyLocation;
}) => {
  // a ref to hold the popup instance
  const popupRef = useRef<MapboxPopup | null>(null);
  const { selectedLocations, addLocation, removeLocation } = useCompareStore();

  const { isLiked, addLikedLocation, removeLikedLocation } = useNeighbourhLiked(
    { neighbour_id: activeFeature.nhood_id }
  );
  const [compareChecked, setCompareChecked] = useState(false);

  // Create a DOM handler for checkbox changes
  const handleCheckboxChange = () => {
    if (compareChecked) {
      removeLocation(activeFeature);
    } else {
      addLocation(activeFeature);
    }
  };

  // Create a DOM handler for save button clicks
  const handleSaveClick = () => {
    if (isLiked) {
      removeLikedLocation();
    } else {
      addLikedLocation({
        neighborhood_id: activeFeature.nhood_id,
        name: activeFeature.name,
        country: activeFeature.utla22nm || "N/A",
        city: activeFeature.lad24nm || "N/A",
      });
    }
  };

  // instantiate the popup on mount, remove it on unmount
  useEffect(() => {
    if (!map) return;

    // Create a new popup instance
    popupRef.current = new MapboxPopup({
      closeOnClick: false,
      offset: 20,
      className: "custom-popup",
      closeOnMove: true,
      closeButton: false,
    });

    // Create the initial content
    updatePopupContent();

    return () => {
      popupRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    setCompareChecked(
      selectedLocations.some((loc) => loc.nhood_id === activeFeature.nhood_id)
    );
  }, [selectedLocations, activeFeature]);

  // Update the popup content
  const updatePopupContent = () => {
    if (!activeFeature || !popupRef.current) return;

    // Create popup content manually
    const popupContent = document.createElement("div");
    popupContent.className = "text-black text-xs p-2";

    // Add name
    const nameDiv = document.createElement("div");
    nameDiv.className = "flex flex-row items-center gap-2 mb-1";
    const nameLabel = document.createElement("div");
    nameLabel.className = "font-medium";
    nameLabel.textContent = "Name:";
    const nameValue = document.createElement("div");
    nameValue.className = "font-normal";
    nameValue.textContent = activeFeature.name;
    nameDiv.appendChild(nameLabel);
    nameDiv.appendChild(nameValue);
    popupContent.appendChild(nameDiv);

    // // Add match
    // const matchDiv = document.createElement("div");
    // matchDiv.className = "flex flex-row items-center gap-2 mb-1";
    // const matchLabel = document.createElement("div");
    // matchLabel.className = "font-medium";
    // matchLabel.textContent = "Match:";
    // const matchValue = document.createElement("div");
    // matchValue.className = "font-normal";
    // matchValue.textContent = `${activeFeature.match} %`;
    // matchDiv.appendChild(matchLabel);
    // matchDiv.appendChild(matchValue);
    // popupContent.appendChild(matchDiv);

    // Add compare checkbox
    const compareDiv = document.createElement("div");
    compareDiv.className = "flex flex-row items-center gap-2 mb-1";
    const compareLabel = document.createElement("div");
    compareLabel.className = "font-medium";
    compareLabel.textContent = "Compare:";

    const checkboxContainer = document.createElement("div");
    checkboxContainer.className = "checkbox-container";

    const checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.checked = compareChecked;
    checkboxInput.className = "outline-none";
    checkboxInput.addEventListener("change", handleCheckboxChange);

    checkboxContainer.appendChild(checkboxInput);
    compareDiv.appendChild(compareLabel);
    compareDiv.appendChild(checkboxContainer);
    popupContent.appendChild(compareDiv);

    // Add save button
    const saveDiv = document.createElement("div");
    saveDiv.className = "flex flex-row items-center gap-2";
    const saveLabel = document.createElement("div");
    saveLabel.className = "font-medium";
    saveLabel.textContent = "Save:";

    const heartButton = document.createElement("div");
    heartButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${
      isLiked ? "#3B8C6E" : "white"
    }" stroke="#3B8C6E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    heartButton.className = "cursor-pointer";
    heartButton.addEventListener("click", handleSaveClick);

    saveDiv.appendChild(saveLabel);
    saveDiv.appendChild(heartButton);
    popupContent.appendChild(saveDiv);

    // Set popup position and content
    popupRef.current
      .setLngLat(bngToWgs84(activeFeature.bng_x, activeFeature.bng_y))
      .setDOMContent(popupContent)
      .addTo(map);
  };

  // Update popup content when state changes
  useEffect(() => {
    updatePopupContent();
  }, [activeFeature, compareChecked, isLiked]);

  // Return an empty fragment as we're not using React's portal anymore
  return null;
};

export default Popup;
