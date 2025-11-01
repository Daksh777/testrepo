import { FC } from "react";
import { ChildData } from "../report.types";

const Winter: FC<ChildData> = ({ data }) => {
  return (
    <div className="h-[244px] w-[360px] bg-dark-blue text-white px-16 py-10">
      <div className="text-base font-medium">Winter precipitation</div>
      <div className="text-xs mt-8">
        The map at the right indicates projections for change in average
        wintertime daily rainfall under a 3-degree-warming scenario.{" "}
        {data?.["10A3"]} is indicated in highlighter.
      </div>
    </div>
  );
};

export default Winter;
