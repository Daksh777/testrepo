import { Heart } from "lucide-react";
import { memo } from "react";

import useNeighbourhLiked from "@/hooks/isNeighbourhLiked";
import { Link } from "react-router";
import { THUMBNAIL_BASE_URL } from "@/shared";

interface PostCodeProps {
  location: any;
}

const PostCode = ({ location }: PostCodeProps) => {
  const { isLiked, removeLikedLocation, addLikedLocation } = useNeighbourhLiked(
    {
      neighbour_id: location.neighborhood_id,
    }
  );

  const handleAddLikedLocation = () => {
    addLikedLocation({
      ...location,
    });
  };

  return (
    <div className="bg-white rounded-md shadow flex flex-col p-2 text-[#0e2245]">
      <div className="relative h-36 bg-gray-200 rounded-md">
        <img
          src={`${THUMBNAIL_BASE_URL}${location.neighborhood_id}.webp`}
          alt={location.name}
          className="w-full h-full object-fill z-10"
        />
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
      </div>
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-col">
          <div className="text-xs font-light">
            <span className="font-medium">City:</span> {location.city || "N/A"}
          </div>
          <div className="text-xs font-light">
            <span className="font-medium">County:</span>{" "}
            {location.country || "N/A"}
          </div>
        </div>
        <Link
          to={`/overview/${location.neighborhood_id}`}
          target="_blank"
          className="text-xs bg-gray-100 px-2 py-1 rounded-md h-fit text-base-green font-medium cursor-pointer hover:bg-gray-200 transition-all duration-300"
        >
          More details
        </Link>
      </div>
    </div>
  );
};

export default memo(PostCode);
