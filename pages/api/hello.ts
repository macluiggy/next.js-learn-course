import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiRequest) {
  res.status(200).json({ text: "Hello" });
}
