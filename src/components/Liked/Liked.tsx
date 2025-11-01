import { useNavigate } from "react-router";
import SharedBg from "../utils/SharedBg";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useGetAllFavourites } from "@/services/favouritesServices";
import PostCode from "../PostCode/PostCode";
import { useState } from "react";

const blueRatio = "25vh";

const Liked = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data: favourites, isLoading: favouritesLoading } =
    useGetAllFavourites(page);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative bg-base-secondary flex flex-col text-white">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <SharedBg blue={blueRatio} />
      </div>

      <div className="absolute top-4 left-10 md:left-20 z-50">
        <div className="bg-yellow-500 px-2 py-1 rounded-md flex flex-row items-center cursor-pointer hover:bg-yellow-600 transition-all duration-150 text-xs">
          {" "}
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </div>
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
            className="rounded-full border-base-green bg-white text-black cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-white"
            onClick={() => navigate("/saved")}
          >
            Searches
          </Button>
          <Button
            className="bg-base-green rounded-full cursor-pointer hover:scale-105 transition-all duration-300 hover:bg-base-green"
            onClick={() => navigate("/liked")}
          >
            Favorites
          </Button>
        </div>
      </div>

      <div className="z-10 flex flex-row flex-wrap gap-6 px-6 my-2 md:my-6 w-full grow">
        {favouritesLoading && (
          <div className="flex justify-center items-center w-full grow">
            <Loader2 className="h-8 w-8 animate-spin text-base-green" />
          </div>
        )}
        {favourites?.results.length > 0 && (
          <>
            <div className="rounded-md py-4 px-8 w-full text-black ">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
                {favourites?.results.map((location: any, index: number) => (
                  <PostCode key={index} location={location} />
                ))}
              </div>
            </div>
          </>
        )}
        <div className="flex flex-row w-full px-8 mt-auto">
          {favourites?.previous && (
            <Button
              onClick={handlePrevious}
              className="bg-gray-200 text-gray-500 rounded-md cursor-pointer hover:bg-gray-300 mr-auto"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Previous
            </Button>
          )}
          {favourites?.next && (
            <Button
              onClick={handleNext}
              className="bg-gray-200 text-gray-500 rounded-md cursor-pointer hover:bg-gray-300 ml-auto"
            >
              Next <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
        {favourites?.results.length === 0 && (
          <div className="flex justify-center text-base-green w-full">
            <div className="text-2xl font-medium">No favourites found !</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Liked;
