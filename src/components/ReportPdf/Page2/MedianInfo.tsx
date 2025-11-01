/* eslint-disable @typescript-eslint/no-explicit-any */

const MedianInfo = ({ data }: { data: any }) => {
  return (
    <div className="w-[270px] h-[240px] border-2 border-grey relative text-dark-blue pl-10 pr-6 py-4">
      <div className="text-bu text-xs font-medium absolute -left-2 top-16 bg-white">
        As of {data?.["2Ea"]}
      </div>
      <div className="text-xs font-medium">Median house prices are</div>
      <div className="text-4xl font-medium mt-2">
        {data?.["2E"]?.toFixed(1)}%
      </div>
      <div className="text-xs">{data?.["2F"]} the national average</div>
      <div className="text-xs font-medium mt-6">
        Median house prices adjusted for local income are
      </div>{" "}
      <div className="text-4xl font-medium mt-2">
        {data?.["2G"]?.toFixed(1)}%
      </div>
      <div className="text-xs">{data?.["2H"]} the national average</div>
    </div>
  );
};

export default MedianInfo;
