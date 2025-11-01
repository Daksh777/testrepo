import React, { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const MedianChart: React.FC<{ data: any }> = ({ data }) => {
  const chartData = data?.["2Dc"]?.map((item: any, index: number) => ({
    date: item,
    A: data?.["2D"]?.[index],
    B: data?.["2C"]?.[index],
  }));

  // Calculate dynamic Y-axis width based on maximum value
  const yAxisWidth = useMemo(() => {
    if (!chartData) return 50; // default width
    let maxValue = 0;
    chartData.forEach((item: any) => {
      maxValue = Math.max(maxValue, item.A);
      maxValue = Math.max(maxValue, item.B);
    });

    // Format the max value to see how wide it would be
    const formattedMaxValue = maxValue.toLocaleString();

    // Calculate approximate width: each character is roughly 7-8px, plus some padding
    const baseWidth = 0; // minimum width
    const charWidth = 8; // approximate character width
    const calculatedWidth = baseWidth + formattedMaxValue.length * charWidth;

    // Cap the maximum width to prevent it from being too wide
    return Math.min(calculatedWidth, 100);
  }, [chartData]);

  return (
    <div className="w-[336px] h-[240px] pt-4 ">
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
            width={yAxisWidth}
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
            dot={{ r: 0 }}
            strokeWidth={2}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="B"
            stroke="#0e2245"
            dot={{ r: 0 }}
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex flex-row justify-center gap-x-8">
        <div className="flex flex-row items-center gap-x-2">
          <div className="h-3 w-3 bg-base-green"></div>
          <div className="text-dark-blue text-xs">{data?.["2Da"]}</div>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <div className="h-3 w-3 bg-dark-blue"></div>
          <div className="text-dark-blue text-xs">{data?.["2Db"]}</div>
        </div>
      </div>
    </div>
  );
};

export default MedianChart;
