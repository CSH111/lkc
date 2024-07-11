import type { NextApiRequest, NextApiResponse } from "next";
import jsonData from "../../mockdata.json";

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const data: any = jsonData;
  const count = Number(req.query.count ?? 100);
  const slicedData = data.slice(data.length - count, data.length);
  res.status(200).json({ data: slicedData.reverse() });
}
