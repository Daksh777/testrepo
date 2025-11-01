import { FC } from "react";
import { ChildData } from "../report.types";

const Cusine: FC<ChildData> = ({ data }) => {
  return (
    <div className="w-[506px] flex flex-col border border-dark-blue">
      <div className="bg-dark-blue text-white text-sm text-center py-2 font-medium">
        Cuisine<sup>3</sup> (nearest, in miles)
      </div>
      <div className="flex flex-row text-dark-blue text-xs my-4 divide-x divide-dark-blue flex-grow">
        <div className="w-1/2 px-4 flex flex-col justify-between ">
          <div className="flex flex-row justify-between">
            <div>
              <div className="font-medium">Caribbean</div>
              <div className="font-light text-[10px]">{data?.["6J1"]}</div>
            </div>
            <div className="font-medium">{data?.["6J"]?.toFixed(1)}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <div className="font-medium">Indian</div>
              <div className="font-light text-[10px]">{data?.["6K1"]}</div>
            </div>
            <div className="font-medium">{data?.["6K"]?.toFixed(1)}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <div className="font-medium">Italian</div>
              <div className="font-light text-[10px]">{data?.["6L1"]}</div>
            </div>
            <div className="font-medium">{data?.["6L"]?.toFixed(1)}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <div className="font-medium">Japanese</div>
              <div className="font-light text-[10px]">{data?.["6M1"]}</div>
            </div>
            <div className="font-medium">{data?.["6M"]?.toFixed(1)}</div>
          </div>
        </div>
        <div className="w-1/2 px-4 flex flex-col justify-between ">
          <div className="flex flex-row justify-between">
            <div>
              <div className="font-medium">Mexican</div>
              <div className="font-light text-[10px]">{data?.["6N1"]}</div>
            </div>
            <div className="font-medium">{data?.["6N"]?.toFixed(1)}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <div className="font-medium">Thai</div>
              <div className="font-light text-[10px]">{data?.["6O1"]}</div>
            </div>
            <div className="font-medium">{data?.["6O"]?.toFixed(1)}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <div className="font-medium">Vegetarian</div>
              <div className="font-light text-[10px]">{data?.["6P1"]}</div>
            </div>
            <div className="font-medium">{data?.["6P"]?.toFixed(1)}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <div className="font-medium">Vietnamese</div>
              <div className="font-light text-[10px]">{data?.["6Q1"]}</div>
            </div>
            <div className="font-medium">{data?.["6Q"]?.toFixed(1)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cusine;
