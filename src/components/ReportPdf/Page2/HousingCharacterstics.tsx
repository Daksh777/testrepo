import { formatNumber } from "../utils";

const HousingCharacterstics = ({ data }: { data: any }) => {
  return (
    <div className="w-[372px]">
      {" "}
      <div className="flex flex-row">
        <div className="bg-dark-blue pl-4 py-2 text-white flex-grow font-medium">
          Housing characteristics
        </div>
        <div className="bg-base-green w-[130px] text-dark-blue py-2 text-center">
          Score: <span className="font-medium">{data?.["2P"]}/100</span>{" "}
        </div>
      </div>
      <div className="mt-2">
        <table className="table-fixed w-full text-xs text-dark-blue ">
          <thead>
            <tr className="border-b-2 border-dark-blue">
              <th></th>
              <th className="font-medium py-2 w-20">{data?.["2Q"]}</th>
              <th className="font-medium w-20">{data?.["2R"]}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-[0.5px] border-dark-blue">
              <td className="text-left pl-4 py-2">Energy efficiency rating</td>
              <td className="text-center">{formatNumber(data?.["2S"])}</td>
              <td className="text-center">{formatNumber(data?.["2W"])}</td>
            </tr>
            <tr className="border-b-[0.5px] border-dark-blue">
              <td className="text-left pl-4 py-2">
                Floor space (square metres)
              </td>
              <td className="text-center">{formatNumber(data?.["2T"])}</td>
              <td className="text-center">{formatNumber(data?.["2X"])}</td>
            </tr>
            <tr className="border-b-[0.5px] border-dark-blue">
              <td className="text-left pl-4 py-2">Number of rooms</td>
              <td className="text-center">{formatNumber(data?.["2U"])}</td>
              <td className="text-center">{formatNumber(data?.["2Y"])}</td>
            </tr>
            <tr className="">
              <td className="text-left pl-4 py-2">
                Average vintage of housing stock
              </td>
              <td className="text-center">{formatNumber(data?.["2V"])}</td>
              <td className="text-center">{formatNumber(data?.["2Z"])}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HousingCharacterstics;
