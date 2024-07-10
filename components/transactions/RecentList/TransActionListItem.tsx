import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { formatAmount, capitalizeFirstLetter } from "@/utils";

const TransActionListItem = (props: {
  imgSrc: string;
  transactionType: string;
  amount: number;
  time: Date;
  transactionName: string;
}) => {
  return (
    <TransActionListItemContainer>
      <div className="img-box">
        {props.imgSrc ? (
          <Image src={props.imgSrc} alt="transaction-img" height={30} width={30} />
        ) : (
          <div className="no-img" />
        )}
      </div>
      <div className="name-and-type">
        <div className="name">{props.transactionName}</div>
        <div className="type">{capitalizeFirstLetter(props.transactionType)}</div>
      </div>
      <div className="amount-and-time">
        <div className="amount">{formatAmount(props.amount)}</div>
        <div className="time">{new Date(props.time).toLocaleTimeString()}</div>
      </div>
    </TransActionListItemContainer>
  );
};

export default TransActionListItem;

const TransActionListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  .img-box {
    .no-img {
      width: 45px;
      height: 45px;
      border-radius: 5px;
      background-color: #e2e2e2;
    }
    img {
    }
  }
  .name-and-type {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;

    .name {
      font-weight: bold;
    }
    .type {
      font-size: 14px;

      color: #909090;
    }
  }
  .amount-and-time {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    align-items: flex-end;
    .amount {
      font-weight: bold;
    }
    .time {
      font-size: 14px;
      color: #909090;
    }
  }
`;
