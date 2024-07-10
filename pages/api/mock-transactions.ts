import type { NextApiRequest, NextApiResponse } from "next";
import jsonData from "../../mockdata.json";

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const zz: any = jsonData;
  res.status(200).json({ data: zz.slice(0, 100) });
}
