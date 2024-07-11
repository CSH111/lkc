import styled from "styled-components";
import { GetServerSideProps } from "next";
// import { RecentList } from "@/components";
import { RecentList } from "../components";
import { GetServerSidePropsType } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { TransActionData } from "@/types";
import TransactionChart from "@/components/transactions/transactionChart";
export const getServerSideProps: GetServerSidePropsType<{ data: string }> = async () => {
  return { props: { pageName: "transactions", data: "any.." } };
};

export default function Home() {
  // const [transactionData, setTransactionData] = useState<TransActionData[]>();
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
    <div>
      {" "}
      <TransactionChart />
      <RecentList />
    </div>
  );
}
