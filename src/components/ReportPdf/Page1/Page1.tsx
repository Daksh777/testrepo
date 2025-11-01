import Navbar from "../Navbar/Navbar";
import { FC } from "react";
import { PropData } from "../report.types";
import { generateImageUrl } from "../utils";

const roundOfTo1 = (num: number) => {
  if (!num) return "-";
  return Math.round(num * 10) / 10;
};

const Page1: FC<PropData> = ({ pageData }) => {
  return (
    <div className="pdf-page">
      <Navbar
        page={1}
        sector_code={pageData?.["1Xa"]}
        created_at={pageData?.["0A"]}
        reference={pageData?.["0B"]}
      />
      <div className="h-[364px] bg-[#002147] w-full px-[48px] flex flex-row relative py-6">
        <div className="w-full flex flex-col">
          <div className="text-base-green text-6xl font-medium line-clamp-2 z-10">
            {pageData?.["1Xa"]}
          </div>
          <div className="flex flex-col w-[250px] text-base-green font-medium gap-y-4 my-auto">
            <div className="flex flex-row items-center justify-between">
              <div>Local Authority:</div>
              <div>{pageData?.["1Xc"]}</div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>OA:</div>
              <div>{pageData?.["1Xd"] || "N/A"}</div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>LSOA:</div>
              <div>{pageData?.["1Xe"]}</div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>ID:</div>
              <div>{pageData?.["1Xf"]}</div>
            </div>
          </div>
        </div>
        <div className="absolute right-[46px] -bottom-[40px]">
          <div className="w-[412px] h-[308px] bg-base-green"></div>
        </div>
        <div className="absolute right-[56px] -bottom-[28px] z-0">
          <div className="w-[412px] h-[308px] relative">
            <img
              src={generateImageUrl(pageData?.["1A"])}
              alt="1A"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="px-[108px] mt-20">
        <div className="text-dark-blue font-medium">
          Score (out of 100, higher=better)<sup>2</sup>
        </div>
        <div className="mt-6">
          <table className="table-fixed w-full text-xs text-dark-blue ">
            <thead>
              <tr className="border-b-4 border-base-green">
                <th className="font-medium w-20">Page</th>
                <th></th>
                <th className="font-medium bg-[#eff1f7] py-2 w-24">
                  {pageData?.["1Xa"]}
                </th>
                <th className="font-medium w-28 "> {pageData?.["1D"]}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-[0.5px] border-dark-blue">
                <td className="text-center">2</td>
                <td className="pl-4">Prices and characteristics</td>
                <td className="font-medium bg-[#eff1f7] py-2 w-24 text-center">
                  {roundOfTo1(pageData?.["1C1"])}
                </td>
                <td className="text-center py-2">
                  {roundOfTo1(pageData?.["1D1"])}
                </td>
              </tr>
              <tr className="border-b-[0.5px] border-dark-blue">
                <td className="text-center">3</td>
                <td className="pl-4">Enviornment</td>
                <td className="font-medium bg-[#eff1f7] py-2 w-24 text-center">
                  {roundOfTo1(pageData?.["1C2"])}
                </td>
                <td className="text-center">{roundOfTo1(pageData?.["1D2"])}</td>
              </tr>
              <tr className="border-b-[0.5px] border-dark-blue">
                <td className="text-center">4</td>
                <td className="pl-4">Social context</td>
                <td className="font-medium bg-[#eff1f7] py-2 w-24 text-center">
                  {roundOfTo1(pageData?.["1C3"])}
                </td>
                <td className="text-center">{roundOfTo1(pageData?.["1D3"])}</td>
              </tr>
              <tr className="border-b-[0.5px] border-dark-blue">
                <td className="text-center">4</td>
                <td className="pl-4">School quality</td>
                <td className="font-medium bg-[#eff1f7] py-2 w-24 text-center">
                  {roundOfTo1(pageData?.["1C4"])}
                </td>
                <td className="text-center">{roundOfTo1(pageData?.["1D4"])}</td>
              </tr>
              <tr className="border-b-[0.5px] border-dark-blue">
                <td className="text-center">5</td>
                <td className="pl-4">Amenities</td>
                <td className="font-medium bg-[#eff1f7] py-2 w-24 text-center">
                  {roundOfTo1(pageData?.["1C5"])}
                </td>
                <td className="text-center">{roundOfTo1(pageData?.["1D5"])}</td>
              </tr>
              <tr className="border-b-[0.5px] border-dark-blue">
                <td className="text-center">6</td>
                <td className="pl-4">Economy</td>
                <td colSpan={2} className="py-2 italic pl-4">
                  No basis for scoring
                </td>
              </tr>
              <tr className="border-b-[0.5px] border-dark-blue">
                <td className="text-center">7</td>
                <td className="pl-4">Transport</td>
                <td className="font-medium bg-[#eff1f7] py-2 w-24 text-center">
                  {roundOfTo1(pageData?.["1C5"])}
                </td>
                <td className="text-center">{roundOfTo1(pageData?.["1D5"])}</td>
              </tr>
              <tr className="border-b-[0.5px] border-dark-blue">
                <td className="text-center">8</td>
                <td className="pl-4">Nature and beauty</td>
                <td className="font-medium bg-[#eff1f7] py-2 w-24 text-center">
                  {roundOfTo1(pageData?.["1C6"])}
                </td>
                <td className="text-center py-2 ">
                  {roundOfTo1(pageData?.["1D6"])}
                </td>
              </tr>
              <tr className="">
                <td className="text-center">9</td>
                <td className="pl-4">Climate change</td>
                <td colSpan={2} className="py-2 italic pl-4">
                  No basis for scoring
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-row mt-16  text-dark-blue text-xs items-center">
          <div className="">
            <div>
              <sup>1</sup> See page 11 for sources and disclaimers
            </div>
            <div className="mt-1">
              <sup>2</sup> Visit unmapt.io/methodology for details on how scores
              are compiled.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page1;
