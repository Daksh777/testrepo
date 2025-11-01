/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const MedianInsights = ({ data }: { data: any }) => {
  const chartData = [
    {
      name: data?.["2J"],
      value: data?.["2L"],
    },
    {
      name: data?.["2K"],
      value: data?.["2M"],
    },
  ];
  const minValue = Math.min(chartData[0].value, chartData[1].value);
  const maxValue = Math.max(chartData[0].value, chartData[1].value);
  return (
    <div className="w-[306px]">
      {" "}
      <div className="flex flex-row">
        <div className="bg-dark-blue pl-4 py-2 text-white flex-grow font-medium">
          Model insight<sup>2</sup>
        </div>
        <div className="bg-base-green w-[140px] text-dark-blue py-2 text-center">
          Score: <span className="font-medium">{data?.["2I"]}/100</span>
        </div>
      </div>
      <div className="w-[306px] h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            barCategoryGap={1}
            margin={{
              top: 10,
              right: 40,
              left: 20,
            }}
          >
            <ReferenceLine x={0} stroke="#000" />
            <XAxis
              type="number"
              style={{
                fontSize: "12px",
                fontWeight: 600,
                fill: "#79b042",
              }}
              tickLine={false}
              tickFormatter={(value) => `${value?.toFixed(1)}%`}
              stroke="#79b042"
              domain={[Math.min(minValue, -1), Math.max(maxValue, 1)]}
            />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                fill: "#156082",
              }}
              tickFormatter={(value) => {
                const length = 8; // Set the maximum length for the label
                return value.length > length
                  ? value.slice(0, length) + "..."
                  : value;
              }}
            />
            <ReferenceLine x={0} stroke="#79b042" />
            <Bar
              dataKey="value"
              fill="#156082"
              barSize={20}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-row text-[10px]">
          <div className="ml-[70px]">under valued</div>
          <div className="ml-[90px]">over valued</div>
        </div>
      </div>
    </div>
  );
};

export default MedianInsights;
