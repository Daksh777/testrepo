import { Button } from "@/components/ui/button";
import BreadCrumb from "../utils/BreadCrumb";
import SharedBg from "../utils/SharedBg";
import Comapare from "./Comapare";
import { useLocation, useNavigate } from "react-router";
import { useGetPreferences } from "@/services/preferences";
import { Loader2 } from "lucide-react";
import { useRef } from "react";
import { useBreadCrumbStore } from "@/stores/breadCrumbStore";
import useIsMobile from "@/hooks/useIsMobile";

const Preference = () => {
  const { state } = useLocation();
  const { isMobile } = useIsMobile();
  const nhood = state?.nhood;
  const setBreadCrumbs = useBreadCrumbStore((state) => state.setBreadCrumbs);
  const { data: preferencesMetadData, isLoading: preferencesMetadDataPending } =
    useGetPreferences(nhood || "");
  const navigate = useNavigate();

  const userPreferencesRef = useRef<unknown>({
    weights: {},
    filters: {},
  });

  const handleNext = () => {
    const statePayload = {
      preferences: userPreferencesRef.current,
      ref_nhood: nhood,
    };
    navigate("/search-area", { state: statePayload });
    setBreadCrumbs("/search-area", statePayload);
  };
  return (
    <div className="min-h-[calc(100vh-4rem)] relative bg-base-secondary flex flex-col text-white">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <SharedBg blue="40vh" />
      </div>
      <div className="absolute top-4 left-10 md:left-20">
        <BreadCrumb
          flow={[
            {
              link: "/",
              label: "Search",
            },
            {
              link: "/preferences",
              label: "Importance",
            },
            {
              link: "/search-area",
              label: "Search Area",
              disabled: true,
            },
            {
              link: "/results",
              label: "Results",
              disabled: true,
            },
          ]}
        />
      </div>
      <div className="flex flex-col px-10 md:px-20 z-10 justify-center items-center my-auto mt-16">
        <div className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center ">
          Let Us Know What Matters Most to You
        </div>
        <div className="text-sm md:text-base lg:text-lg text-center mt-4">
          Your ideal location is pre-populated based on your known area. Adjust
          the star ratings to fine-tune your preferences
        </div>
        <div className="text-sm md:text-base lg:text-lg text-center mt-2">
          ⭐ means "less important" and ⭐⭐⭐⭐⭐ means "high priority”
        </div>
        {preferencesMetadDataPending && (
          <Loader2
            className="w-6 h-6 text-white animate-spin mt-16"
            strokeWidth={2}
          />
        )}

        {!preferencesMetadDataPending && (
          <div className="relative flex flex-col w-full  md:w-[80%] lg:w-[70%]  rounded-4xl  mt-8 md:mt-8 items-center bg-white px-2 pb-4 border-4 border-base-secondary">
            <Comapare
              display_name={state?.display_name}
              preferencesMetadData={preferencesMetadData}
              userPreferencesRef={userPreferencesRef}
            />
          </div>
        )}
        {!preferencesMetadDataPending && (
          <div className="flex justify-end md:w-[80%] lg:w-[70%] mt-2 mb-4">
            <Button
              className="bg-base-green cursor-pointer hover:bg-lime-700 text-lg px-6"
              onClick={handleNext}
            >
              Next
            </Button>
          </div>
        )}
        {isMobile && (
          <div className="mb-4 mx-4">
            <div className="bg-primary-blue/10 border border-primary-blue/20 rounded-lg p-3 text-center">
              <p className="text-xs text-primary-blue font-medium">
                💡 Swipe horizontally to fill your preferences
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Preference;
