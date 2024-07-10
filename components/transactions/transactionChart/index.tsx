import { TransActionData } from "@/types";
import { useState } from "react";
import ChartFilter from "./ChartFilter";

function TransactionChart(props: { transactionData: TransActionData[] }) {
  const [FilteredChartData, setFilteredChartData] = useState(props.transactionData);
  console.log("FilteredChartData: ", FilteredChartData);

  return (
    <div>
      <div>
        <ChartFilter
          originalTransactionData={props.transactionData}
          setFilterdTransactionData={setFilteredChartData}
        />
      </div>
      <div>chart</div>
    </div>
  );
}
export default TransactionChart;
