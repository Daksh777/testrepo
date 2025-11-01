import { FC } from "react";
import { PropData } from "../report.types";
import Navbar from "../Navbar/Navbar";
import TreeCover from "./TreeCover";
import Nearest from "./Nearest";
import ListedGarden from "./ListedGarden";
import ListedBuilding from "./ListedBuilding";

const Page9: FC<PropData> = ({ pageData, sector_code }) => {
  return (
    <div className="pdf-page flex flex-col">
      <Navbar
        page={9}
        sector_code={sector_code}
        created_at={pageData?.["0A"]}
        reference={pageData?.["0B"]}
      />
      <div className="h-[144px] w-full flex flex-row bg-[#d3d9e0] px-[42px] items-center">
        <div className="text-dark-blue font-medium text-4xl">
          Nature and beauty
        </div>
        <div className="ml-auto">
          <div className="text-dark-blue text-lg ">Overall Score:</div>
          <div className="text-right text-base-green font-medium text-3xl">
            {pageData?.["9A"]}/100
          </div>
        </div>
      </div>
      <div className="px-[42px] mt-6">
        <TreeCover data={pageData} />
        <Nearest data={pageData} />
        <ListedGarden data={pageData} />
        <ListedBuilding data={pageData} />
      </div>
      <div className="mt-auto flex flex-col px-[42px] mb-6">
        <div className="h-[0.5px] w-[200px] bg-dark-blue"></div>

        <div className="text-dark-blue text-[10px] mt-4 ">
          <sup>1</sup> Percent of the area 15 meters either side of roadway
          centerline. Applies to 200 meter radius of neighbourhood center.
        </div>
        <div className="text-dark-blue text-[10px] ">
          <sup>2</sup> Grade I or II star
        </div>
      </div>
    </div>
  );
};

export default Page9;
