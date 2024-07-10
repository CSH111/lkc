import type { NextApiRequest, NextApiResponse } from "next";
import jsonData from "../../mockdata.json";

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const data: any = jsonData;
  res.status(200).json({ data: data.slice(data.length - 10000, data.length - 1).reverse() });
}
