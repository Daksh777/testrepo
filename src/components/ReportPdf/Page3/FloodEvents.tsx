import { FC } from "react";
import { ChildData } from "../report.types";

const FloodEvents: FC<ChildData> = ({ data }) => {
  return (
    <div className="w-full">
      {" "}
      <div className="flex flex-row">
        <div className="bg-dark-blue px-4 py-2 text-white flex-grow font-medium">
          Flood events <sup>1</sup>
        </div>
        <div className="bg-base-green w-[160px] text-dark-blue py-2 text-center">
          Score: <span className="font-medium">{data?.["3B"] || "0"}/100</span>
        </div>
      </div>
      <div className="w-full">
        <table className="table-fixed w-full text-xs text-dark-blue mt-2">
          <thead>
            <tr className="border-b-2 border-dark-blue">
              <th className="font-medium py-2 text-center">Date</th>
              <th className="font-medium text-center">Source</th>
              <th className="font-medium text-center">% of Neighbourhood</th>
            </tr>
          </thead>
          <tbody>
            {data?.["3Ba"]?.map((item: any, index: number) => (
              <tr key={item} className="border-b-[0.5px] border-dark-blue">
                <td className="text-center py-2">{item}</td>
                <td className="text-center">{data?.["3Bb"]?.[index]}</td>
                <td className="text-center">
                  {parseFloat(data?.["3Bc"]?.[index] || "0")?.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!data?.["3Ba"] || data?.["3Ba"]?.length === 0) && (
          <div className="text-center text-dark-blue text-xs mt-2">
            No flood events recorded since 2000
          </div>
        )}
      </div>
    </div>
  );
};

export default FloodEvents;
