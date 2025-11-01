import { FC } from "react";
import Navbar from "../Navbar/Navbar";
import MedianChart from "./MedianChart";
import MedianInfo from "./MedianInfo";
import MedianInsights from "./MedianInsights";
import HousingCharacterstics from "./HousingCharacterstics";
import { PropData } from "../report.types";

const Page2: FC<PropData> = ({ pageData }) => {
  return (
    <div className="pdf-page flex flex-col">
      <Navbar
        page={2}
        sector_code={pageData?.["1Xa"]}
        created_at={pageData?.["0A"]}
        reference={pageData?.["0B"]}
      />
      <div className="h-[144px] w-full flex flex-row bg-[#d3d9e0] px-[42px] items-center">
        <div className="text-dark-blue font-medium text-4xl">
          Prices and housing
          <br />
          characteristics
        </div>
        <div className="ml-auto">
          <div className="text-dark-blue text-lg ">Overall Score:</div>
          <div className="text-right text-base-green font-medium text-3xl">
            {pageData?.["2A"]}/100
          </div>
        </div>
      </div>
      <div className="px-[42px] mt-6 flex-grow flex flex-col">
        <div className="flex flex-row">
          <div className="bg-dark-blue px-4 py-2 text-white flex-grow font-medium">
            Median price, {pageData?.["2B0"]}, {pageData?.["2B1"]}
          </div>
          <div className="bg-base-green w-[160px] text-dark-blue py-2 text-center">
            Score: <span className="font-medium">{pageData?.["2B"]}/100</span>
          </div>
        </div>
        <div className="h-[284px] flex flex-row justify-around items-center">
          <MedianChart data={pageData} />
          <MedianInfo data={pageData} />
        </div>
        <div className="h-[220px] flex flex-row justify-between mt-4">
          <MedianInsights data={pageData} />
          <HousingCharacterstics data={pageData} />
        </div>
        <div className="flex flex-row text-dark-blue justify-between items-end mt-6">
          <div className="w-[306px] flex flex-col">
            <div className="text-sm font-bold text-center">
              As of {pageData?.["2Ea"]}
            </div>
            <div className="text-sm font-medium text-center">
              Prices in this neighbourhood are
            </div>
            <div className="text-4xl font-medium text-center">
              {pageData?.["2N"]?.toFixed(1)}% {pageData?.["2O"]}
            </div>
            <div className="text-sm font-light text-center">
              what our model suggests they should be.
            </div>
          </div>
          <div className="w-[372px] flex flex-col  h-fit ">
            <div className="text-sm font-medium text-center">
              The median house size is
            </div>{" "}
            <div className="text-4xl font-medium text-center">
              {pageData?.["2Za"]?.toFixed(1)}% {pageData?.["2Zb"]}
            </div>{" "}
            <div className="text-sm font-light text-center">
              the national average.
            </div>
          </div>
        </div>
        <div className="mt-12 flex-grow flex flex-col">
          <div className="h-[0.5px] w-[200px] bg-dark-blue"></div>

          <div className="text-dark-blue text-[10px]  mt-6 mb-2">
            <sup>1</sup> The ratio of median house prices to median income is{" "}
            {pageData?.["2Zc"]?.toFixed(1)}, which is{" "}
            {pageData?.["2G"]?.toFixed(1)}% {pageData?.["2Zd"]} than the
            national ratio.
          </div>

          <div className="text-dark-blue text-[10px] mb-2">
            <sup>2</sup> The graph reports the percent that housing is over- or
            under-valued relative to what our our property model predicts.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;
