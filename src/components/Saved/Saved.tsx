import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import SharedBg from "../utils/SharedBg";
import { Button } from "../ui/button";
import SaveCard from "./SaveCard";
import { useSavedSearches } from "@/services/saveSearch";

const blueRatio = "25vh";

const Saved = () => {
  const navigate = useNavigate();
  const { data: saveSearches, isFetching: isSaveSearchingLoading } =
    useSavedSearches();

  const handleCardClick = (id: string) => {
    navigate(`/saved/${id}`);
  };

  return (
    <div className="relative bg-base-secondary flex flex-col text-white h-full min-h-[calc(100vh-4rem)]">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <SharedBg blue={blueRatio} />
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
        <div className="z-10 px-10 md:px-20 py-4">
          <div className="flex flex-col w-full gap-2 ">
            {saveSearches?.results?.map((savedResult) => (
              <div
                key={savedResult.id}
                onClick={() => {
                  handleCardClick(savedResult?.id);
                }}
                className="w-full"
              >
                <SaveCard data={savedResult} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Saved;
