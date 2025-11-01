import { FC } from "react";
import { generateImageUrl } from "../utils";
import { ChildData } from "../report.types";

const WinterMap: FC<ChildData> = ({ data }) => {
  return (
    <div className="h-full flex-grow relative ">
      <div className="absolute top-6 left-12 text-dark-blue text-[10px] w-28 z-50">
        <div className="mb-2"> Percentage change from 1981-2000 baseline:</div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-blue-50"></div>
          <div className="text-[10px]">0.7 - 4.1</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-blue-100"></div>
          <div className="text-[10px]">4.1 - 6.5</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-blue-200"></div>
          <div className="text-[10px]">6.5 - 8.4</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-blue-300"></div>
          <div className="text-[10px]">8.4 - 10.1</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-blue-400"></div>
          <div className="text-[10px]">10.1 - 11.6</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-blue-500"></div>
          <div className="text-[10px]">11.6 - 13.0</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-blue-600"></div>
          <div className="text-[10px]">13.0 - 14.7</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-blue-700"></div>
          <div className="text-[10px]">14.7 - 17</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-blue-800"></div>
          <div className="text-[10px]">17 - 19.6</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-blue-900"></div>
          <div className="text-[10px]">19.6 - 22.1</div>
        </div>
      </div>
      <div className="w-[300px] h-full relative z-10 mx-auto">
        <img
          src={generateImageUrl(data?.["10A1"])}
          alt="10A"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default WinterMap;
