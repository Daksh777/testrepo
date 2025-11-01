import { FC } from "react";
import { ChildData } from "../report.types";

const Educational: FC<ChildData> = ({ data }) => {
  return (
    <div className="h-full w-[290px] text-dark-blue flex flex-col py-10 px-10">
      <div className="text-base font-medium">Educational attainment</div>
      <div className="text-xs font-light mt-6">
        In 2021, the proportion of people with {data?.["7F1"]} was{" "}
        {data?.["7F2"]?.toFixed(1)} times the national average. In 2011, it was{" "}
        {data?.["7F3"]?.toFixed(1)} times the national average ({data?.["7F4"]}{" "}
        {data?.["7F5"]} than the national average).
      </div>
      <div className="mt-8">
        <div className="flex flex-row items-center">
          <div className="h-3 w-3 bg-base-green"></div>
          <div className="text-dark-blue text-xs ml-2">2021</div>
        </div>
        <div className="flex flex-row items-center mt-2">
          <div className="h-3 w-3 bg-dark-blue"></div>
          <div className="text-dark-blue text-xs ml-2">2011</div>
        </div>
      </div>
    </div>
  );
};

export default Educational;
