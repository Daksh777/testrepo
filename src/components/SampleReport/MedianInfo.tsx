/* eslint-disable @typescript-eslint/no-explicit-any */
const MedianInfo = ({ reportData }: { reportData: any }) => {
  return (
    <div className="h-[240px] border-2 border-gray-300 relative text-primary-blue pl-10 pr-6 py-4">
      <div className="text-bu text-xs font-medium absolute -left-2 bg-base-secondary top-16 px-2">
        As of {reportData?.["2Ea"]}
      </div>
      <div className="text-xs font-medium">Median house prices are</div>
      <div className="text-4xl font-medium mt-2">
        {reportData?.["2E"]?.toFixed(1) || "100"}%
      </div>
      <div className="text-xs">{reportData?.["2F"]} the national average</div>
      <div className="text-xs font-medium mt-6">
        Median house prices adjusted for local income are
      </div>{" "}
      <div className="text-4xl font-medium mt-2">
        {reportData?.["2G"]?.toFixed(1) || "100"}%
      </div>
      <div className="text-xs">{reportData?.["2H"]} the national average</div>
    </div>
  );
};

export default MedianInfo;
