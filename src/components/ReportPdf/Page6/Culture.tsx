import { FC } from "react";
import { ChildData } from "../report.types";

const Culture: FC<ChildData> = ({ data }) => {
  return (
    <div className="w-[506px] flex flex-col border border-dark-blue">
      <div className="bg-dark-blue text-white text-sm text-center py-2 font-medium">
        Culture (nearest, in miles)
      </div>
      <div className="flex flex-row text-dark-blue text-xs my-4 divide-x divide-dark-blue flex-grow">
        <div className="w-full px-4 flex flex-col justify-between ">
          <div className="flex flex-row ">
            <div className="font-medium w-16">Cinema</div>
            <div className="font-light grow text-right">{data?.["6S1"]}</div>

            <div className="font-medium w-20 text-center">
              {data?.["6T1"]?.toFixed(1)}
            </div>
          </div>
          <div className="flex flex-row ">
            <div className="font-medium w-16">Gallery</div>
            <div className="font-light grow text-right">{data?.["6S2"]}</div>

            <div className="font-medium w-20 text-center">
              {data?.["6T2"]?.toFixed(1)}
            </div>
          </div>
          <div className="flex flex-row ">
            <div className="font-medium w-16">Museum</div>
            <div className="font-light grow text-right">{data?.["6S3"]}</div>

            <div className="font-medium w-20 text-center">
              {data?.["6T3"]?.toFixed(1)}
            </div>
          </div>
          <div className="flex flex-row ">
            <div className="font-medium w-16">Music</div>
            <div className="font-light grow text-right">{data?.["6S4"]}</div>

            <div className="font-medium w-20 text-center">
              {data?.["6T4"]?.toFixed(1)}
            </div>
          </div>
          <div className="flex flex-row ">
            <div className="font-medium w-16">Theatre</div>
            <div className="font-light grow text-right">{data?.["6S5"]}</div>

            <div className="font-medium w-20 text-center">
              {data?.["6T5"]?.toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Culture;
