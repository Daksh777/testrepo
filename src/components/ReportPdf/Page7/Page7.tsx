import { FC } from "react";
import { PropData } from "../report.types";
import Navbar from "../Navbar/Navbar";
import Occupation from "./Occupation";
import OccupationChart from "./OccupationChart";
import Educational from "./Educational";
import EducationalChart from "./EducationalChart";

const Page7: FC<PropData> = ({ pageData }) => {
  return (
    <div className="pdf-page flex flex-col">
      <Navbar
        page={7}
        sector_code={pageData?.["1Xa"]}
        created_at={pageData?.["0A"]}
        reference={pageData?.["0B"]}
      />
      <div className="h-[144px] w-full flex flex-row bg-[#d3d9e0] px-[42px] items-center">
        <div className="text-dark-blue font-medium text-4xl">Economy</div>
        <div className="ml-auto">
          <div className="text-dark-blue text-lg ">Overall Score:</div>
          <div className="text-right text-gre   en font-normal italic text-lg">
            (no basis for scoring)
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex flex-row h-[322px]">
          <Occupation data={pageData} />
          <OccupationChart data={pageData} />
        </div>
        <div className="flex flex-row h-[322px] mt-6">
          <Educational data={pageData} />
          <EducationalChart data={pageData} />
        </div>
      </div>
      <div className="mt-12 flex-grow flex flex-col px-[42px]">
        <div className="h-[0.5px] w-[200px] bg-dark-blue"></div>

        <div className="text-dark-blue text-[10px]  mt-6 mb-2">
          <sup>1</sup> The graph reports a “location quotient”, where a value of
          “1” is equal to the national average; values above “1” are above the
          national average. The numbers refer to relevant LSOA (OA in rural
          areas)
        </div>
      </div>
    </div>
  );
};

export default Page7;
