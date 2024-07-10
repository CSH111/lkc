import styled from "styled-components";
import { GetServerSideProps } from "next";
import { RecentList } from "@/components";
import { GetServerSidePropsType } from "@/types";
const Title = styled.h1`
  /* font-size: 50px;
  color: ${({ theme }) => theme.colors.primary}; */
`;

export const getServerSideProps: GetServerSidePropsType<{ data: string }> = async () => {
  return { props: { pageName: "transactions", data: "any.." } };
};

export default function Home() {
  return (
    <div>
      <RecentList />
    </div>
  );
}
