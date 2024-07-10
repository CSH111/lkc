import styled from "styled-components";
import { GetServerSideProps } from "next";
// import { RecentList } from "@/components";
import { RecentList } from "../components";
import { GetServerSidePropsType } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import { TransActionData } from "@/types";
export const getServerSideProps: GetServerSidePropsType<{ data: string }> = async () => {
  return { props: { pageName: "transactions", data: "any.." } };
};

export default function Home() {
  const [transactionData, setTransactionData] = useState<TransActionData[]>();

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/mock-transactions");
      setTransactionData(res.data.data);
      console.log("res.data.data: ", res.data.data);
    })();
  }, []);

  return <div> {transactionData ? <RecentList transactionData={transactionData} /> : null} </div>;
}
