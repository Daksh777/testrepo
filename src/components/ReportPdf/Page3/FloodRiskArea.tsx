import { ChildData } from "../report.types";
import { FC } from "react";

const FloodRiskArea: FC<ChildData> = ({ data }) => {
  return (
    <div className="w-full">
      {" "}
      <div className="flex flex-row">
        <div className="bg-dark-blue px-4 py-2 text-white flex-grow font-medium">
          Flood risk area
        </div>
        <div className="bg-base-green w-[160px] text-dark-blue py-2 text-center">
          Score: <span className="font-medium">{data?.["3E"]}/100</span>
        </div>
      </div>
      <div className="h-[182px] w-full text-dark-blue">
        <div className="flex flex-row items-center justify-between pt-6">
          <div className="text-base px-2">
            % of neighbourhood in flood-risk zone<sup>2</sup>
          </div>
        </div>
        <div className="flex flex-row text-sm mt-2 px-2">
          <div className="w-[50%]">Source</div>
          <div className="w-[25%] text-center">Today</div>
          <div className="w-[25%] text-center">2050</div>
        </div>
        <div className="h-[2px] w-full bg-dark-blue my-2"></div>
        <div className="flex flex-row text-sm mt-2 px-2">
          <div className="w-[50%]">Surface water</div>
          <div className="w-[25%] text-center font-medium">
            {data?.["3E1"]}%
          </div>
          <div className="w-[25%] text-center font-medium">
            {data?.["3E3"]}%
          </div>
        </div>
        <div className="h-[0.5px] w-full bg-dark-blue my-2"></div>

        <div className="flex flex-row text-sm mt-2 px-2">
          <div className="w-[50%]">River and Sea</div>
          <div className="w-[25%] text-center font-medium">
            {data?.["3E2"]}%
          </div>
          <div className="w-[25%] text-center font-medium">
            {data?.["3E4"]}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloodRiskArea;
