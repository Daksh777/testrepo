import { FC } from "react";
import { generateImageUrl } from "../utils";
import { ChildData } from "../report.types";

const HotMap: FC<ChildData> = ({ data }) => {
  return (
    <div className="h-full flex-grow relative ">
      {" "}
      <div className="absolute top-6 left-12  w-28 z-50">
        <div className="mb-2 text-red-800 text-sm"> Number of hot days:</div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-red-50"></div>
          <div className="text-[10px]">0.24 - 2</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-red-100"></div>
          <div className="text-[10px]">2 - 4</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-red-200"></div>
          <div className="text-[10px]">4 - 6</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-red-300"></div>
          <div className="text-[10px]">6 - 8</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-red-400"></div>
          <div className="text-[10px]">8 - 10</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-red-500"></div>
          <div className="text-[10px]">10 - 12</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-red-600"></div>
          <div className="text-[10px]">12 - 14</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-red-700"></div>
          <div className="text-[10px]">14 - 16</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-red-800"></div>
          <div className="text-[10px]">16 - 18</div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="h-2 w-4 bg-red-900"></div>
          <div className="text-[10px]">18 - 18.57</div>
        </div>
      </div>
      <div className="w-[300px] h-full relative z-10 mx-auto">
        <img
          src={generateImageUrl(data?.["10B1"])}
          alt="10B"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default HotMap;
