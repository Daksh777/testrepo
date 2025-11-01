import { generateImageUrl } from "../utils";
import { ChildData } from "../report.types";
import { FC } from "react";

const FloodOutlines: FC<ChildData> = ({ data }) => {
  return (
    <div className="w-full">
      {" "}
      <div className="flex flex-row">
        <div className="bg-dark-blue px-4 py-2 text-white flex-grow font-medium">
          Flood outlines<sup>1</sup>
        </div>
      </div>
      <div className="h-[210px] w-full relative mt-4 bg-blue-100">
        <img
          src={generateImageUrl(data?.["3C"])}
          className="w-full h-full object-cover"
          alt="3B"
        />
      </div>
    </div>
  );
};

export default FloodOutlines;
