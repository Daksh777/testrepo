/* eslint-disable @typescript-eslint/no-explicit-any */
import MedianChart from "./MedianChart";
import MedianInfo from "./MedianInfo";

const HousingIncome = ({ reportData }: { reportData: any }) => {
  return (
    <div>
      <div className="text-xl md:text-2xl font-inter font-bold text-primary-blue">
        Housing and Income
      </div>
      <div className="report-text mt-4">
        Understand what homes really cost in the area — not just listings, but
        data-backed insights on how prices compare to income and national
        trends.
      </div>
      <div className="report-text mt-2">
        Get a closer look at the most common housing type — from average size to
        energy efficiency. See how the homes here stack up against others in the
        UK. Download your report.
      </div>
      <div className="flex flex-row mt-4">
        <div className="bg-primary-blue px-4 py-2 text-white flex-grow ">
          Median price, {reportData?.["2B0"]} , {reportData?.["2B1"]}
        </div>
        <div className="bg-base-green w-[160px] text-primary-blue py-2 text-center items-center flex justify-center">
          Score: <span className="font-medium">{reportData?.["2B"]}/100</span>
        </div>
      </div>
      <div className="mt-4 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <MedianChart reportData={reportData} />
        </div>
        <div className="w-full md:w-1/3">
          <MedianInfo reportData={reportData} />
        </div>
      </div>
    </div>
  );
};

export default HousingIncome;
