import { FC } from "react";
import { ChildData } from "../report.types";

const ListedGarden: FC<ChildData> = ({ data }) => {
  const gardens = Array.isArray(data?.["9E1"]) ? data?.["9E1"] : [];
  const areas = Array.isArray(data?.["9E2"]) ? data?.["9E2"] : [];
  const distances = Array.isArray(data?.["9E3"]) ? data?.["9E3"] : [];
  return (
    <div className="mt-4">
      {" "}
      <div className="flex flex-row">
        <div className="bg-dark-blue px-4 py-2 text-white flex-grow font-medium">
          Listed gardens
        </div>
        <div className="bg-base-green w-[160px] text-dark-blue py-2 text-center">
          Score: <span className="font-medium">{data?.["9E"]}/100</span>
        </div>
      </div>
      <div className="flex flex-row py-2 items-center justify-around">
        <div>
          <svg
            width={83}
            height={93}
            viewBox="0 0 83 93"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42.662 40.05C27.211 45.182 14.48 53.979 5.368 67.793c-1.413-3.578-2.353-7.149-2.638-10.869C1.723 43.76 7.66 33.952 17.724 26.202c6.381-4.917 13.581-8.318 21.227-10.689 5.732-1.778 11.59-3.157 17.397-4.683 8.954-2.355 17.662-5.35 25.863-9.703.177-.095.377-.145.722-.275-.17 2.274-.264 4.426-.5 6.562-1.238 11.098-3.902 21.842-8.211 32.155-3.607 8.631-7.995 16.823-14.106 23.974-5.978 6.997-13.274 11.994-22.381 13.981-8.881 1.938-17.52.843-25.94-2.404-.788-.304-1.564-.641-2.59-1.062-1.385 2.903-2.918 5.737-4.104 8.707-1.108 2.78-1.877 5.697-2.729 8.573-.239.802-.5 1.492-1.45 1.28-.92-.203-.99-.903-.806-1.755C1.657 83.716 4.686 77.2 8.54 71.048c5.675-9.061 12.936-16.676 21.575-22.93 3.747-2.714 7.773-5.04 11.674-7.542.286-.182.582-.352.872-.526"
              fill="#7CAC2B"
            />
          </svg>
        </div>
        <div className="w-[474px]">
          <table className="table-fixed w-full text-xs text-dark-blue ">
            <thead>
              <tr className="border-b-2 border-dark-blue">
                <th className="font-medium py-1 text-left pl-4">Garden</th>
                <th className="font-medium py-1 w-24">Area(ha)</th>
                <th className="font-medium w-24 ">Distance(miles)</th>
              </tr>
            </thead>
            <tbody>
              {gardens?.map((garden: any, index: number) => (
                <tr className="border-b-[0.5px] border-dark-blue">
                  <td className="text-left pl-4 py-1">{garden}</td>
                  <td className="text-center">
                    {parseFloat(areas[index])?.toFixed(1)}
                  </td>
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

export default ListedGarden;
