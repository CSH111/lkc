import React, { useEffect, useState } from "react";
import { TransActionData, TransActionTypeFilterType } from "@/types";
import TransActionListItem from "./TransActionListItem";
import TransactionTypeFilter from "./TransactionTypeFilter";

import styled from "styled-components";
export default function RecentList(props: { transactionData?: TransActionData[] }) {
  console.log("props.transactionData: ", props.transactionData);
  const [transActionData, setTransActionData] = useState(props.transactionData);

  const [filterdTransactionData, setFilterdTransactionData] = useState(props.transactionData);

  return (
    <RecentListSectionContainer>
      <h3>Recent Transactions</h3>
      <div>
        <TransactionTypeFilter
          originalTransactionData={transActionData}
          setFilterdTransactionData={setFilterdTransactionData}
        />
      </div>
      <div>
        <ul className="transaction-list">
          {filterdTransactionData?.map((trData) => {
            return (
              <React.Fragment>
                <TransActionListItem
                  amount={Number(trData.amount)}
                  imgSrc=""
                  time={new Date(trData.timestamp)}
                  transactionName={trData.name}
                  transactionType={trData.type}
                />
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </RecentListSectionContainer>
  );
}

const RecentListSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 25px;
  h3 {
    font-weight: bold;
    font-size: 18px;
  }
  .transaction-list {
    display: flex;
    flex-direction: column;
    gap: 17.5px;
  }
`;
