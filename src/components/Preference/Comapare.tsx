/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect, useMemo, useState } from "react";
import { DualRangeSlider } from "../DualSlider/DualSlider";
import { StarRating } from "../StarRating/StarRating";
import { InfoIcon } from "../InfoIcon/InfoIcon";
import { PreferencesMetData } from "@/types/preferencesType";
// import SchoolQualtiy from "./SchoolQualtiy";
import { cn } from "@/lib/utils";
import SchoolQualtiy from "./SchoolQualtiy";
import SelectComponent from "../utils/SelectComponent";

const Comapare = ({
  display_name,
  preferencesMetadData,
  userPreferencesRef,
  readonly = false,
}: {
  display_name: string | null;
  preferencesMetadData: PreferencesMetData | null;
  userPreferencesRef: RefObject<any>;
  readonly?: boolean;
}) => {
  const criteria = useMemo(() => {
    const response = [
      {
        key: "street_safety",
        label: "Low Crime",
        description:
          "Uses crime rate data to assess how safe the streets are, both during the day and at night. A higher rating prioritises areas with lower crime and a stronger feeling of personal security.",
        knownRating: preferencesMetadData?.street_safety,
        idealRating: preferencesMetadData?.street_safety,
      },
      {
        key: "flood_safety",
        label: "Flood Safety",
        description:
          "Evaluates flood risk based on historical data and flood zone mapping. A higher rating prioritises areas with minimal to no flood risk, ensuring better long-term safety and property security.",
        knownRating: preferencesMetadData?.flood_safety,
        idealRating: preferencesMetadData?.flood_safety,
      },
      {
        key: "rail_London_service",
        label: "Trains to London",
        description:
          "Assesses the availability, distance, and frequency of train services directly connecting to London. A higher rating prioritises neighbourhoods offering fast and convenient travel to London for work or leisure.",
        knownRating: preferencesMetadData?.rail_London_service,
        idealRating: preferencesMetadData?.rail_London_service,
      },

      {
        key: "rail_general_service",
        label: "Rail Connectivity Overall",
        description:
          "Evaluates the strength of the local rail network for travelling to multiple destinations, not only London. A higher rating prioritises neighbourhoods with better overall rail accessibility for commuting or travel flexibility.",
        knownRating: preferencesMetadData?.rail_general_service,
        idealRating: preferencesMetadData?.rail_general_service,
      },
      {
        key: "amenity_community",
        label: "Community Spaces",
        description:
          "Reflects the availability and proximity of libraries, community centres, swimming pools, and playgrounds. Higher ratings prioritise areas where with more of these facilities.",
        knownRating: preferencesMetadData?.amenity_community,
        idealRating: preferencesMetadData?.amenity_community,
      },
      {
        key: "amenity_foodbev",
        label: "Food and Drink",
        description:
          "Evaluates the range and proximity of restaurants, cafés and pubs. A higher rating will favour neighbourhoods with a vibrant food scene offering more choice and quality.",
        knownRating: preferencesMetadData?.amenity_foodbev,
        idealRating: preferencesMetadData?.amenity_foodbev,
      },
      {
        key: "green_spaces",
        label: "Local Parks",
        description:
          "Assesses how close and how many parks and recreational green spaces are available within easy reach. Higher ratings highlight areas with better access to parks for walking, exercise, and family activities.",
        knownRating: preferencesMetadData?.green_spaces,
        idealRating: preferencesMetadData?.green_spaces,
      },
      {
        key: "nearby_nature",
        label: "Nearby Nature",
        description:
          "Considers access to larger natural features beyond local parks, such as woodlands, rivers, countryside, and nature reserves. A higher rating prioritises areas where natural beauty and outdoor activities are easily accessible.",
        knownRating: preferencesMetadData?.nearby_nature,
        idealRating: preferencesMetadData?.nearby_nature,
      },
      {
        key: "culture_entertain",
        label: "Culture & Entertainment",
        description:
          "Measures access to cultural and entertainment venues such as theatres, concert venues, museums, galleries, cinemas, and event spaces. A higher rating highlights areas with a more vibrant cultural life.",
        knownRating: preferencesMetadData?.culture_entertain,
        idealRating: preferencesMetadData?.culture_entertain,
      },
      {
        key: "background_noise",
        label: "Low Noise",
        description:
          "Looks at average noise originating from roads and railways. A higher rating will favour quieter residential areas, ideal for those seeking peace and a calmer environment.",
        knownRating: preferencesMetadData?.background_noise,
        idealRating: preferencesMetadData?.background_noise,
      },
      {
        key: "walk_bike",
        label: "Cycling and Walking",
        description:
          "Measures how easy and safe it is to get around on foot or by bike, based on actual propensities to walk and cycle. Higher ratings favour areas with strong walking and cycling opportunities for daily travel and recreation.",
        knownRating: preferencesMetadData?.walk_bike,
        idealRating: preferencesMetadData?.walk_bike,
      },
    ];

    if (readonly) {
      response.forEach((item) => {
        item.idealRating = userPreferencesRef.current["weights"][item.key];
      });
    } else {
      response.forEach((item) => {
        userPreferencesRef.current["weights"][item.key] = item.knownRating || 0;
      });
    }

    return response;
  }, [preferencesMetadData]);
  const defaultAveragePrice = useMemo(() => {
    const result = [10000, 2000000];
    if (!readonly) {
      userPreferencesRef.current["filters"]["hpi4_min"] = result[0];
      userPreferencesRef.current["filters"]["hpi4_max"] = result[1];
    }

    return result;
  }, [preferencesMetadData]);

  // const defaultAverageRent = useMemo(() => {
  //   const result = [100, 1000000];
  //   if (!readonly) {
  //     userPreferencesRef.current["filters"]["rent4_min"] = result[0];
  //     userPreferencesRef.current["filters"]["rent4_max"] = result[1];
  //     return result;
  //   }

  //   return result;
  // }, [preferencesMetadData]);

  const [avgPriceRange, setAvgPriceRange] = useState(defaultAveragePrice);
  // const [avgRentRange, setAvgRentRange] = useState(defaultAverageRent);

  useEffect(() => {
    if (readonly) {
      // const valueOfAvgRentRange = [
      //   userPreferencesRef?.current?.["filters"]["rent4_min"],
      //   userPreferencesRef?.current?.["filters"]["rent4_max"],
      // ];
      // setAvgRentRange(valueOfAvgRentRange);
      const valueOfAvgPriceRange = [
        userPreferencesRef?.current?.["filters"]["hpi4_min"],
        userPreferencesRef?.current?.["filters"]["hpi4_max"],
      ];
      setAvgPriceRange(valueOfAvgPriceRange);
    }
  }, [userPreferencesRef]);
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={cn(
          "min-w-[640px] w-full font-montserrat",
          !readonly && "mt-7"
        )}
      >
        {!readonly && (
          <thead className="border-b-4 border-gray-100">
            <tr className="text-lg font-semibold text-black whitespace-nowrap">
              {preferencesMetadData && (
                <th className="px-4 py-1 max-w-44 whitespace-normal">
                  {display_name}
                </th>
              )}
              <th className="px-4 py-1 text-left">Key criteria</th>
              <th className="px-4 py-1">Your Ideal Place</th>
            </tr>
          </thead>
        )}
        <tbody className="text-black font-light text-center font-montserrat text-sm">
          <tr className="border-b-2 border-gray-100 ">
            {preferencesMetadData && <td className="px-4 py-1"></td>}

            <td className="px-4 py-1 text-left">Property Type</td>
            <td className="px-4 py-1">
              <div className="flex justify-center ">
                <SelectComponent
                  triggerClassName="!w-60 !h-fit text-sm px-4 py-1"
                  placeholder="Select Property"
                  options={[
                    { label: "Any ", value: "Any" },
                    { label: "Flats only", value: "Flats only" },
                    {
                      label: "Flats and terraces",
                      value: "Flats and terraces",
                    },
                    {
                      label: "Terraces or bigger",
                      value: "Terraces or bigger",
                    },
                    {
                      label: "Semi-detached or bigger",
                      value: "Semi-detached or bigger",
                    },
                    { label: "Detached only", value: "Detached only" },
                  ]}
                  onValueChange={(value) => {
                    userPreferencesRef.current["filters"]["abode"] = value;
                  }}
                  defaultValue={
                    userPreferencesRef.current["filters"]["abode"] || "Any"
                  }
                />
              </div>
            </td>
          </tr>

          <tr className="border-b-2 border-gray-100">
            {preferencesMetadData && (
              <td className="px-4 py-2">
                £ {Math.round(preferencesMetadData?.hpi4 || 0).toLocaleString()}
              </td>
            )}
            <td className="px-4 py-2 text-left">Average Price</td>
            <td className="px-4 py-2">
              <div>
                <DualRangeSlider
                  value={avgPriceRange}
                  onValueChange={(value) => {
                    setAvgPriceRange(value);
                    userPreferencesRef.current["filters"]["hpi4_min"] =
                      value[0];
                    userPreferencesRef.current["filters"]["hpi4_max"] =
                      value[1];
                  }}
                  min={defaultAveragePrice[0]}
                  max={defaultAveragePrice[1]}
                  step={100}
                  formatValue={(value) =>
                    `£ ${Math.round(value || 0).toLocaleString()}`
                  }
                  disabled={readonly}
                />
              </div>
            </td>
          </tr>
          {/* <tr className="border-b-2 border-gray-100">
            {preferencesMetadData && (
              <td className="px-4 py-2">
                £{" "}
                {Math.round(preferencesMetadData?.rent4 || 0).toLocaleString()}
              </td>
            )}
            <td className="px-4 py-2 text-left">Average Rent</td>
            <td className="px-4 py-2">
              <div>
                <DualRangeSlider
                  value={avgRentRange}
                  onValueChange={(value) => {
                    if (readonly) return;
                    setAvgRentRange(value);
                    userPreferencesRef.current["filters"]["rent4_min"] =
                      value[0];
                    userPreferencesRef.current["filters"]["rent4_max"] =
                      value[1];
                  }}
                  min={defaultAverageRent[0]}
                  max={defaultAverageRent[1]}
                  step={10}
                  formatValue={(value) =>
                    `£ ${Math.round(value || 0).toLocaleString()}`
                  }
                  disabled={readonly}
                />
              </div>
            </td>
          </tr> */}

          <tr className="border-b-2 border-gray-100 ">
            {preferencesMetadData && (
              <td className="px-4 py-1 flex justify-center">
                <StarRating
                  rating={preferencesMetadData?.school_quality || 0}
                  readonly
                />
              </td>
            )}
            <td className="px-4 py-1 text-left">
              <span className="flex  items-center gap-2 justify-start">
                <InfoIcon
                  label={"School Quality"}
                  description={
                    "Use the filter at the right to select specific Ofsted ratings for nearby schools. You can choose separately for primary and secondary schools. If you are interested in 'Good or better', be sure to select 'Good' and 'Outstanding'."
                  }
                />
                <span>School Quality</span>
              </span>
            </td>
            <td className="px-4 py-1">
              <div className="flex justify-center ">
                <SchoolQualtiy
                  userPreferencesRef={userPreferencesRef}
                  readOnly={readonly}
                />
              </div>
            </td>
          </tr>

          {criteria.map((item) => (
            <tr className="border-b-2 border-gray-100 whitespace-nowrap">
              {item?.knownRating !== undefined && (
                <td className="px-4 py-1 lg:py-2">
                  <span className="flex justify-center  ">
                    <StarRating rating={item?.knownRating || 0} readonly />
                  </span>
                </td>
              )}
              <td className="px-4 py-1 lg:py-2">
                <span className="flex  items-center gap-2 justify-start">
                  <InfoIcon
                    label={item?.label}
                    description={item?.description}
                  />
                  <span>{item?.label}</span>
                </span>
              </td>
              <td className="px-4 py-1 lg:py-2">
                <span className="flex justify-center  ">
                  {readonly ? (
                    <StarRating rating={item?.idealRating ?? 0} readonly />
                  ) : (
                    <StarRating
                      rating={item.idealRating || 0}
                      readonly={readonly}
                      onChange={(value) => {
                        userPreferencesRef.current["weights"][item.key] = value;
                      }}
                    />
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Comapare;
