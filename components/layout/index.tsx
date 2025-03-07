import staticPageData from "@/staticPageData";
import { AppPagePropType } from "@/types";
import { ReactNode } from "react";
import styled from "styled-components";
import Bottom from "./Bottom";
import Header from "./Header";

export default function Layout(props: { children: ReactNode; pageProps: AppPagePropType }) {
  return (
    <LayoutConatiner>
      <Header title={staticPageData[props.pageProps.pageName]?.title} />
      <div className="content-container">{props.children}</div>
      <Bottom />
    </LayoutConatiner>
  );
}

const LayoutConatiner = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
  .content-container {
    &::-webkit-scrollbar {
      width: 0 !important;
    }
    overflow: -moz-scrollbars-none;
    overflow-y: auto;
    -ms-overflow-style: none;
    height: calc((100vh - 90px));
  }
`;
