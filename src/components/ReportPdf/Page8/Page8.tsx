import { FC } from "react";
import { PropData } from "../report.types";
import Navbar from "../Navbar/Navbar";
import PublicTransport from "./PublicTransport";
import Rail from "./Rail";
import Sustainability from "./Sustainability";

const Page8: FC<PropData> = ({ pageData }) => {
  return (
    <div className="pdf-page flex flex-col">
      <Navbar
        page={8}
        sector_code={pageData?.["1Xa"]}
        created_at={pageData?.["0A"]}
        reference={pageData?.["0B"]}
      />
      <div className="h-[144px] w-full flex flex-row bg-[#d3d9e0] px-[42px] items-center">
        <div className="text-dark-blue font-medium text-4xl">Transport</div>
        <div className="ml-auto">
          <div className="text-dark-blue text-lg ">Overall Score:</div>
          <div className="text-right text-base-green font-medium text-3xl">
            {pageData?.["8A"]}/100
          </div>
        </div>
      </div>
      <div className="px-[42px] mt-6 relative">
        <PublicTransport data={pageData} />
        <div className="absolute bottom-0 flex flex-row right-[30%]">
          <div className="flex flex-row items-center">
            <div className="h-2 w-2 bg-dark-blue"></div>
            <div className="text-dark-blue text-[10px] ml-1">Wednesday</div>
          </div>
          <div className="flex flex-row items-center ml-4">
            <div className="h-2 w-2 bg-base-green"></div>
            <div className="text-dark-blue text-[10px] ml-1">Sunday</div>
          </div>
        </div>
      </div>
      <div className="px-[42px] mt-6">
        <Rail data={pageData} />
      </div>
      <div className="px-[42px] mt-6">
        <Sustainability data={pageData} />
      </div>
      <div className="mt-auto flex flex-col px-[42px] mb-6">
        <div className="h-[0.5px] w-[200px] bg-dark-blue"></div>

        <div className="text-dark-blue text-[10px] mt-4 mb-1">
          <sup>1</sup>The number of unique bus departures within{" "}
          {pageData?.["8De"]}
          metres of the population centroid (truncated at 250)
        </div>

        <div className="text-dark-blue text-[10px]  mb-1 ">
          <sup>2</sup>Distance from neighbourhood center.
        </div>
        <div className="text-dark-blue text-[10px]  mb-1 ">
          <sup>3</sup>For the Census LSOA (OA in rural areas) associated with
          this area.
        </div>
      </div>
    </div>
  );
};

export default Page8;
