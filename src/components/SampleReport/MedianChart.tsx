/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const MedianChart: React.FC<{ reportData: any }> = ({ reportData }) => {
  const chartData = reportData?.["2Dc"]?.map((item: any, index: number) => ({
    date: item,
    A: reportData?.["2D"]?.[index],
    B: reportData?.["2C"]?.[index],
  }));
  return (
    <div className="h-[240px] pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            right: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tick={{
              fill: "grey",
              fontSize: "10px",
              fontWeight: 400,
            }}
            includeHidden={true}
            angle={-45}
            tickMargin={12}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "grey",
              fontSize: "12px",
              fontWeight: 400,
            }}
            tickFormatter={(value) => value.toLocaleString()}
          />

          <Line
            type="monotone"
            dataKey="A"
            stroke="#79b042"
            dot={{ r: 2 }}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="B"
            stroke="#0e2245"
            dot={{ r: 2 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex flex-row justify-center gap-x-8">
        <div className="flex flex-row items-center gap-x-2">
          <div className="h-3 w-3 bg-base-green"></div>
          <div className="text-primary-blue text-xs">
            {reportData?.["2Da"] || "Oxfordshire"}
          </div>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <div className="h-3 w-3 bg-primary-blue"></div>
          <div className="text-primary-blue text-xs">
            {reportData?.["2Db"] || "Oxfordshire"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedianChart;
