import { Heart } from "lucide-react";
import { CompareCard as CompareCardType } from "@/types/compareTypes";
import { Link } from "react-router";
import useNeighbourhLiked from "@/hooks/isNeighbourhLiked";
import { THUMBNAIL_BASE_URL } from "@/shared";
import useIsMobile from "@/hooks/useIsMobile";

export interface CompareCardProps {
  data: CompareCardType;
}

const CompareCard = (props: CompareCardProps) => {
  const { data } = props;
  const { isMobile } = useIsMobile();
  const { isLiked, addLikedLocation, removeLikedLocation } = useNeighbourhLiked(
    { neighbour_id: data.nhood_id }
  );
  const handleLikeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (isLiked) {
      removeLikedLocation();
    } else {
      addLikedLocation({
        name: data.name,
        country: data.country || "N/A",
        city: data.city || "N/A",
        neighborhood_id: data.nhood_id,
      });
    }
  };
  return (
    <Link to={`/overview/${data.nhood_id}`} target="_blank">
      <div className={`w-full overflow-hidden ${isMobile ? "p-1" : "p-2"}`}>
        <div className="relative">
          <img
            src={`${THUMBNAIL_BASE_URL}${data.nhood_id}.webp`}
            alt={`Map of ${data.name}`}
            className={`w-full object-fill rounded-xl ${
              isMobile ? "h-24" : "h-36"
            }`}
          />
          {typeof isLiked === "boolean" && (
            <button
              className={`absolute top-1 right-1 ${
                isMobile ? "p-0.5" : "p-1"
              } cursor-pointer`}
              onClick={handleLikeToggle}
            >
              <Heart
                className={`${isMobile ? "h-4 w-4" : "h-6 w-6"} stroke-1 ${
                  isLiked
                    ? "fill-base-green text-white"
                    : "fill-white text-base-green"
                }`}
              />
            </button>
          )}
        </div>
        <div className={`${isMobile ? "mt-1" : "mt-2"}`}>
          <div className="flex justify-between items-center">
            <h2
              className={`${
                isMobile ? "text-sm" : "text-base"
              } font-bold text-primary-blue dark:text-white truncate`}
            >
              {data?.name}
            </h2>
            <span
              className={`${
                isMobile ? "text-xs" : "text-xs"
              } font-semibold text-gray-500 dark:text-gray-300 ml-1`}
            >
              Rank:{" "}
              <span className="font-light text-gray-500">{data?.rank}</span>
            </span>
          </div>
          <div
            className={`flex flex-row justify-between items-center ${
              isMobile ? "mt-1" : "mt-2"
            }`}
          >
            <div className="flex-1 mr-2">
              <div
                className={`${
                  isMobile ? "text-xs" : "text-xs"
                } text-gray-600 dark:text-gray-400 flex flex-row items-center`}
              >
                <div className="font-medium">City:</div>
                <span className="font-light text-gray-500 pl-1 truncate">
                  {data?.city}
                </span>
              </div>
              <div
                className={`${
                  isMobile ? "text-xs" : "text-xs"
                } text-gray-600 dark:text-gray-400 flex flex-row items-center`}
              >
                <div className="font-medium">County:</div>
                <span className="font-light text-gray-500 pl-1 truncate">
                  {data?.country}
                </span>
              </div>
            </div>

            <div
              className={`${
                isMobile ? "text-xs px-1.5 py-0.5" : "text-xs px-2 py-1"
              } bg-gray-100 rounded-md h-fit text-base-green font-medium cursor-pointer hover:bg-gray-200 transition-all duration-300 shrink-0`}
            >
              {isMobile ? "Details" : "More details"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompareCard;
