import { GetServerSideProps } from "next";

export type PageName = "transactions" | "other";
type X = {};
export type GetServerSidePropsType<T = {}> = GetServerSideProps<{ pageName: PageName } & T>;

export type AppPagePropType = { pageName: PageName };

export type StaticPageData = { [key in PageName]: { title: string } };

export type TransActionTypeFilterType = "all" | "expense" | "income";
export type TransActionChartFilterType = "month" | "week";

export type TransActionData = {
  amount: string;
  name: string;
  timestamp: string;
  type: string;
};

export type ChartDataType = {
  [key in string]: { income: number; expense: number };
};
