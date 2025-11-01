import { FC } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { ChildData } from "../report.types";

const OccupationChart: FC<ChildData> = ({ data }) => {
  const chartData = [
    {
      occupation: "Managers,direcotrs and senior officials",
      A: data?.["7A1"]?.split(",")[0],
      B: data?.["7A1"]?.split(",")[1],
    },
    {
      occupation: "Professional occupations",
      A: data?.["7A2"]?.split(",")[0],
      B: data?.["7A2"]?.split(",")[1],
    },
    {
      occupation: "Associate professional and technical occupations",
      A: data?.["7A3"]?.split(",")[0],
      B: data?.["7A3"]?.split(",")[1],
    },
    {
      occupation: "Administrative and support occupations",
      A: data?.["7A4"]?.split(",")[0],
      B: data?.["7A4"]?.split(",")[1],
    },
    {
      occupation: "Skilled trades occupations",
      A: data?.["7A5"]?.split(",")[0],
      B: data?.["7A5"]?.split(",")[1],
    },
    {
      occupation: "Caring, leisure and other service occupations",
      A: data?.["7A6"]?.split(",")[0],
      B: data?.["7A6"]?.split(",")[1],
    },
    {
      occupation: "Sales and customer service occupations",
      A: data?.["7A7"]?.split(",")[0],
      B: data?.["7A7"]?.split(",")[1],
    },
    {
      occupation: "Process, plant and machine operatives",
      A: data?.["7A8"]?.split(",")[0],
      B: data?.["7A8"]?.split(",")[1],
    },
    {
      occupation: "Elementary occupations",
      A: data?.["7A9"]?.split(",")[0],
      B: data?.["7A9"]?.split(",")[1],
    },
  ];
  return (
    <div className="flex-grow h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={chartData}
          margin={{
            top: 50,
            bottom: 10,
          }}
        >
          <PolarGrid />
          <PolarAngleAxis
            dataKey="occupation"
            tick={{
              fill: "#0e2245",
              fontSize: "10px",
              fontWeight: 300,
              width: 100,
            }}
            tickSize={15}
          />
          <PolarRadiusAxis
            tick={{ fill: "#0e2245", fontSize: "10px", fontWeight: 500 }}
            angle={90}
            tickFormatter={(value) => value?.toFixed(1)}
          />
          <Radar
            dataKey="A"
            stroke="#0e2245"
            strokeWidth={2}
            fillOpacity={0}
            isAnimationActive={false}
          />
          <Radar
            dataKey="B"
            stroke="#79b042"
            strokeWidth={2}
            fillOpacity={0}
            isAnimationActive={false}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="absolute top-6 left-6">
        <div className="flex flex-row items-center">
          <div className="h-3 w-3 bg-base-green"></div>
          <div className="text-dark-blue text-xs ml-2">{data?.["7B1"]}</div>
        </div>
        <div className="flex flex-row items-center mt-2">
          <div className="h-3 w-3 bg-dark-blue"></div>
          <div className="text-dark-blue text-xs ml-2">{data?.["7B2"]}</div>
        </div>
      </div>
    </div>
  );
};

export default OccupationChart;
