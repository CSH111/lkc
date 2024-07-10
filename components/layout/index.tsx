import staticPageData from "@/staticPageData";
import { AppPagePropType } from "@/types";
import { ReactNode } from "react";
import Bottom from "./Bottom";
import Header from "./Header";

export default function Layout(props: { children: ReactNode; pageProps: AppPagePropType }) {
  return (
    <div>
      <Header title={staticPageData[props.pageProps.pageName].title} />
      <div>{props.children}</div>
      <Bottom />
    </div>
  );
}
