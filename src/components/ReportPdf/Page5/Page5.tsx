import { FC } from "react";
import Navbar from "../Navbar/Navbar";
import { PropData } from "../report.types";

const Page5: FC<PropData> = ({ pageData }) => {
  return (
    <div className="pdf-page flex flex-col">
      <Navbar
        page={5}
        sector_code={pageData?.["1Xa"]}
        created_at={pageData?.["0A"]}
        reference={pageData?.["0B"]}
      />
      <div className="px-[42px] mt-6 flex-grow flex flex-col">
        <div className="flex flex-row">
          <div className="bg-dark-blue px-4 py-2 text-white flex-grow font-medium">
            GP surgeries
          </div>
          <div className="bg-base-green w-[160px] text-dark-blue py-2 text-center">
            Score: <span className="font-medium">{pageData?.["5E"]}/100</span>
          </div>
        </div>
        <div className="text-xs text-dark-blue font-medium ml-auto mr-[20%] mt-4">
          Care Quality Commission ratings
        </div>
        <div className="mt-2">
          <table className="table-fixed w-full text-xs text-dark-blue ">
            <thead>
              <tr className="border-b-2 border-dark-blue">
                <th className="font-normal py-2 text-left pl-4">Primary</th>
                <th className="font-normal py-2 w-20">Dist (miles)</th>
                <th className="font-normal py-2 w-14">Caring</th>
                <th className="font-normal py-2 w-14">Effective</th>
                <th className="font-normal py-2 w-14">Overall</th>
                <th className="font-normal py-2 w-16">Responsive</th>
                <th className="font-normal py-2 w-14">Safe</th>
                <th className="font-normal py-2 w-14">Well-led</th>

                <th className="font-normal w-20 truncate">
                  As of<sup>4</sup>
                </th>
              </tr>
            </thead>
            <tbody>
              {pageData?.["5Ea"]?.map((item: any, index: number) => (
                <tr key={item} className="border-b-[0.5px] border-dark-blue">
                  <td className="text-left pl-4 py-2 truncate">{item}</td>
                  <td className="text-center ">
                    {parseFloat(pageData?.["5Eb"]?.[index] || "0").toFixed(1)}
                  </td>
                  <td className="text-center bg-[#e7e9ed]">
                    {pageData?.["5Ec"]?.[index]}
                  </td>
                  <td className="text-center">{pageData?.["5Ed"]?.[index]}</td>
                  <td className="text-center bg-[#e7e9ed]">
                    {pageData?.["5Ee"]?.[index]}
                  </td>
                  <td className="text-center">{pageData?.["5Ef"]?.[index]}</td>
                  <td className="text-center bg-[#e7e9ed]">
                    {pageData?.["5Eg"]?.[index]}
                  </td>
                  <td className="text-center">{pageData?.["5Eh"]?.[index]}</td>
                  <td className="text-center bg-[#e7e9ed]">
                    {pageData?.["5Ei"]?.[index]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-12 flex-grow flex flex-col">
          <div className="h-[0.5px] w-[200px] bg-dark-blue"></div>

          <div className="text-dark-blue text-[10px]  mt-6 mb-2">
            <sup>1</sup> Index of Multiple Deprivation. The chart reports the
            population centre of the postcode sector.
          </div>

          <div className="text-dark-blue text-[10px]  mb-2">
            <sup>2</sup> Average of postcode sectors’ population centres.
          </div>
          <div className="text-dark-blue text-[10px]  mb-2">
            <sup>3</sup> “N/A” usually indicates school has not yet been
            inspected.
          </div>
          <div className="text-dark-blue text-[10px]  mb-2">
            <sup>4</sup> One of the inspections for the six domains (Caring,
            Effective, etc) dates from this date. The others are more recent.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page5;
