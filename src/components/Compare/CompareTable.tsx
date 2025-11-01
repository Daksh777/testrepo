/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import CompareCard from "./CompareCard";
import { StarRating } from "../StarRating/StarRating";
import { NearbyLocation } from "@/types/types";
import { Badge } from "../ui/badge";
import useIsMobile from "@/hooks/useIsMobile";
import SchoolQualtiy from "../Preference/SchoolQualtiy";

// dummy data -> replace with the API data

export const criteria: {
  label: string;
  dataKey: string;
  format?: (value: any) => string;
}[] = [
  {
    label: "Average House Price",
    dataKey: "hpi4",
    format: (value: number) => `£ ${value.toLocaleString()}`,
  },
  {
    label: "School Quality",
    dataKey: "school_quality",
  },
  {
    label: "Low Crime",
    dataKey: "street_safety",
  },
  {
    label: "Flood Safety",
    dataKey: "flood_safety",
  },
  {
    label: "Trains to London",
    dataKey: "rail_London_service",
  },
  {
    label: "Rail Connectivity Overall",
    dataKey: "rail_general_service",
  },
  {
    label: "Community Spaces",
    dataKey: "amenity_community",
  },
  {
    label: "Food and Drink",
    dataKey: "amenity_foodbev",
  },
  {
    label: "Local Parks",
    dataKey: "green_spaces",
  },
  {
    label: "Nearby Nature",
    dataKey: "nearby_nature",
  },
  {
    label: "Culture & Entertainment",
    dataKey: "culture_entertain",
  },
  {
    label: "Low Noise",
    dataKey: "background_noise",
  },
  {
    label: "Cycling and Walking",
    dataKey: "walk_bike",
  },
];

const CompareTable = ({
  locations,
  userPreferences,
  filters,
}: {
  locations: NearbyLocation[];
  userPreferences: any;
  filters: any;
}) => {
  const { isMobile } = useIsMobile();

  return (
    <div className="w-full">
      {/* Mobile hint */}
      {isMobile && (
        <div className="mb-4 mx-4">
          <div className="bg-primary-blue/10 border border-primary-blue/20 rounded-lg p-3 text-center">
            <p className="text-xs text-primary-blue font-medium">
              💡 Swipe horizontally to compare all locations
            </p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto w-[calc(100%-2rem)] mx-auto">
        <div className="min-w-max inline-block">
          <table className="table-auto relative font-montserrat shadow-md rounded-lg">
            <thead className="text-white">
              <tr>
                <th
                  className={`sticky left-0 z-20 ${
                    isMobile ? "min-w-40" : "md:min-w-64 min-w-48"
                  } px-4 py-4 text-left font-semibold bg-base-secondary`}
                ></th>
                <th
                  className={`${
                    isMobile ? "min-w-40" : "md:min-w-64 min-w-48"
                  } px-4 font-semibold relative`}
                >
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-base-green hover:bg-base-green text-white text-xs">
                      Your Preferences
                    </Badge>
                  </div>
                </th>
                {locations?.map((location) => (
                  <th
                    key={location.nhood_id}
                    className={`bg-white ${
                      isMobile ? "min-w-56" : "md:max-w-96 md:min-w-64 min-w-48"
                    } shrink-0 text-primary-blue shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] border-b-4 border-base-green`}
                  >
                    <div className={`${isMobile ? "p-3" : "p-2"}`}>
                      <CompareCard
                        data={{
                          name: location.name,
                          match: Math.round(location.rank).toString() + " %",
                          rank: location.rank_score,
                          city: location.lad24nm,
                          country: location.utla22nm,
                          nhood_id: location.nhood_id.toString(),
                        }}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white text-black font-light text-left font-montserrat text-xs md:text-sm">
              {criteria.map((item, index) => (
                <tr
                  key={item.label}
                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-all duration-200"
                >
                  <td
                    className={`sticky left-0 z-10 ${
                      isMobile ? "px-3 py-3" : "px-4 py-4"
                    } bg-white shadow-sm border-r border-gray-200`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-base-green rounded-full flex-shrink-0"></div>
                      <div
                        className={`font-medium text-primary-blue ${
                          isMobile ? "text-xs leading-tight" : ""
                        }`}
                      >
                        {item.label}
                      </div>
                    </div>
                  </td>
                  <td
                    className={`${
                      isMobile ? "px-3 py-3" : "px-4 py-4"
                    } bg-base-secondary/30 text-center border-r border-gray-200`}
                  >
                    {index === 0 && (
                      <Badge
                        variant="outline"
                        className="text-primary-blue border-primary-blue font-medium text-xs"
                      >
                        Price Reference
                      </Badge>
                    )}
                    {item.dataKey == "school_quality" && (
                      <div className="flex items-center justify-center">
                        <SchoolQualtiy
                          userPreferencesRef={userPreferences}
                          readOnly={true}
                          defaultFilters={{
                            primary_school: filters.primary_mode || [],
                            secondary_school: filters.secondary_mode || [],
                          }}
                        />
                      </div>
                    )}
                    {index > 0 && item.dataKey != "school_quality" && (
                      <div className="flex items-center justify-center">
                        <StarRating
                          rating={userPreferences[item.dataKey] as number}
                          readonly
                          size={isMobile ? 16 : 20}
                        />
                      </div>
                    )}
                  </td>

                  {locations.map((location) => {
                    const locationValue =
                      location[item.dataKey as keyof typeof location] || 0;

                    return (
                      <td
                        key={location.nhood_id}
                        className={`${
                          isMobile ? "px-3 py-3" : "px-4 py-4"
                        } text-center transition-all duration-200 hover:shadow-md`}
                      >
                        <div
                          className={`flex flex-col items-center ${
                            isMobile ? "gap-1" : "gap-2"
                          }`}
                        >
                          {item.format && (
                            <div
                              className={`${
                                isMobile ? "text-sm" : "text-lg"
                              } font-semibold text-primary-blue`}
                            >
                              {item.format(locationValue)}
                            </div>
                          )}
                          {!item.format && item.dataKey != "school_quality" && (
                            <div className="flex items-center justify-center">
                              <StarRating
                                rating={locationValue as number}
                                readonly
                                size={isMobile ? 16 : 20}
                              />
                            </div>
                          )}
                          {!item.format && item.dataKey == "school_quality" && (
                            <div className="flex items-center justify-center">
                              <SchoolQualtiy
                                userPreferencesRef={userPreferences}
                                readOnly={true}
                                defaultFilters={{
                                  primary_school: location?.ofsPmode
                                    ? [location?.ofsPmode]
                                    : [],
                                  secondary_school: location?.ofsSmode
                                    ? [location?.ofsSmode]
                                    : [],
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile scroll indicators */}
      {isMobile && (
        <div className="mt-4 mx-4">
          <div className="flex justify-center items-center gap-2 text-xs text-gray-500">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <span>Scroll horizontally for more locations</span>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareTable;
