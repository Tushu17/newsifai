// helper/getData.ts
import { NewsItem } from "./../models/data";
import axios from "axios";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

if (!OPENROUTER_API_KEY) {
  throw new Error("OPENROUTER_API_KEY is not defined.");
}

export async function fetchNewsWithGrokMini(): Promise<NewsItem[]> {
  console.log("this function is called");
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: "xai/grok-3-mini:beta", // Fixed model name
        messages: [
          {
            role: "user",
            content: `Fetch the top 20 news items related to India for today, May 19, 2025. Return each item with headline (3-5 words), source, summary (20-25 words), URL, place, published date (ISO format), author, image URL, content (full article), tags, language ("en"), and region ("IN"). Format as JSON.`,
          },
        ],
        max_tokens: 4000,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "News Fetcher App",
        },
      }
    );

    const newsData = JSON.parse(response.data.choices[0].message.content);
    return newsData.map((item: any) => ({
      headline: item.headline || "Untitled",
      source: item.source || "Unknown Source",
      summary: item.summary || "No summary available.",
      url: item.url || "#",
      place: item.place || "Unknown Place",
      published_at: item.published_at || new Date().toISOString(),
      author: item.author || "Unknown Author",
      image_url: item.image_url || "https://via.placeholder.com/150",
      content: item.content || "No content available.",
      tags: item.tags || ["news"],
      language: item.language || "en",
      region: item.region || "IN",
    }));
  } catch (error) {
    console.error("Error fetching news with Grok Mini Beta:", error);
    throw new Error("Failed to fetch news data.");
  }
}
