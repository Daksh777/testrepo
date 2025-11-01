/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { MapInstance } from "react-map-gl/maplibre";
import SharedBg from "../utils/SharedBg";
import BreadCrumb from "../utils/BreadCrumb";
import MapComponent from "../Map/MapComponent";
import AreaRow from "./AreaRow";
import ResultMarkers from "./ResultMarkers";
import { List, Loader2, Map } from "lucide-react";
import useIsMobile from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";
import CompareRow from "./CompareRow";
import { Button } from "../ui/button";
import { useRankingResults } from "@/services/resultServices";
import useCompareStore from "@/stores/compareStore";
import { SaveSearchDialog } from "../SaveSearchDialog/SaveSearchDialog";
import { useCreateSavedSearch } from "@/services/saveSearch";
import { NearbyLocation } from "../../types/types";
import { useGetPreferences } from "@/services/preferences";

const blueRatio = "25vh";

const ResultsMain = () => {
  const [map, setMap] = useState<MapInstance | null>(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useIsMobile();
  const [showMap, setShowMap] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [rankingResults, setRankingResults] = useState<NearbyLocation[]>([]);
  const { data: preferencesMetadata } = useGetPreferences(
    state?.ref_nhood || ""
  );
  const { resetLocations } = useCompareStore();
  const {
    mutate: getRankingResults,
    isPending: isRankingResultsPending,
    data: rankingResultsData,
    isError: isRankingResultsError,
  } = useRankingResults();
  const {
    mutateAsync: createSaveSearch,
    isSuccess: iscreateSaveSearchSuccess,
    isPending: isCreateSaveSearchLoading,
  } = useCreateSavedSearch();

  useEffect(() => {
    if (state?.locationPreferences && state?.userPreferences && state?.type) {
      state.userPreferences["geographic_filters"] = state?.locationPreferences;
      getRankingResults(state?.userPreferences);
    } else {
      navigate("/search");
    }
  }, [state?.locationPreferences, state?.userPreferences, state?.type]);

  useEffect(() => {
    if (isRankingResultsError) {
      toast.error("Error fetching ranking results");
    }
  }, [isRankingResultsError]);

  useEffect(() => {
    if (rankingResultsData) {
      const results = rankingResultsData.map(
        (result: NearbyLocation, index: number) => {
          result["rank_score"] = index + 1;
          return result;
        }
      );
      setRankingResults(results);
      resetLocations();
    }
  }, [rankingResultsData]);

  useEffect(() => {
    if (iscreateSaveSearchSuccess) {
      setOpenSaveDialog(false);
    }
  }, [iscreateSaveSearchSuccess]);

  const handleSearchSave = async (name: string) => {
    await createSaveSearch({
      name,
      search_parameters: state?.userPreferences,
      search_results: rankingResults,
    });
  };

  if (isRankingResultsPending || !rankingResultsData) {
    return (
      <div className="flex justify-center items-center mt-24">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] relative bg-base-secondary flex flex-col text-white">
      <div className="absolute top-0 left-0 w-full h-full z-0 ">
        <SharedBg blue={blueRatio} />
      </div>
      <div className="absolute top-4 left-10 md:left-20 z-10">
        <BreadCrumb
          flow={[
            {
              link: "/",
              label: "Search",
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
            },
          ]}
        />
      </div>
      <div
        className="flex flex-col px-10 md:px-20 z-0 justify-center items-center shrink-0 "
        style={{ height: blueRatio }}
      >
        <div className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center">
          Here Are Your Ideal Places to Live
        </div>
        <div className="text-sm md:text-base lg:text-lg text-center mt-4">
          Choose up to 4 areas to compare in more detail{" "}
        </div>
      </div>
      <div className="flex justify-end px-6 pt-2 z-10 min-h-[42px]">
        <div className="flex gap-4">
          <Button
            className="bg-base-green text-white text-sm font-medium cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={() => {
              setOpenSaveDialog(true);
            }}
          >
            Save Search
          </Button>
        </div>
      </div>

      {isMobile && (
        <div
          onClick={() => {
            setShowMap((prev) => !prev);
          }}
          className="cursor-pointer w-fit mt-2 mx-6 flex bg-gray-100 border border-gray-300 text-gray-600 text-base px-2 py-1 rounded-md flex-row items-center gap-2 z-10"
        >
          {showMap ? <List className="w-4 h-4" /> : <Map className="w-4 h-4" />}
          {showMap ? "List view" : "Map view"}
        </div>
      )}
      <div className="flex-grow z-10 flex flex-row overflow-hidden my-2 md:my-4 px-6 gap-6 relative">
        <div
          className={cn(
            "rounded-md overflow-hidden overflow-y-auto gap-2 grid grid-cols-2",
            isMobile ? (showMap ? "hidden" : "w-full") : "w-1/2"
          )}
        >
          {rankingResults.length == 0 && (
            <div className="flex  text-primary-blue">
              <div className="text-sm font-medium">No results found</div>
            </div>
          )}
          {preferencesMetadata && (
            <AreaRow
              location={preferencesMetadata}
              rank={0}
              isPreferences={true}
            />
          )}
          {rankingResults?.map((location, index) => (
            <AreaRow key={location.name} location={location} rank={index + 1} />
          ))}
        </div>
        <div
          className={cn(
            "rounded-md overflow-hidden",
            isMobile ? (showMap ? "w-full" : "hidden") : "w-1/2"
          )}
        >
          <MapComponent setMap={setMap} />
          {map && <ResultMarkers map={map} nearbyLocations={rankingResults} />}
        </div>
      </div>
      <div className="z-10 px-6 mb-2">
        <CompareRow usePreferences={state?.userPreferences} />
      </div>
      {openSaveDialog && (
        <SaveSearchDialog
          open={openSaveDialog}
          setOpen={setOpenSaveDialog}
          title="Save Search"
          saveButtonText="Save"
          onSave={handleSearchSave}
          isOkBtnLoading={isCreateSaveSearchLoading}
        />
      )}
    </div>
  );
};

export default ResultsMain;
