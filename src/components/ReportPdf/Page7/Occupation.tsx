import { FC } from "react";
import { ChildData } from "../report.types";

const Occupation: FC<ChildData> = ({ data }) => {
  return (
    <div className="h-full w-[290px] bg-dark-blue text-white flex flex-col justify-center px-10">
      <div className="text-base font-medium">
        Occupation<sup>1</sup>
      </div>
      <div className="text-xs font-light mt-6">
        The chart tells us that in 2021 “{data?.["7C1"]}” in {data?.["7C2"]}{" "}
        were {data?.["7C3"]} national average. This was {data?.["7C4"]} 2011
        when these jobs were {data?.["7C5"]} the national average. “
        {data?.["7C6"]}” also made a {data?.["7C7"]} between 2011-2021.
      </div>
    </div>
  );
};

export default Occupation;
