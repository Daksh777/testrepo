import { FC } from "react";
import { ChildData } from "../report.types";

const ListedBuilding: FC<ChildData> = ({ data }) => {
  const buildings = Array.isArray(data?.["9F1"]) ? data?.["9F1"] : [];
  const grades = Array.isArray(data?.["9F2"]) ? data?.["9F2"] : [];
  const distances = Array.isArray(data?.["9F3"]) ? data?.["9F3"] : [];
  return (
    <div className="mt-4">
      {" "}
      <div className="flex flex-row">
        <div className="bg-dark-blue px-4 py-2 text-white flex-grow font-medium">
          Listed buildings <sup>2</sup>
        </div>
        <div className="bg-base-green w-[160px] text-dark-blue py-2 text-center">
          Score: <span className="font-medium">{data?.["9F"]}/100</span>
        </div>
      </div>
      <div className="flex flex-row py-2 items-center justify-around">
        <div>
          <svg
            width={95}
            height={100}
            viewBox="0 0 95 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m48.094.329 23.014 12.146 20.106 10.604c.257.136.51.287.95.535H2.531c.737-.392 1.26-.675 1.785-.952Q25.04 11.742 45.762.818c.294-.155.582-.325.873-.49zm45.94 96.62c-.67 1.61-1.832 2.145-3.484 2.142-28.924-.034-57.85-.023-86.775-.025-1.977 0-3.21-1.267-3.062-3.165.026-.344.13-.692.253-1.015.89-2.348 2.19-4.43 3.739-6.345.588-.727 1.332-1.045 2.248-1.045q40.425.014 80.85 0c.995 0 1.735.429 2.363 1.208 1.63 2.017 2.856 4.289 3.868 6.702zm0-67.113c-1.098 3.629-2.913 6.81-5.287 9.665-.861 1.036-1.824 1.538-3.162 1.536q-38.235-.04-76.47-.002c-1.3.002-2.254-.467-3.088-1.489C3.682 36.674 1.73 33.574.78 29.862c-.022-.09-.024-.186-.05-.412h93.305zM28.159 81.664H11.683V46.887h16.476zm54.869.003h-16.47V46.889h16.47zm-27.527-.002h-16.29V46.888H55.5z"
              fill="#7CAC2B"
            />
          </svg>
        </div>
        <div className="w-[474px]">
          <table className="table-fixed w-full text-xs text-dark-blue ">
            <thead>
              <tr className="border-b-2 border-dark-blue">
                <th className="font-medium py-1 text-left pl-4">Buildings</th>
                <th className="font-medium py-1 w-24">Grade</th>
                <th className="font-medium w-24">Distance(miles)</th>
              </tr>
            </thead>
            <tbody>
              {buildings?.map((building: any, index: number) => (
                <tr className="border-b-[0.5px] border-dark-blue">
                  <td className="text-left pl-4 py-1 truncate">{building}</td>
                  <td className="text-center">{grades[index]}</td>
                  <td className="text-center">
                    {parseFloat(distances[index])?.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListedBuilding;
