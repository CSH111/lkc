import { TransActionData, TransActionTypeFilterType } from "@/types";
import { capitalizeFirstLetter } from "@/utils";
import { MouseEvent, useEffect, useState } from "react";
import styled from "styled-components";

const transActionTypeFilterValues: TransActionTypeFilterType[] = ["all", "expense", "income"];

export default function TransactionTypeFilter(props: {
  originalTransactionData: TransActionData[];
  setFilterdTransactionData: React.Dispatch<React.SetStateAction<TransActionData[]>>;
}) {
  const [transactionTypeFilterValue, setTransactionTypeFilterValue] =
    useState<TransActionTypeFilterType>("all");

  useEffect(() => {
    runFilter(transactionTypeFilterValue);
  }, []);

  const runFilter = (type: TransActionTypeFilterType) => {
    props.setFilterdTransactionData(() => {
      const filtered = props.originalTransactionData.filter((d) => {
        switch (type) {
          case "expense": {
            return Number(d.amount) < 0;
          }
          case "income": {
            return Number(d.amount) >= 0;
          }
          case "all":
          default: {
            return 1;
          }
        }
      });
      const sliced = filtered.slice(0, type == "all" ? 20 : 10);

      return sliced;
    });
  };
  const handleClickFilterButton = (
    e: MouseEvent<HTMLButtonElement>,
    transactionTypeFilterValue: TransActionTypeFilterType
  ) => {
    setTransactionTypeFilterValue(transactionTypeFilterValue);
    runFilter(transactionTypeFilterValue);
  };
  return (
    <TransactionTypeFilterStyles.Container>
      {transActionTypeFilterValues.map((filterValue) => {
        return (
          <TransactionTypeFilterStyles.Button
            key={filterValue}
            $isAvtive={filterValue == transactionTypeFilterValue}
            onClick={(e) => handleClickFilterButton(e, filterValue)}
          >
            {capitalizeFirstLetter(filterValue)}
          </TransactionTypeFilterStyles.Button>
        );
      })}
    </TransactionTypeFilterStyles.Container>
  );
}

const TransactionTypeFilterStyles = {
  Container: styled.div`
    display: flex;
    gap: 20px;
  `,
  Button: styled.button<{ $isAvtive: boolean }>`
    border: none;
    background-color: transparent;
    font-weight: bold;
    font-size: 16px;

    color: ${(p) => (p.$isAvtive ? "#000000" : "#bdbdbd")};
  `,
};
