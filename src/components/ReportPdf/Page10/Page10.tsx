import { PropData } from "../report.types";
import Navbar from "../Navbar/Navbar";
import Winter from "./Winter";
import WinterMap from "./WinterMap";
import HotMap from "./HotMap";
import Hot from "./Hot";
import { FC } from "react";

const Page10: FC<PropData> = ({ pageData }) => {
  return (
    <div className="pdf-page flex flex-col">
      <Navbar
        page={10}
        sector_code={pageData?.["1Xa"]}
        created_at={pageData?.["0A"]}
        reference={pageData?.["0B"]}
      />
      <div className="h-[144px] w-full flex flex-row bg-[#d3d9e0] px-[42px] items-center">
        <div className="text-dark-blue font-medium text-4xl">
          Climate change
        </div>
        <div className="ml-auto">
          <div className="text-dark-blue text-lg ">Overall Score:</div>
          <div className="text-right text-base-green font-normal italic text-lg">
            (no basis for scoring)
          </div>
        </div>
      </div>
      <div className="flex flex-row h-[324px] mt-12">
        <Winter data={pageData} />
        <WinterMap data={pageData} />
      </div>
      <div className="flex flex-row h-[324px] mt-4">
        <HotMap data={pageData} />
        <Hot data={pageData} />
      </div>
      <div className="mt-auto flex flex-col px-[42px] mb-12">
        <div className="h-[0.5px] w-[200px] bg-dark-blue"></div>

        <div className="text-dark-blue text-[10px] mt-4 ">
          <sup>1</sup>I.e. if global temperatures rise to 3 degrees above the
          pre-industrial average; currently, we are 1.1 degrees above the
          pre-industrial average.
        </div>
      </div>
    </div>
  );
};

export default Page10;
