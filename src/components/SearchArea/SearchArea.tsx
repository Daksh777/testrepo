import SharedBg from "../utils/SharedBg";
import BreadCrumb from "../utils/BreadCrumb";
import SearchAreaSelection from "./SearchAreaSelection";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import { LocationPreferences } from "@/types/types";
import { toast } from "sonner";
import { useBreadCrumbStore } from "@/stores/breadCrumbStore";

export const SearchArea = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const setBreadCrumbs = useBreadCrumbStore((state) => state.setBreadCrumbs);
  const locationPreferences = useRef<LocationPreferences>({
    preference: {},
    country: {},
    region: {},
    location: {},
  });

  useEffect(() => {
    if (!state?.preferences) {
      navigate("/preferences");
    }
  }, [navigate, state?.preferences]);

  const onFind = (type: "location" | "country" | "region") => {
    const locationPreferencesTemp: any = {};

    // seting rural/urban preference
    if (Object.keys(locationPreferences.current.preference).length) {
      locationPreferencesTemp.preference = Object.keys(
        locationPreferences.current.preference
      ).filter((key) => locationPreferences.current.preference[key]);
    }

    if (type == "location") {
      if (
        !locationPreferences.current.location.lat ||
        !locationPreferences.current.location.lon ||
        !locationPreferences.current.location.distance
      ) {
        toast.error("Please select a location and distance");
        return;
      }

      locationPreferencesTemp.location = {
        coordinates: [
          parseFloat(locationPreferences.current.location.lon),
          parseFloat(locationPreferences.current.location.lat),
        ],
        buffer:
          parseFloat(locationPreferences.current.location.distance) * 1609,
      };
    } else {
      const selectedKeys = Object.keys(locationPreferences.current[type])
        .filter((key) => locationPreferences.current[type][key])
        .join(",");

      if (selectedKeys === "") {
        toast.error("Please select at least one option");
        return;
      }

      if (Object.keys(locationPreferences.current[type]).length) {
        locationPreferencesTemp[type] = Object.keys(
          locationPreferences.current[type]
        ).filter((key) => locationPreferences.current[type][key]);
      }
    }
    const statePayload = {
      type: type,
      locationPreferences: locationPreferencesTemp,
      userPreferences: state?.preferences,
      ref_nhood: state?.ref_nhood,
    };
    setBreadCrumbs("/results", statePayload);

    navigate("/results", { state: statePayload });
  };
  return (
    <div className="min-h-screen relative bg-base-secondary flex flex-col text-white">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <SharedBg blue="40vh" />
      </div>
      <div className="absolute top-4 left-10 md:left-20">
        <BreadCrumb
          flow={[
            {
              link: "/search",
              label: "known location",
            },
            {
              link: "/preferences",
              label: "importance",
            },
            {
              link: "/search-area",
              label: "search area",
            },
            {
              link: "/results",
              label: "results",
              disabled: true,
            },
          ]}
        />
      </div>
      <div className="flex flex-col px-10 md:px-20 z-10 justify-center items-center my-auto mt-24">
        <div className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center">
          Refine your search by location or rural/urban location.
        </div>
        <div className="text-sm md:text-base lg:text-lg text-center mt-4">
          Choose England, Wales, a county, or a city, or enter a postcode to
          explore the surrounding area
        </div>
        <SearchAreaSelection
          locationPreferences={locationPreferences}
          onFind={onFind}
        />
      </div>
    </div>
  );
};
