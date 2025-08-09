export interface TopicBullet {
  text: string;
  news_id: number;
}

export interface TopicDateEntry {
  date: string; // YYYY-MM-DD format
  bullets: TopicBullet[];
}

export interface AiNewsTopic {
  ai_topic_id?: string; // UUID, auto-generated
  ai_topic_name: string;
  ai_topic_heading: string;
  ai_topic_short_summary?: string;
  ai_topic_long_summary_json?: TopicDateEntry[];
  ai_topic_related_news_ids?: number[];
  region?: string;
  status?: "active" | "archived" | "deleted";
  ai_confidence?: number; // double precision in DB, number in TypeScript
  created_at?: string; // ISO 8601 timestamp
  updated_at?: string; // ISO 8601 timestamp
  last_news_at?: string; // ISO 8601 timestamp
  place?: string;
  genz_conversion?: string;
  humour_conversion?: string;
  topic_score?: string;
  topic_status?: string;
}

// For creating new topics (without auto-generated fields)
export interface CreateAiNewsTopic {
  ai_topic_name: string;
  ai_topic_heading: string;
  ai_topic_short_summary?: string;
  ai_topic_long_summary_json?: TopicDateEntry[];
  ai_topic_related_news_ids?: number[];
  region?: string;
  status?: "active" | "archived" | "deleted";
  ai_confidence?: number;
  last_news_at?: string;
}

// For updating existing topics
export interface UpdateAiNewsTopic {
  ai_topic_name?: string;
  ai_topic_heading?: string;
  ai_topic_short_summary?: string;
  ai_topic_long_summary_json?: TopicDateEntry[];
  ai_topic_related_news_ids?: number[];
  region?: string;
  status?: "active" | "archived" | "deleted";
  ai_confidence?: number;
  updated_at?: string;
  last_news_at?: string;
}

// Helper types for API responses
export interface TopicResponse {
  data: AiNewsTopic[] | null;
  error: unknown | null;
}

export interface SingleTopicResponse {
  data: AiNewsTopic | null;
  error: unknown | null;
}
