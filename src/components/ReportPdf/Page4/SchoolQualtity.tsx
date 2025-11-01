import { FC } from "react";
import { ChildData } from "../report.types";

const SchoolQualtity: FC<ChildData> = ({ data }) => {
  return (
    <div className="w-full">
      {" "}
      <div className="flex flex-row">
        <div className="bg-dark-blue px-4 py-2 text-white flex-grow font-medium">
          School quality <sup>2</sup>
        </div>
        <div className="bg-base-green w-[160px] text-dark-blue py-2 text-center">
          Score: <span className="font-medium">{data?.["4D"]}/100</span>
        </div>
      </div>
      <div className="mt-2">
        <table className="table-fixed w-full text-[12px] text-dark-blue ">
          <thead>
            <tr className="border-b-2 border-dark-blue">
              <th className="font-normal py-2 text-left pl-4">Primary</th>
              <th className="font-normal py-2 w-20">Dist (miles)</th>
              <th className="font-normal py-2 w-24">Ofsted</th>

              <th className="font-normal py-2 w-24 truncate">Valid as of...</th>
              <th className="font-normal w-24 truncate">
                published on<sup>3</sup>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.["4Da"]?.map((item: any, index: number) => (
              <tr key={item} className="border-b-[0.5px] border-dark-blue">
                <td className="text-left pl-4 py-2 truncate">{item}</td>
                <td className="text-center ">
                  {parseFloat(data?.["4Db"]?.[index] || "0").toFixed(1)}
                </td>
                <td className="text-left bg-[#e7e9ed] pl-1">
                  {data?.["4Dc"]?.[index]}
                </td>
                <td className="text-center">{data?.["4Dd"]?.[index]}</td>
                <td className="text-center bg-[#e7e9ed] pl-1">
                  {data?.["4De"]?.[index]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <table className="table-fixed w-full text-[12px] text-dark-blue ">
          <thead>
            <tr className="border-b-2 border-dark-blue">
              <th className="font-normal py-2 text-left pl-4">Secondary</th>
              <th className="font-normal py-2 w-20">Dist (miles)</th>
              <th className="font-normal py-2 w-24">Ofsted</th>

              <th className="font-normal py-2 w-24 truncate">Valid as of...</th>
              <th className="font-normal w-24 truncate">
                published on<sup>4</sup>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.["4Df"]?.map((item: any, index: number) => (
              <tr key={item} className="border-b-[0.5px] border-dark-blue">
                <td className="text-left pl-4 py-2 truncate">{item}</td>
                <td className="text-center ">
                  {" "}
                  {parseFloat(data?.["4Dg"]?.[index] || "0").toFixed(1)}
                </td>
                <td className="text-left bg-[#e7e9ed] pl-1">
                  {data?.["4Dh"]?.[index]}
                </td>
                <td className="text-center">{data?.["4Di"]?.[index]}</td>
                <td className="text-center bg-[#e7e9ed] pl-1">
                  {data?.["4Dj"]?.[index]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchoolQualtity;
