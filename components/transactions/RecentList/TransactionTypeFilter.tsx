import { TransActionData, TransActionTypeFilterType } from "@/types";
import { capitalizeFirstLetter } from "@/utils";
import { MouseEvent, useState } from "react";
import styled from "styled-components";

const transActionTypeFilterValues: TransActionTypeFilterType[] = ["all", "expense", "income"];

export default function TransactionTypeFilter(props: {
  originalTransactionData: TransActionData[];
  setFilterdTransactionData: React.Dispatch<React.SetStateAction<TransActionData[]>>;
}) {
  const [transactionTypeFilterValue, setTransactionTypeFilterValue] =
    useState<TransActionTypeFilterType>("all");

  const handleClickFilterButton = (
    e: MouseEvent<HTMLButtonElement>,
    transactionTypeFilterValue: TransActionTypeFilterType
  ) => {
    setTransactionTypeFilterValue(transactionTypeFilterValue);
    console.log("filter run");
    props.setFilterdTransactionData(() => {
      return props.originalTransactionData.filter((d) => {
        switch (transactionTypeFilterValue) {
          case "expense": {
            return Number(d.amount) < 0;
          }
          case "income": {
            return Number(d.amount) >= 0;
          }
          default: {
            return 1;
          }
        }
      });
    });
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
