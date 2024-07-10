import React, { useState, MouseEvent, useEffect } from "react";
import styled from "styled-components";
import { TransActionData, TransActionChartFilterType } from "@/types";
import { addDay, addMonth, capitalizeFirstLetter } from "@/utils";

const chartFilterValues: TransActionChartFilterType[] = ["week", "month"];

export default function ChartFilter(props: {
  originalTransactionData: TransActionData[];
  setFilterdTransactionData: React.Dispatch<React.SetStateAction<TransActionData[]>>;
}) {
  const today = new Date("2024-10-31"); // TODO 실데이터반영시 수정필요
  const [chartFilterValue, setChartFilterValue] = useState<TransActionChartFilterType>("month");

  useEffect(() => {
    runFilter("month");
  }, []);

  const runFilter = (type: TransActionChartFilterType) => {
    props.setFilterdTransactionData(() => {
      return props.originalTransactionData.filter((d) => {
        switch (type) {
          case "month": {
            return new Date(d.timestamp).getMonth() === today.getMonth();
          }
          case "week":
          default: {
            return new Date(d.timestamp) >= addDay(today, -6);
          }
        }
      });
    });
  };
  const handleClickFilterButton = (
    e: MouseEvent<HTMLButtonElement>,
    chartFilterValue: TransActionChartFilterType
  ) => {
    setChartFilterValue(chartFilterValue);
    runFilter(chartFilterValue);
  };
  return (
    <ChartFilterStyles.Container>
      <div className="btn-container">
        {chartFilterValues.map((value) => {
          return (
            <ChartFilterStyles.Button
              key={value}
              $isActive={value == chartFilterValue}
              onClick={(e) => handleClickFilterButton(e, value)}
            >
              {capitalizeFirstLetter(value)}
            </ChartFilterStyles.Button>
          );
        })}
      </div>

      <div className="date">
        {(() => {
          switch (chartFilterValue) {
            case "week": {
              return (
                <div>
                  {today.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
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
                    {today.toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  {"-"}
                  <div>
                    {addMonth(today, -1).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
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
