import { FC } from "react";
import Navbar from "../Navbar/Navbar";
import FloodEvents from "./FloodEvents";
import FloodRiskArea from "./FloodRiskArea";
import FloodOutlines from "./FloodOutlines";
import Airport from "./Airport";
import { PropData } from "../report.types";
import FloodRiskAreaMap from "./FloodRiskAreaMap";
import Noise from "./Noise";

const Page3: FC<PropData> = ({ pageData }) => {
  return (
    <div className="pdf-page flex flex-col">
      <Navbar
        page={3}
        sector_code={pageData?.["1Xa"]}
        created_at={pageData?.["0A"]}
        reference={pageData?.["0B"]}
      />
      <div className="h-[144px] w-full flex flex-row bg-[#d3d9e0] px-[42px] items-center">
        <div className="text-dark-blue font-medium text-4xl">Environment</div>
        <div className="ml-auto">
          <div className="text-dark-blue text-lg ">Overall Score:</div>
          <div className="text-right text-base-green font-medium text-3xl">
            {pageData?.["3A"]}/100
          </div>
        </div>
      </div>
      <div className="px-[42px] mt-6  flex flex-row justify-between">
        <div className="w-[352px]">
          <FloodEvents data={pageData} />
        </div>
        <div className="w-[332px]">
          <FloodOutlines data={pageData} />
        </div>
      </div>
      <div className="px-[42px] mt-4  flex flex-row justify-between">
        <div className="w-[352px]">
          <FloodRiskArea data={pageData} />
        </div>
        <div className="w-[332px]">
          <FloodRiskAreaMap data={pageData} />
        </div>
      </div>
      <div className="px-[42px] mt-4 flex flex-row justify-between">
        <div className="w-[352px]">
          <Noise data={pageData} />
        </div>
        <div className="w-[332px]">
          {" "}
          <Airport data={pageData} />
        </div>
      </div>
      <div className=" flex-grow flex flex-col px-[42px] font-light">
        <div className="h-[0.5px] w-full bg-dark-blue"></div>
        <div className="flex flex-row gap-x-4 mt-4">
          <div className="text-dark-blue text-[10px]">
            <sup>1</sup> Since 2000.
          </div>
          <div className="text-dark-blue text-[10px] ">
            <sup>2</sup>Percent of neighbourhood in medium- or high-risk flood
            area.
          </div>
          <div className="text-dark-blue text-[10px]">
            <sup>3</sup> Average for neighbourhood.
          </div>
        </div>
        <div className="text-dark-blue text-[10px] font-medium">
          * This report is not a substitute for detailed flood-risk assessment
          at the property level.
        </div>
      </div>
    </div>
  );
};

export default Page3;
