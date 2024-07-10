import { GetServerSideProps } from "next";

export type PageName = "transactions" | "other";
type X = {};
export type GetServerSidePropsType<T = {}> = GetServerSideProps<{ pageName: PageName } & T>;

export type AppPagePropType = { pageName: PageName };

export type StaticPageData = { [key in PageName]: { title: string } };
