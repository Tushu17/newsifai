export interface NewsItem {
  id: number;
  headline: string;
  source: string;
  summary: string;
  url: string;
  place: string;
  published_at: string;
  author: string;
  image_url: string;
  content: string;
  tags: string | string[];
  language: string;
  region: string;
  time: string;
  news_rating: string;
}
