import { Minus } from "lucide-react";
import useCompareStore from "@/stores/compareStore";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { THUMBNAIL_BASE_URL } from "@/shared";

const CompareRow = ({ usePreferences = {} }: { usePreferences: any }) => {
  const navigate = useNavigate();
  const { selectedLocations, removeLocation, resetLocations } =
    useCompareStore();

  const onCompare = () => {
    if (selectedLocations.length < 2) {
      toast.error("Please select at least 2 places to compare");
      return;
    }
    navigate("/compare", {
      state: {
        locations: selectedLocations,
        userPreferences: usePreferences,
      },
    });
  };
  useEffect(() => {
    resetLocations();
  }, []);

  if (selectedLocations.length == 0) {
    return null;
  }
  return (
    <div className="bg-white rounded-md flex flex-row justify-end items-center px-6 gap-4 text-black">
      <div className="text-xs font-medium text-gray-500">
        Select 2- 4 places to compare
      </div>
      {selectedLocations.map((location) => (
        <div className="flex flex-col justify-center my-1 relative">
          <div
            onClick={() => removeLocation(location)}
            className="bg-red-400 rounded-full p-1 w-fit absolute -top-1 -left-2 cursor-pointer"
          >
            <Minus className="text-white h-2 w-2" />
          </div>
          <div className="h-14 w-20 bg-gray-100 rounded-md overflow-hidden">
            <img
              src={`${THUMBNAIL_BASE_URL}${location.nhood_id}.webp`}
              alt={location.name}
              className="w-full h-full object-fill"
            />
          </div>
          <div className="text-sm font-semibold">{location.name}</div>
        </div>
      ))}

      {selectedLocations.length > 1 && (
        <div
          onClick={onCompare}
          className="bg-base-green text-white rounded-md px-4 py-2 text-sm font-medium cursor-pointer hover:scale-105 transition-all duration-300"
        >
          Compare
        </div>
      )}
    </div>
  );
};

export default CompareRow;
