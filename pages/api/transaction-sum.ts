import { TransActionData } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import jsonData from "../../mockdata.json";

function toLocale(date: Date) {
  const localeStr = date.toLocaleDateString("kr-KR");
  const dateString2 = localeStr
    .slice(0, localeStr.length - 1)
    .split(". ")
    .map((str, idx) => {
      return idx === 0 ? str : str.padStart(2, "0");
    })
    .join("-");
  return dateString2;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const allTransActionData: TransActionData[] = jsonData as any;
  const apiResultData = {};
  for (let index = allTransActionData.length - 1; index >= 0; index--) {
    if (Object.keys(apiResultData).length === Number(req.query.dayCount) + 1) {
      // delete apiResultData[allTransActionData[index + 1].timestamp.split("T")[0]];
      delete apiResultData[toLocale(new Date(allTransActionData[index + 1].timestamp))];
      break;
    }

    const transActionDataItem = allTransActionData[index];
    // const dateString = transActionDataItem.timestamp.split("T")[0];
    const dateString = toLocale(new Date(transActionDataItem.timestamp));
    if (!apiResultData[dateString]) {
      apiResultData[dateString] = { income: 0, expense: 0 };
    }
    const amount = Number(transActionDataItem.amount);
    apiResultData[dateString][amount > 0 ? "income" : "expense"] += amount;
  }
  const reversedResult = {};
  Object.keys(apiResultData)
    .reverse()
    .forEach((key) => {
      reversedResult[key] = apiResultData[key];
    });

  ////

  res.status(200).json({ data: reversedResult });
}
