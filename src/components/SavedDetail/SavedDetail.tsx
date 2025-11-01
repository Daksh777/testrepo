import { useNavigate, useParams } from "react-router";
import { Loader2 } from "lucide-react";
import SharedBg from "../utils/SharedBg";
import BreadCrumb from "../utils/BreadCrumb";
import { Button } from "../ui/button";
import CompareRow from "../Results/CompareRow";
import { useSavedSearchById } from "@/services/saveSearch";
import SaveDetailBlock from "./SaveDetailBlock";

const blueRatio = "25vh";

const SavedDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: savedSearch, isFetching: isSaveSearchingLoading } =
    useSavedSearchById(id as string);

  return (
    <div className="relative bg-base-secondary flex flex-col text-white  min-h-[calc(100vh-4rem)] ">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <SharedBg blue={blueRatio} />
      </div>

      <div className="absolute top-4 left-10 md:left-20 z-50">
        <BreadCrumb
          flow={[
            { link: "/saved", label: "Saved" },
            { link: "/saved/:id", label: "Saved Detail" },
          ]}
        />
      </div>

      <div
        className="flex flex-col px-10 md:px-20 z-10 justify-center items-center shrink-0"
        style={{ height: blueRatio }}
      >
        <div className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center">
          Saved
        </div>
        <div className="flex justify-between pt-4 gap-20 md:gap-40">
          <Button
            className="bg-base-green rounded-full cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-base-green"
            onClick={() => navigate("/saved")}
          >
            Searches
          </Button>
          <Button
            className="rounded-full border-base-green bg-white text-black cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-white"
            onClick={() => navigate("/liked")}
          >
            Favorites
          </Button>
        </div>
      </div>

      {isSaveSearchingLoading ? (
        <div className="flex justify-center items-center mt-24">
          <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="z-10 flex flex-col gap-6 px-16 my-2 md:my-6 w-full h-full py-4">
          <h2 className="text-xl font-semibold py-1 outline-none text-gray-500 w-full">
            {savedSearch?.name}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-20">
            {savedSearch?.search_results.map((location, index) => (
              <SaveDetailBlock key={index} location={location} />
            ))}
          </div>
        </div>
      )}
      <div className="z-10 px-6 w-full mt-auto fixed left-0 bottom-4">
        <CompareRow
          usePreferences={savedSearch?.search_parameters?.weights || {}}
        />
      </div>
    </div>
  );
};

export default SavedDetail;
