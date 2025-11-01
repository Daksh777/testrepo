import { FC } from "react";
import Navbar from "../Navbar/Navbar";
import Deprevation from "./Deprevation";
import AntiSocialChart from "./AntiSocialChart";
import SchoolQualtity from "./SchoolQualtity";
import { PropData } from "../report.types";

const Page4: FC<PropData> = ({ pageData }) => {
  return (
    <div className="pdf-page flex flex-col">
      <Navbar
        page={4}
        sector_code={pageData?.["1Xa"]}
        created_at={pageData?.["0A"]}
        reference={pageData?.["0B"]}
      />
      <div className="h-[144px] w-full flex flex-row bg-[#d3d9e0] px-[42px] items-center">
        <div className="text-dark-blue font-medium text-4xl">
          Social context
        </div>
        <div className="ml-auto">
          <div className="text-dark-blue text-lg ">Overall Score:</div>
          <div className="text-right text-base-green font-medium text-3xl">
            {pageData?.["4A"]}/100
          </div>
        </div>
      </div>
      <div className="px-[42px] mt-6 flex-grow flex flex-col">
        <div className="flex flex-row h-[268px] justify-between">
          <Deprevation data={pageData} />
          <AntiSocialChart data={pageData} />
        </div>
        <div className="mt-6">
          <SchoolQualtity data={pageData} />
        </div>
      </div>
    </div>
  );
};

export default Page4;
