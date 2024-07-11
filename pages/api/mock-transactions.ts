import type { NextApiRequest, NextApiResponse } from "next";
import jsonData from "../../mockdata.json";

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const data: any = jsonData;
  req.query.month;
  req.query.week;
  const slicedData = data.slice(data.length - 100, data.length);
  // const slicedData = data.slice(data.length - 100, data.length).reverse();
  res.status(200).json({ data: slicedData });
}
