import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Label,
} from "recharts";
import { X } from "lucide-react";
import { ChildData } from "../report.types";

const PublicTransportSecondChart = ({ data }: ChildData) => {
  const cityChartWednesday =
    data?.["8Dc"]?.map((value: any, ind: number) => ({
      hour: ind + 5,
      bus: parseInt(value),
    })) || [];
  const cityChartSunday =
    data?.["8Dd"]?.map((value: any, ind: number) => ({
      hour: ind + 5,
      bus: parseInt(value),
    })) || [];

  const CustomTick = ({ x, y, payload, index }: any) => {
    // Use a different y-offset for odd/even ticks to create a zig-zag pattern
    const yOffset = index % 2 === 0 ? 0 : 10;

    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={yOffset}
          textAnchor="middle"
          fill="grey"
          className="text-[8px]"
          fontWeight={400}
        >
          {`${payload.value}`}
        </text>
      </g>
    );
  };

  return (
    <div className="h-full w-[214px] relative">
      <div className="absolute text-dark-blue font-light text-xs top-2 w-full text-center ml-4">
        {data?.["8Da"]} average
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 40, bottom: 40, right: 10, left: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            type="number"
            dataKey="hour"
            name="hour"
            interval={0}
            tickMargin={12}
            axisLine={false}
            tickLine={false}
            domain={["dataMin", "dataMax"]}
            ticks={cityChartWednesday.map((d: { hour: any }) => d.hour)}
            tick={<CustomTick />}
          >
            <Label
              value="Hour of day"
              offset={-20}
              position="insideBottom"
              style={{
                fontSize: "10px",
                fontWeight: 400,
                fill: "grey",
              }}
            />
          </XAxis>
          <YAxis
            type="number"
            dataKey="bus"
            name="bus"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "grey",
              fontSize: "8px",
              fontWeight: 400,
            }}
          >
            <Label
              value="Number of buses"
              angle={-90}
              position="insideStart"
              style={{
                fontSize: "10px",
                fontWeight: 400,
                fill: "grey",
              }}
            />
          </YAxis>

          <Scatter
            data={cityChartWednesday}
            fill="#0e2245"
            shape={<CustomShape />}
            isAnimationActive={false}
          />
          <Scatter
            data={cityChartSunday}
            fill="#79b042"
            shape={<CustomShape />}
            isAnimationActive={false}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomShape = (props: any) => {
  const { cx, cy, fill } = props;
  return (
    <g transform={`translate(${cx - 4}, ${cy - 4})`}>
      <X strokeWidth={3} size={8} color={fill} />
    </g>
  );
};

export default PublicTransportSecondChart;
