import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { formatAmount, capitalizeFirstLetter, isSameDate } from "@/utils";

const TransActionListItem = (props: {
  imgSrc: string;
  transactionType: string;
  amount: number;
  time: Date;
  transactionName: string;
}) => {
  const now = new Date("2024-10-31T23:59:59Z"); // TODO 실데이터반영시 수정필요

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
        <div className="time">
          {new Date(props.time).toLocaleString(
            "en-US",
            isSameDate([new Date(props.time), now])
              ? {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                }
              : {
                  month: "short",
                  day: "2-digit",
                }
          )}
        </div>
      </div>
    </TransActionListItemContainer>
  );
};

// {now.toLocaleString("en-US", {
//   month: "short",
//   day: "2-digit",
//   year: "numeric",
// })}
export default TransActionListItem;

const TransActionListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  .img-box {
    width: 45px;
    height: 45px;
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
      font-size: 14px;
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
    width: 80px;
    .amount {
      font-weight: bold;
      font-size: 14px;
    }
    .time {
      font-size: 12px;
      color: #909090;
    }
  }
`;
