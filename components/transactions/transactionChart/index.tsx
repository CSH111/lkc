import { ChartDataType, TransActionChartFilterType, TransActionData } from "@/types";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Chart from "./Chart";
import ChartFilter from "./ChartFilter";

export default function TransactionChart(props: { transactionData: TransActionData[] }) {
  const [filteredChartData, setFilteredChartData] = useState(null);

  const [chartData, setChartData] = useState<ChartDataType>(null);
  const [chartFilterValue, setChartFilterValue] = useState<TransActionChartFilterType>("month");
  const filterValueDayCountObj: { [key in TransActionChartFilterType]: number } = {
    month: 30,
    week: 7,
  };
  const [isChartDataLoading, setIsChartDataLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setIsChartDataLoading(true);
      const res = await axios.get(
        `/api/transaction-sum?dayCount=${filterValueDayCountObj[chartFilterValue]}`
      );
      setIsChartDataLoading(false);
      setChartData(res.data.data);
    })();
  }, [chartFilterValue]);

  return (
    <TransactionChartSectionContainer>
      <ChartFilter
        chartFilterValue={chartFilterValue}
        setChartFilterValue={setChartFilterValue}
        // originalTransactionData={props.transactionData}
        // setFilterdTransactionData={setFilteredChartData}
      />
      <div className="chart-area">
        {chartData && !isChartDataLoading ? <Chart chartData={chartData} /> : null}
      </div>
    </TransactionChartSectionContainer>
  );
}

const TransactionChartSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  .chart-area {
    height: 250px;
  }
  .recharts-cartesian-axis-line,
  .recharts-cartesian-axis-tick-line {
    display: none !important;
  }
`;
