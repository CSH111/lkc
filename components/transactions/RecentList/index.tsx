import React, { useEffect, useState } from "react";
import { TransActionData, TransActionTypeFilterType } from "@/types";
import TransActionListItem from "./TransActionListItem";
import TransactionTypeFilter from "./TransactionTypeFilter";

import styled from "styled-components";
import axios from "axios";
import { LoadingIcon } from "@/components/common";
export default function RecentList() {
  const [filterdTransactionData, setFilterdTransactionData] = useState(null);
  const [transactionListData, setTransactionListData] = useState<TransActionData[]>();
  const [isListLoading, setIsListLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/transactions");
      setTransactionListData(res.data.data);
      setIsListLoading(false);
    })();
  }, []);

  return (
    <RecentListSectionContainer>
      <h3>Recent Transactions</h3>
      {isListLoading ? (
        <div className="loading-container">
          <LoadingIcon className="list-loading" />
        </div>
      ) : (
        <>
          <div>
            <TransactionTypeFilter
              originalTransactionData={transactionListData}
              setFilterdTransactionData={setFilterdTransactionData}
            />
          </div>
          <div>
            <ul className="transaction-list">
              {filterdTransactionData?.map((trData) => {
                return (
                  <React.Fragment key={`${trData.name}-${trData.timestamp}-${trData.amount}`}>
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
        </>
      )}
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
  .loading-container {
    height: 300px;
    position: relative;
    .list-loading {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .transaction-list {
    display: flex;
    flex-direction: column;
    gap: 17.5px;
  }
`;
