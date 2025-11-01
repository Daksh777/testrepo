import { ChildData } from "../report.types";
import { FC } from "react";

const Noise: FC<ChildData> = ({ data }) => {
  return (
    <div className="w-full">
      {" "}
      <div className="flex flex-row">
        <div className="bg-dark-blue px-4 py-2 text-white flex-grow font-medium">
          Noise<sup>3</sup>
        </div>
        <div className="bg-base-green w-[160px] text-dark-blue py-2 text-center">
          Score: <span className="font-medium">{data?.["3I"]}/100</span>
        </div>
      </div>
      <div className="flex flex-row mt-6">
        <div className="w-[60%] flex flex-row justify-center gap-2 items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              className="h-20 w-20"
            >
              <path
                className="fill-base-green"
                d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v7.5c0 .83.67 1.5 1.5 1.5S6 20.33 6 19.5V19h12v.5c0 .82.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5V12zM7.5 16c-.83 0-1.5-.67-1.5-1.5S6.67 13 7.5 13s1.5.67 1.5 1.5S8.33 16 7.5 16m9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5M5.81 10l1.04-3h10.29l1.04 3z"
              ></path>
            </svg>
          </div>
          <div className="text-dark-blue text-2xl font-medium">
            {data?.["3I1"]} <br /> DB
          </div>
        </div>
        <div className="w-[40%] flex flex-row justify-center gap-2 items-center">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="1em"
              height="1em"
              className="h-20 w-20"
            >
              <path
                className="fill-base-green"
                d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h2.23l2-2H14l2 2h2v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4M7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17m3.5-7H6V6h5zm2 0V6h5v4zm3.5 7c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5"
              ></path>
            </svg>
          </div>
          <div className="text-dark-blue text-2xl font-medium">
            {data?.["3I3"]} <br /> DB
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-4">
        <div className="text-dark-blue text-base font-medium flex flex-row justify-between w-full">
          Average in {data?.["3I5"]}
        </div>
      </div>
      <div className="flex flex-row text-dark-blue text-base font-medium">
        <div className="shrink-0 w-[50%] text-right">{data?.["3I2"]} db</div>
        <div className="w-[50%]  text-center">{data?.["3I4"]} db</div>
      </div>
    </div>
  );
};

export default Noise;
