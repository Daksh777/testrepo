import { FC } from "react";
import { ChildData } from "../report.types";

const Nearest: FC<ChildData> = ({ data }) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="w-[330px]">
        <div className="flex flex-row">
          <div className="bg-dark-blue px-4 py-2 text-white flex-grow font-medium">
            Nearest nature
          </div>
          <div className="bg-base-green w-[120px] text-dark-blue py-2 text-center">
            Score: <span className="font-medium">{data?.["9C"]}/100</span>
          </div>
        </div>
        <div className="flex flex-row items-center py-4">
          <div className="text-base-green text-xs font-medium break-all">
            {data?.["9C1"]}
          </div>
          <div className="mx-2 h-6 w-[2px] bg-dark-blue"></div>
          <div className="text-dark-blue text-xs font-light shrink-0">
            Distance (miles)
          </div>
          <div className="text-base-green text-xs font-medium ml-1 shrink-0">
            {data?.["9C2"]?.toFixed(1)}
          </div>
        </div>
      </div>
      <div className="w-[354px]">
        {" "}
        <div className="flex flex-row">
          <div className="bg-dark-blue px-4 py-2 text-white flex-grow font-medium">
            Nearest shoreline
          </div>
          <div className="bg-base-green w-[120px] text-dark-blue py-2 text-center">
            Score: <span className="font-medium">{data?.["9D"]}/100</span>
          </div>
        </div>
        <div className="flex flex-row items-center py-4">
          <div className="text-base-green text-xs font-medium break-all">
            {data?.["9D1"]}
          </div>
          <div className="mx-2 h-6 w-[2px] bg-dark-blue"></div>
          <div className="text-dark-blue text-xs font-light shrink-0">
            Distance (miles)
          </div>
          <div className="text-base-green text-xs font-medium ml-1 shrink-0">
            {data?.["9D2"]?.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nearest;
