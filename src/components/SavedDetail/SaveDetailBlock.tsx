import { Heart } from "lucide-react";
import { memo, useEffect, useState } from "react";

import useNeighbourhLiked from "@/hooks/isNeighbourhLiked";
import { Link } from "react-router";
import { NearbyLocation } from "@/types/types";
import { Checkbox } from "../ui/checkbox";
import useCompareStore from "@/stores/compareStore";
import { toast } from "sonner";
import { THUMBNAIL_BASE_URL } from "@/shared";

interface PostCodeProps {
  location: NearbyLocation;
}

const SaveDetailBlock = ({ location }: PostCodeProps) => {
  const [checked, setChecked] = useState(false);
  const { isLiked, removeLikedLocation, addLikedLocation } = useNeighbourhLiked(
    {
      neighbour_id: location.nhood_id,
    }
  );
  const { selectedLocations, addLocation, removeLocation } = useCompareStore();
  const handleAddLikedLocation = () => {
    addLikedLocation({
      neighborhood_id: location.nhood_id,
      name: location.name,
      country: location.utla22nm || "N/A",
      city: location.lad24nm || "N/A",
    });
  };

  const handleCheckboxChange = () => {
    if (checked) {
      removeLocation(location);
    } else {
      if (selectedLocations.length < 4) {
        addLocation(location);
      } else {
        toast.error("You can only select max 4 locations", {
          position: "bottom-right",
          richColors: true,
        });
      }
    }
  };

  useEffect(() => {
    setChecked(
      selectedLocations.some((loc) => loc.nhood_id === location.nhood_id)
    );
  }, [selectedLocations, location]);

  return (
    <div className="bg-white rounded-md shadow flex flex-col p-2 text-[#0e2245]">
      <div className="relative h-36 bg-gray-200 rounded-md">
        <img
          src={`${THUMBNAIL_BASE_URL}${location.nhood_id}.webp`}
          alt={location.name}
          className="w-full h-full object-fill z-10"
        />
        <div className="absolute top-2 left-2 flex flex-row items-center gap-2">
          <div className="text-xs bg-base-green text-white py-1 px-2 rounded-full">
            Compare
          </div>
          <Checkbox
            checked={checked}
            onCheckedChange={handleCheckboxChange}
            className="cursor-pointer bg-white h-4 w-4 border-base-green data-[state=checked]:bg-base-green data-[state=checked]:text-white data-[state=checked]:border-base-green"
          />
        </div>
        {isLiked !== null && (
          <div className="absolute top-2 right-2 cursor-pointer">
            <Heart
              className={`h-6 w-6  stroke-1 ${
                isLiked
                  ? "fill-base-green text-white"
                  : "fill-white text-base-green"
              }`}
              onClick={() =>
                isLiked ? removeLikedLocation() : handleAddLikedLocation()
              }
            />
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-row items-center">
        <div className="text-base font-semibold text-black">
          {location.name}
        </div>
        <div className="text-xs ml-auto font-light shrink-0">
          <span className="font-medium">Rank:</span> {location.rank}
        </div>
      </div>
      <div className="flex flex-row justify-between items-end my-auto">
        <div className="flex flex-col">
          {/* <div className="text-xs font-light">
            <span className="font-medium">Match:</span> {location.match}%
          </div> */}
          <div className="text-xs font-light">
            <span className="font-medium">City:</span>{" "}
            {location.lad24nm || "N/A"}
          </div>
          <div className="text-xs font-light">
            <span className="font-medium">County:</span>{" "}
            {location.utla22nm || "N/A"}
          </div>
        </div>
        <Link
          to={`/overview/${location.nhood_id}`}
          target="_blank"
          className="text-xs bg-gray-100 px-2 py-1 rounded-md h-fit text-base-green font-medium cursor-pointer hover:bg-gray-200 transition-all duration-300"
        >
          More details
        </Link>
      </div>
    </div>
  );
};

export default memo(SaveDetailBlock);
