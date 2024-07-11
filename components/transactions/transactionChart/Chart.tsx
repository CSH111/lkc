import { ChartDataType, TransActionData } from "@/types";
import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  TooltipProps,
} from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import styled from "styled-components";

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <TooltipContainer>
        <p className="income">{`+$${payload?.[0].value.toLocaleString()}`}</p>
        <p className="expense">{`-$${payload?.[1].value.toLocaleString()}`}</p>
        <p className="date">
          {new Date(label).toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
          })}
        </p>
      </TooltipContainer>
    );
  }
};

export default function Chart(props: { chartData: ChartDataType }) {
  const formattedChartData = useMemo(() => {
    return Object.entries(props.chartData).map(([dateString, amountObj]) => {
      return {
        dateString,
        income: +amountObj.income.toFixed(2),
        expense: +Math.abs(amountObj.expense).toFixed(2),
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
        <XAxis
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
            });
          }}
          dataKey={"dateString"}
        />
        <YAxis hide domain={[(min: number) => min * 0.9, (max: number) => max * 1.1]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend layout="horizontal" verticalAlign="top" align="left" />
        <Area
          connectNulls
          type="monotone"
          dataKey="income"
          stroke="#8884d8"
          // fill="#242424"
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

const TooltipContainer = styled.div`
  /* background-color: #4b3062; */
  background-color: #f4f4f4;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
  color: black;
  font-weight: bold;
  .income {
    color: #9007ff;
  }
  .expense {
    color: #21bb4f;
  }
  .label {
    font-weight: normal;
    font-size: 14px;
  }
`;
