/* eslint-disable @typescript-eslint/no-explicit-any */
import SharedBg from "@/components/utils/SharedBg";
import BreadCrumb from "@/components/utils/BreadCrumb";
import Navbar from "@/components/Navbar/Navbar";
import { Link } from "react-router";

const CardButton = ({
  config,
}: {
  config: {
    title: string;
    description: string;
    buttonText: string;
    href: string;
  };
}) => {
  return (
    <div className="bg-base-secondary backdrop-blur-md rounded-xl z-10 text-primary-blue overflow-hidden w-[80%] md:w-[40%] border-2 border-primary-blue">
      <div className="font-semibold h-16 flex items-center justify-center px-6 border-b border-gray-400 text-sm md:text-base py-2 text-center">
        {config.title}
      </div>
      <div className="hidden md:flex font-light text-xs md:text-sm px-6 items-center h-36 border-b border-gray-400 py-2">
        {config.description}
      </div>
      <div className="min-h-16 flex items-center justify-center px-6 shrink-0 py-2">
        <Link
          to={config.href}
          className="text-center bg-base-green px-4 py-2 text-xs md:text-sm font-semibold text-white rounded-md hover:bg-base-green/80 transition-all duration-300 cursor-pointer"
        >
          {config.buttonText}
        </Link>
      </div>
    </div>
  );
};

const HomeMain = () => {
  return (
    <div className="min-h-screen relative bg-base-secondary flex flex-col text-white">
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
                disabled: false,
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
      <div className="flex flex-col px-10 md:px-20 z-10 justify-center items-center mt-12 md:mt-16">
        <div className="text-4xl md:text-5xl lg:text-6xl font-semibold text-center">
          Your journey stars here{" "}
        </div>
        <div className="text-sm md:text-base lg:text-lg text-center mt-4">
          Welcome to Unmapt. Find the place you can call home!
          <br />
          You can search in two ways:
        </div>

        <div className="overflow-hidden relative flex flex-col md:flex-row   w-full  md:w-[80%] lg:w-[70%] h-[60vh]  rounded-4xl  my-8 md:mt-16 justify-around items-center border-4 border-base-secondary">
          <img
            src={
              "https://wsrv.nl/?url=https://unmapt.io/wp-content/uploads/2025/08/Main_pic.jpeg&q=80"
            }
            alt="SearchBg"
            className="absolute w-full h-full object-cover inset-0"
          />
          <CardButton
            config={{
              title: "Use a known location",
              description:
                "Select a location you already know, and let us find places that are similar. You can adjust any of the preferences that you want to adjust before starting the search.",
              buttonText: "Let me pick a reference location",
              href: "/search",
            }}
          />
          <CardButton
            config={{
              title: "Go straight to preference-selection",
              description:
                "Just go straight to the preferences dashboard to start my search. ",
              buttonText: "Go straight to preferences",
              href: "/preferences",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeMain;
