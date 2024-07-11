import { TransActionData } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import jsonData from "../../mockdata.json";

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const allTransActionData: TransActionData[] = jsonData as any;
  const apiResultData = {};
  for (let index = allTransActionData.length - 1; index >= 0; index--) {
    if (Object.keys(apiResultData).length === Number(req.query.dayCount) + 1) {
      delete apiResultData[allTransActionData[index + 1].timestamp.split("T")[0]];
      break;
    }

    const transActionDataItem = allTransActionData[index];
    const dateString = transActionDataItem.timestamp.split("T")[0];
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
  console.log("reversedResult: ", reversedResult);
  res.status(200).json({ data: reversedResult });
}
