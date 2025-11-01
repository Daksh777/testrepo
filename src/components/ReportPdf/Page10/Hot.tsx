import { FC } from "react";
import { ChildData } from "../report.types";

const Hot: FC<ChildData> = ({ data }) => {
  return (
    <div className="h-[244px] w-[360px] bg-base-green text-white px-16 py-10">
      <div className="text-base font-medium">'Hot' days</div>
      <div className="text-xs mt-6">
        The map at left indicates projections for the average number of days
        with at least 30-degree maximum temperature, under a 3-degree-warming
        scenario.<sup>1</sup>
      </div>
      <div className="text-xs mt-2">
        {data?.["10B3"]} is indicated in highlighter.
      </div>
    </div>
  );
};

export default Hot;
