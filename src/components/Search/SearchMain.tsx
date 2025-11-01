/* eslint-disable @typescript-eslint/no-explicit-any */
import SharedBg from "../utils/SharedBg";
import PostCodeSearch from "./PostCodeSearch";
import BreadCrumb from "../utils/BreadCrumb";
import { useNavigate } from "react-router";
import { useBreadCrumbStore } from "@/stores/breadCrumbStore";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";
import Navbar from "../Navbar/Navbar";

const SearchMain = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const setBreadCrumbs = useBreadCrumbStore((state) => state.setBreadCrumbs);

  const directToPreferences = () => {
    navigate("/preferences");
  };

  const onSelectSearch = (value: any) => {
    if (!user) {
      toast.error("Please login to continue");
      return;
    }
    if (!user?.pass_active) {
      toast.error("No active pass found");
      navigate("/user/pass/upgrade");
      return;
    }
    const statePayload = {
      lat: value.lat,
      lng: value.lon,
    };
    setBreadCrumbs("/reference-location", statePayload);
    navigate(`/reference-location`, { state: statePayload });
  };
  return (
    <div className="min-h-screen bg-base-secondary flex flex-col text-white">
      <Navbar />
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <SharedBg />
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
                disabled: true,
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
      </div>
      <div className="flex flex-col px-10 md:px-20 mt-12 md:mt-16 z-10 justify-center items-center my-auto">
        <div className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center">
          Find Your Ideal Place to Live
        </div>
        <div className="text-sm md:text-base lg:text-lg text-center mt-4">
          For a point of reference, enter a location that you know.
          <br />
          This will give you a basis for searching for your ideal neighbourhood
        </div>

        <div className="overflow-hidden relative flex flex-col w-full  md:w-[80%] lg:w-[70%] h-[60vh]  rounded-4xl  my-8 md:my-16 justify-center items-center border-4 border-base-secondary">
          <img
            src={
              "https://wsrv.nl/?url=https://unmapt.io/wp-content/uploads/2025/08/Main_pic.jpeg&q=80"
            }
            alt="SearchBg"
            className="absolute w-full h-full object-cover inset-0"
          />
          <div className="relative z-10 w-full">
            <PostCodeSearch onSelectSearch={onSelectSearch} />
          </div>
          <div
            onClick={directToPreferences}
            className="bg-base-green/80 backdrop-blur-sm text-white px-3 py-2 rounded-full z-10 text-xs md:text-base absolute top-[calc(50%+5rem)] cursor-pointer border-2 border-transparent transition-all duration-300 hover:border-white "
          >
            I don't have one. Just take my preferences
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMain;
