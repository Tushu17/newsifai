// pages/api/news.ts
import { NextApiRequest, NextApiResponse } from "next";
import { fetchNewsWithGrokMini } from "./../../../helper/getData";
import { NewsItem } from "../../../models/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsItem[] | { error: string }>
) {
  if (req.method !== "GET") {
    console.log("Method not allowed:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Handler called for GET request");
    const newsItems = await fetchNewsWithGrokMini();
    res.status(200).json(newsItems);
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({ error: "Failed to fetch news data." });
  }
}
