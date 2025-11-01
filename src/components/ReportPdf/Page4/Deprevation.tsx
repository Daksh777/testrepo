import { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChildData } from "../report.types";
const Deprevation: FC<ChildData> = ({ data }) => {
  const chartData = [
    {
      name: "This area",
      uv: data?.["4Ba-i"],
      pv: data?.["4Ba-ii"],
    },
    {
      name: data?.["4Bb"],
      uv: data?.["4Bb-i"],
      pv: data?.["4Bb-ii"],
    },
    {
      name: data?.["4Bc"],
      uv: data?.["4Bc-i"],
      pv: data?.["4Bc-ii"],
    },
  ];

  const CustomLegend = () => {
    return (
      <div className="flex flex-row text-xs text-dark-blue items-center gap-x-1 justify-end mb-1">
        <div className="h-2 w-2 bg-[#19476e]"></div>
        <div>2011</div>
        <div className="h-2 w-2 bg-[#79b042]"></div>
        <div>2021</div>
      </div>
    );
  };
  return (
    <div className="w-[328px] h-full flex flex-col">
      {" "}
      <div className="flex flex-row">
        <div className="bg-dark-blue px-4 py-2 text-white flex-grow font-medium">
          Deprivation<sup>1</sup>
        </div>
        <div className="bg-base-green w-[140px] text-dark-blue py-2 text-center">
          Score: <span className="font-medium">{data?.["4B"]}/100</span>
        </div>
      </div>
      <div className="flex-grow w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              bottom: 10,
              right: 10,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tick={{
                fill: "grey",
                fontSize: "12px",
                fontWeight: 400,
              }}
              includeHidden={true}
              tickMargin={12}
              interval={0}
              tickFormatter={(value) => {
                const length = 9; // Set the maximum length for the label
                return value.length > length
                  ? value.slice(0, length) + "..."
                  : value;
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "grey",
                fontSize: "12px",
                fontWeight: 400,
              }}
            />
            <Bar
              barSize={20}
              dataKey="uv"
              fill="#19476e"
              isAnimationActive={false}
            />
            <Bar
              barSize={20}
              dataKey="pv"
              fill="#79b042"
              isAnimationActive={false}
            />
            <Legend
              content={<CustomLegend />}
              align="right"
              verticalAlign="top"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-dark-blue font-light italic text-xs text-center">
        Higher numbers = higher deprivation
      </div>
    </div>
  );
};

export default Deprevation;
