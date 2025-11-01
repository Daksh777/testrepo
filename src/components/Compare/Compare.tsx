import { Button } from "../ui/button";
import CompareTable from "./CompareTable";
import { useLocation, useNavigate } from "react-router";
import { NearbyLocation } from "@/types/types";
import { useState } from "react";
import { useEffect } from "react";

const blueRatio = 30;

const Compare = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [locations, setLocations] = useState<NearbyLocation[]>([]);

  useEffect(() => {
    if (state?.locations) {
      setLocations(state.locations);
    } else {
      navigate("/search");
    }
  }, [state]);

  return (
    <div className="w-full h-[calc(100vh-4rem)] font-montserrat">
      <div
        className="w-full bg-primary-blue relative"
        style={{ height: `${blueRatio}%` }}
      >
        <div className="flex flex-col px-10  md:px-20  z-10 justify-center items-center my-auto text-white h-full">
          <div className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center ">
            Comparison of Your Selected Areas
          </div>
          <div className="text-sm md:text-base lg:text-lg text-center mt-4">
            Here is the comparison of the areas you've selected based on your
            preferences
          </div>
        </div>
      </div>
      <div className="w-full bg-base-secondary h-auto py-4 flex flex-col">
        <div className="flex justify-end px-10 pb-4">
          <Button
            className="bg-base-green cursor-pointer hover:bg-lime-700"
            onClick={() => navigate(-1)}
          >
            Back to results
          </Button>
        </div>
        <CompareTable
          locations={locations}
          filters={state?.userPreferences?.filters}
          userPreferences={state?.userPreferences?.weights}
        />
      </div>
    </div>
  );
};

export default Compare;
