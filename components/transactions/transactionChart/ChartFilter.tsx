import React, { useState, MouseEvent, useEffect, useMemo } from "react";
import styled from "styled-components";
import { TransActionData, TransActionChartFilterType } from "@/types";
import { addDay, addMonth, capitalizeFirstLetter } from "@/utils";

const chartFilterValues: TransActionChartFilterType[] = ["week", "month"];

export default function ChartFilter(props: {
  chartFilterValue: TransActionChartFilterType;
  setChartFilterValue: React.Dispatch<React.SetStateAction<TransActionChartFilterType>>;
  // originalTransactionData: TransActionData[];
  // setFilterdTransactionData: React.Dispatch<React.SetStateAction<TransActionData[]>>;
}) {
  const now = new Date("2024-10-31T23:59:59Z"); // TODO 실데이터반영시 수정필요

  // useEffect(() => {
  //   runFilter("month");
  // }, []);

  // const runFilter = (type: TransActionChartFilterType) => {
  //   props.setFilterdTransactionData(() => {
  //     return props.originalTransactionData.filter((d) => {
  //       switch (type) {
  //         case "month": {
  //           return new Date(d.timestamp).getMonth() === now.getMonth();
  //         }
  //         case "week":
  //         default: {
  //           return new Date(d.timestamp) >= addDay(now, -6);
  //         }
  //       }
  //     });
  //   });
  // };
  const handleClickFilterButton = (
    e: MouseEvent<HTMLButtonElement>,
    chartFilterValue: TransActionChartFilterType
  ) => {
    props.setChartFilterValue(chartFilterValue);
  };
  return (
    <ChartFilterStyles.Container>
      <div className="btn-container">
        {chartFilterValues.map((value) => {
          return (
            <ChartFilterStyles.Button
              key={value}
              $isActive={value == props.chartFilterValue}
              onClick={(e) => handleClickFilterButton(e, value)}
            >
              {capitalizeFirstLetter(value)}
            </ChartFilterStyles.Button>
          );
        })}
      </div>

      <div className="date">
        {(() => {
          switch (props.chartFilterValue) {
            case "week": {
              return (
                <div>
                  {now.toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",

                    year: "numeric",
                  })}
                </div>
              );
            }
            case "month":
            default: {
              return (
                <div className="month-dates">
                  <div>
                    {addMonth(now, -1).toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                    })}
                  </div>
                  {"-"}
                  <div>
                    {now.toLocaleString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </div>
                </div>
              );
            }
          }
        })()}
      </div>
    </ChartFilterStyles.Container>
  );
}

const ChartFilterStyles = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-container {
    }
    .date {
      font-size: 14px;
      font-weight: bold;
      color: #7b7b7b;
      .month-dates {
        display: flex;
        gap: 5px;
      }
    }
  `,
  Button: styled.button<{ $isActive: boolean }>`
    border: none;
    padding: 5px 15px;
    border-radius: 999px;
    font-weight: bold;
    font-size: 14px;
    color: ${(p) => (p.$isActive ? "#ffffff" : "#7c7c7c")};
    background-color: ${(p) => (p.$isActive ? "#363062" : "#f5f5f5")};
  `,
};
