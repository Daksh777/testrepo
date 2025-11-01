/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "../ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { useSearchAreaResults } from "@/services/searchArea";
import PostCodeSearch from "../Search/PostCodeSearch";
import { LocationPreferences } from "@/types/types";

const accordions = [
  // { label: "Country", key: "country", dataKey: "Country" },
  { label: "Region/Country", key: "region", dataKey: "Region" },
  {
    label: "Alternatively, search within a radius of a specific area",
    key: "location",
  },
];

const SearchAreaSelection = ({
  locationPreferences,
  onFind,
}: {
  locationPreferences: RefObject<LocationPreferences>;
  onFind: (type: "location" | "country" | "region") => void;
}) => {
  const { data: searchAreaData, isLoading: isSearchAreaDataLoading } =
    useSearchAreaResults();

  const [distance, setDistance] = useState(5);
  const increase = () => setDistance((prev) => prev + 1);
  const decrease = () => setDistance((prev) => Math.max(1, prev - 1));

  const [checkedValues, setCheckedValues] = useState<
    Record<string, Record<string, boolean>>
  >({
    preference: {},
    country: {},
    region: {},
  });

  const handleGenericCheckboxChange = (
    group: "preference" | "country" | "region",
    item: string,
    checked: boolean | "indeterminate" | undefined
  ) => {
    setCheckedValues((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [item]: checked === true,
      },
    }));
  };

  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>(
    {
      region: true,
    }
  );

  useEffect(() => {
    locationPreferences.current = {
      ...locationPreferences.current,
      ...checkedValues,
    };
  }, [checkedValues]);

  const toggleAccordion = (key: string, isOpen: boolean) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: isOpen,
    }));
  };

  const onSelectSearch = (value: any, setSearch?: (value: string) => void) => {
    setSearch?.(value?.name);
    console.log(value);
    locationPreferences.current.location = {
      lat: value?.lat,
      lon: value?.lon,
      distance: distance.toString(),
    };
  };

  if (isSearchAreaDataLoading) {
    return (
      <Loader2
        className="w-6 h-6 text-white animate-spin mt-16"
        strokeWidth={2}
      />
    );
  }
  return (
    <>
      <div className="w-full md:w-[90%] lg:w-[70%] p-4 rounded-4xl mt-8 md:mt-16 bg-white text-black font-montserrat ">
        <div className="bg-base-secondary w-full h-full rounded-3xl py-4 px-6">
          <h2 className="text-base md:text-xl font-bold">Preference</h2>
          <div className="mt-2 flex flex-col gap-2">
            {searchAreaData?.Preference?.map((item) => (
              <div key={item} className="flex items-center">
                <Checkbox
                  id={item}
                  checked={!!checkedValues.preference[item]}
                  onCheckedChange={(checked) =>
                    handleGenericCheckboxChange("preference", item, checked)
                  }
                  className="cursor-pointer bg-white h-4 w-4 border-base-green data-[state=checked]:bg-base-green data-[state=checked]:text-white data-[state=checked]:border-base-green rounded-none"
                />
                <Label
                  htmlFor={item}
                  className="text-blue-950 font-light ml-2 text-sm md:text-base"
                >
                  {item}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full md:w-[90%] lg:w-[70%] rounded-4xl mt-4 md:mt-6 bg-white text-black font-montserrat flex flex-col gap-4 p-6">
        {accordions?.map(({ label, key, dataKey }) => (
          <div key={key} className="bg-base-secondary w-full rounded-3xl">
            <Accordion
              type="single"
              collapsible
              value={openAccordions[key] ? "item-1" : ""}
              onValueChange={(val) => toggleAccordion(key, val === "item-1")}
              className="p-0"
            >
              <AccordionItem value="item-1" className="py-4 px-6">
                <AccordionTrigger className="text-base md:text-lg font-bold cursor-pointer p-0">
                  <span>{label}</span>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col ">
                  {key !== "location" ? (
                    <div className="mt-4 flex flex-col gap-1 pb-4 md:pb-0">
                      {searchAreaData?.[
                        dataKey as keyof typeof searchAreaData
                      ]?.map((item: string) => (
                        <div key={item} className="flex items-center">
                          <Checkbox
                            id={item}
                            checked={
                              !!checkedValues[
                                key as keyof typeof checkedValues
                              ]?.[item]
                            }
                            onCheckedChange={(checked) =>
                              handleGenericCheckboxChange(
                                key as "preference" | "country" | "region",
                                item,
                                checked
                              )
                            }
                            className="cursor-pointer bg-white h-4 w-4 border-base-green data-[state=checked]:bg-base-green data-[state=checked]:text-white data-[state=checked]:border-base-green rounded-none"
                          />
                          <Label
                            htmlFor={item}
                            className="text-blue-950 font-light ml-2 text-sm md:text-base"
                          >
                            {item}
                          </Label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <span className="text-blue-950 font-light text-sm md:text-base">
                        Enter the City, County or Postcode
                      </span>
                      <div className="relative z-10 w-full py-4">
                        <PostCodeSearch onSelectSearch={onSelectSearch} />
                      </div>
                      <span className="text-blue-950 font-light text-sm md:text-base">
                        Distance
                      </span>
                      <div className="flex justify-start md:justify-center pt-2 w-full gap-4 mx-auto">
                        <div className="flex items-center border border-base-green rounded-full px-4 py-1 md:py-2 bg-white text-black shadow-sm w-36 justify-between md:w-44 text-sm md:text-base">
                          <span className="font-medium whitespace-nowrap text-gray-600">
                            + {distance} miles
                          </span>
                          <div className="flex flex-col ml-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-3 w-3 p-0 cursor-pointer hover:bg-transparent"
                              onClick={increase}
                            >
                              <ChevronUp className="h-3 w-3 text-gray-700 hover:text-black" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-3 w-3 p-0 hover:bg-transparent cursor-pointer"
                              onClick={decrease}
                            >
                              <ChevronDown className="h-3 w-3 text-gray-700 hover:text-black" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <Button
                    className="bg-base-green rounded-3xl cursor-pointer text-base ml-auto"
                    onClick={() => {
                      if (key === "location") {
                        locationPreferences.current.location = {
                          ...locationPreferences.current.location,
                          distance: distance.toString(),
                        };
                      }
                      onFind(key as "location" | "country" | "region");
                    }}
                  >
                    Find
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchAreaSelection;
