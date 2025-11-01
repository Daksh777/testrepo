"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChildData } from "../report.types";
import { FC } from "react";
import { generateImageUrl } from "../utils";

const TreeCover: FC<ChildData> = ({ data }) => {
  const chartData = [
    {
      name: "This area",
      uv: data?.["9B7"],
      fill: "#79b042",
    },
    {
      name: data?.["9B4"],
      uv: data?.["9B8"],
      fill: "#19476e",
    },
    {
      name: data?.["9B5"],
      uv: data?.["9B9"],
      fill: "#19476e",
    },
    {
      name: data?.["9B6"],
      uv: data?.["9B10"],
      fill: "#19476e",
    },
  ];
  return (
    <div>
      <div className="flex flex-row">
        <div className="bg-dark-blue px-4 py-2 text-white flex-grow font-medium">
          Tree cover<sup>1</sup>
        </div>
        <div className="bg-base-green w-[160px] text-dark-blue py-2 text-center">
          Score: <span className="font-medium">{data?.["9B"]}/100</span>
        </div>
      </div>
      <div className="flex flex-row justify-around items-center py-4 ">
        <div className="w-[304px] h-[164px] relative ">
          <div className="absolute w-full text-center text-dark-blue text-xs font-light -top-3 left-10">
            {data?.["9B1"]}% of the street is tree covered
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                bottom: 10,
                right: 10,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tick={{
                  fill: "grey",
                  fontSize: "10px",
                  fontWeight: 400,
                }}
                tickFormatter={(value) => {
                  const length = 10;
                  if (value.length > length) {
                    return value.slice(0, length) + "...";
                  }
                  return value;
                }}
                includeHidden={true}
                interval={0}
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
              >
                <Label
                  value="% Tree cover"
                  angle={-90}
                  position="insideStart"
                  style={{
                    fontSize: "10px",
                    fontWeight: 400,
                    fill: "grey",
                  }}
                />
              </YAxis>
              <Bar barSize={20} dataKey="uv" isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-[178px] h-[170px] relative">
          <img
            src={generateImageUrl(data?.["9B11"])}
            alt="9B11"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TreeCover;
