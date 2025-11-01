import SharedBg from "../utils/SharedBg";
import BreadCrumb from "../utils/BreadCrumb";
import DownloadReportButton from "./DownloadReportButton";
import HousingIncome from "./HousingIncome";
import Amenities from "./Amenities";
import { Heart, Loader2, Share2 } from "lucide-react";
import { useLocation, useParams } from "react-router";
import { useEffect } from "react";
import { useGetReportData } from "@/services/report";
import { useAuthStore } from "@/stores/authStore";
import { THUMBNAIL_BASE_URL } from "@/shared";
import useNeighbourhLiked from "@/hooks/isNeighbourhLiked";
import { saveToClipboard } from "@/lib/utils";
import { toast } from "sonner";

const SampleReportMain = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const user = useAuthStore((state) => state.user);

  const { isLiked, addLikedLocation, removeLikedLocation } = useNeighbourhLiked(
    { neighbour_id: id || "" }
  );

  const { data: reportData, isLoading: isReportDataLoading } = useGetReportData(
    id || "",
    user?.token || ""
  );

  const handleLikeToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (isLiked) {
      removeLikedLocation();
    } else {
      addLikedLocation({
        name: reportData["1Xa"],
        country: reportData["1Xc"] || "N/A",
        city: reportData["1Xc"] || "N/A",
        neighborhood_id: id,
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleShare = async () => {
    saveToClipboard(window.location.href);
    toast.success("Link copied to clipboard");
  };

  if (isReportDataLoading || !reportData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary-blue" />
      </div>
    );
  }

  return (
    <div className="relative bg-base-secondary flex flex-col min-h-screen">
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <SharedBg />
      </div>

      {/* Header with breadcrumb and actions */}
      <div className="relative z-30">
        <div className="absolute top-4 left-10 md:left-20">
          <BreadCrumb
            flow={[
              {
                link: "/",
                label: "Search",
              },
            ]}
          />
        </div>
        <div className="absolute top-4 right-10 flex flex-row items-center gap-4 ">
          <div className="cursor-pointer hover:scale-110 transition-transform">
            <Share2
              className="h-6 w-6 stroke-1 fill-base-green text-base-green"
              onClick={handleShare}
            />
          </div>
          <div
            className="cursor-pointer hover:scale-110 transition-transform"
            onClick={handleLikeToggle}
          >
            <Heart
              className={`h-6 w-6 stroke-1 ${
                isLiked
                  ? "fill-base-green text-white"
                  : "fill-white text-base-green"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col px-6 md:px-12 lg:px-20 py-16 pt-20">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter text-white mb-4 md:mb-6">
            {reportData?.["1Xa"]}
          </h1>
          <p className="text-lg md:text-xl font-montserrat text-white/90">
            {reportData?.["1Xc"]}
          </p>
        </div>

        {/* Image section */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-3xl">
            <div className="aspect-video rounded-2xl overflow-hidden border-4 border-base-secondary shadow-2xl bg-gray-200">
              <img
                src={`${THUMBNAIL_BASE_URL}${id}.webp`}
                className="w-full h-full object-cover"
                alt={`${reportData?.["1Xa"]} neighbourhood view`}
              />
            </div>
          </div>
        </div>

        {/* First CTA */}
        <div className="flex justify-center mb-12">
          <DownloadReportButton nhoodId={id} />
        </div>

        {/* Content sections with better spacing and backgrounds */}
        <div className="space-y-16">
          {/* Introduction text */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="report-text leading-relaxed">
              {reportData?.["text"]}
            </div>
          </div>

          {/* Housing Income section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
            <HousingIncome reportData={reportData} />
          </div>

          {/* Valuation section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl md:text-2xl font-inter font-bold text-primary-blue mb-4">
              Is this area over or under valued relative to what our property
              model predicts?
            </h2>
            <div className="flex justify-center mt-8">
              <DownloadReportButton
                text="Choose your future home wisely. Download Report with all the data"
                nhoodId={id}
              />
            </div>
          </div>

          {/* Amenities section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl md:text-2xl font-inter font-bold text-primary-blue mb-4">
              Amenities and Lifestyle
            </h2>
            <div className="report-text mb-6 leading-relaxed">
              Discover what life feels like day to day — nearby parks,
              playgrounds, libraries, cafés, and cuisine. Whether you're raising
              a family or living solo, see how well the area supports your
              lifestyle.
            </div>
            <Amenities reportData={reportData} />
          </div>

          {/* Final call to action section */}
          <div className="bg-gradient-to-br from-primary-blue to-primary-blue/80 rounded-2xl p-8 md:p-12 shadow-lg text-white">
            <h2 className="text-2xl md:text-3xl font-inter font-bold mb-6 text-center">
              It's Not Just a Move — It's Your Next Chapter
            </h2>

            <div className="space-y-4 mb-8">
              <p className="text-base md:text-lg font-montserrat font-light leading-relaxed">
                You're not just choosing a postcode. You're choosing where your
                mornings begin, where your kids will grow, and where you'll feel
                truly at home.
              </p>
              <p className="text-base md:text-lg font-montserrat font-light leading-relaxed">
                We've shown you a glimpse — property prices, amenities,
                transport links.
              </p>
              <p className="text-base md:text-lg font-montserrat font-light leading-relaxed">
                But there's so much more to know before you commit.
              </p>
            </div>

            <div className="flex justify-center mb-8">
              <DownloadReportButton
                text="Download the full Neighbourhood Report to discover"
                nhoodId={id}
              />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
              <p className="text-base md:text-lg font-montserrat font-light leading-relaxed">
                How safe and welcoming the area really is? Which schools and GPs
                will give you peace of mind? What the future holds — from
                flooding to extreme heat? Whether you'll be surrounded by
                nature, history, and beauty?
              </p>
            </div>

            <div className="text-center space-y-4 mb-8">
              <p className="text-lg md:text-xl font-montserrat font-medium">
                Your new street is more than just a place to live — it's a place
                to belong.
              </p>
              <p className="text-base md:text-lg font-montserrat font-light">
                Don't leave your next move to chance.
              </p>
              <p className="text-base md:text-lg font-montserrat font-light">
                Get the full picture. Feel confident.
              </p>
            </div>

            <div className="flex justify-center">
              <DownloadReportButton nhoodId={id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleReportMain;
