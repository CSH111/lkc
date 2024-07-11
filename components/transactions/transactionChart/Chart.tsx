import { ChartDataType, TransActionData } from "@/types";
import React, { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{label}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};

// const data2 = [
//   {
//     name2: 1.5,
//     uv: 4000,
//   },
//   {
//     name2: 2.5,
//     uv: 3000,
//   },
//   {
//     name2: 3.5,
//     uv: 2000,
//   },
//   {
//     name2: 4.5,
//     uv: 2780,
//   },
//   {
//     name2: 5.5,
//     uv: 1890,
//   },
//   {
//     name2: 6.5,
//     uv: 2390,
//   },
//   {
//     name2: 7.6,
//     uv: 3490,
//   },
// ];
export default function Chart(props: { chartData: ChartDataType }) {
  const formattedChartData = useMemo(() => {
    return Object.entries(props.chartData).map(([dateString, amountObj]) => {
      return {
        dateString,
        income: amountObj.income.toFixed(2),
        expense: Math.abs(amountObj.expense).toFixed(2),
      };
    });
  }, [props.chartData]);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={formattedChartData}
        margin={{
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          // type="number"
          tick={{ fontSize: 12 }}
          interval={"preserveStartEnd"}
          ticks={[
            formattedChartData[0].dateString,
            formattedChartData[formattedChartData.length - 1].dateString,
          ]}
          tickFormatter={(value) => {
            return new Date(value).toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              // year: "numeric",
            });

            return value;
          }}
          // display="none"
          dataKey={"dateString"}
          // tickFormatter={(v: number) => new Date(v * 1000).toISOString()}
          // domain={[(min: number) => min, (max: number) => max]}
        />
        <YAxis hide domain={[(min: number) => min * 0.9, (max: number) => max * 1.1]} />
        <Tooltip
        // labelFormatter={(label: any, payload: any) => {
        //   // console.log("payload: ", payload);
        //   // console.log("label: ", label);
        //   return `label: ${new Date(label * 1000).toISOString()}`;
        // }}
        />
        <Area
          connectNulls
          // data={data1}
          type="monotone"
          dataKey="income"
          stroke="#8884d8"
          // fill="#8884d8"
          fill="url(#colorUv)"
          // animationBegin={}
          animationDuration={1000}
          animationBegin={1000}
          animationEasing="linear"
        />
        <Area
          connectNulls
          // data={data2}
          type="monotone"
          dataKey="expense"
          stroke="#82ca9d"
          // fill="#82ca9d"
          fill="url(#colorPv)"
          // animationBegin={}
          animationDuration={1000}
          animationEasing="linear"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
