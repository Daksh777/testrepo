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

const EducationalChart: FC<ChildData> = ({ data }) => {
  const chartData = [
    {
      occupation: "No qualifications",
      A: data?.["7D0"]?.split(",")[0],
      B: data?.["7D0"]?.split(",")[1],
    },
    {
      occupation: "Level 1 (1-4 GCSEs)",
      A: data?.["7D1"]?.split(",")[0],
      B: data?.["7D1"]?.split(",")[1],
    },
    {
      occupation: "Level 2 (5+ GCSEs)",
      A: data?.["7D2"]?.split(",")[0],
      B: data?.["7D2"]?.split(",")[1],
    },
    {
      occupation: "Level 3 (2+ A levels)",
      A: data?.["7D3"]?.split(",")[0],
      B: data?.["7D3"]?.split(",")[1],
    },
    {
      occupation: "Level 4 (Tertiary degree)",
      A: data?.["7D4"]?.split(",")[0],
      B: data?.["7D4"]?.split(",")[1],
    },
    {
      occupation: "Other Apprenticeships etc.",
      A: data?.["7D5"]?.split(",")[0],
      B: data?.["7D5"]?.split(",")[1],
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
            top: 30,
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
            tickSize={20}
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
    </div>
  );
};

export default EducationalChart;
