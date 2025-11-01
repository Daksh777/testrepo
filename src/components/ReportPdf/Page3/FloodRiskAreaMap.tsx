import { generateImageUrl } from "../utils";
import { ChildData } from "../report.types";
import { FC } from "react";

const FloodRiskAreaMap: FC<ChildData> = ({ data }) => {
  return (
    <div className="w-full">
      <div className="h-[216px] w-full relative my-4 bg-blue-100">
        <img
          src={generateImageUrl(data?.["3F1"])}
          className="w-full h-full object-cover"
          alt="3B"
        />
      </div>
    </div>
  );
};

export default FloodRiskAreaMap;
