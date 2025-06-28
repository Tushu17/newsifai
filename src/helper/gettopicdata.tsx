import { createClient } from "@supabase/supabase-js";
import { AiNewsTopic, TopicResponse } from "../models/topicdata";

// Validate environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable");
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

/**
 * Fetch AI news topics from the ai_news_topics table with progressive scrolling
 * @param region - Optional region to filter by
 * @param offset - Number of items to skip (for pagination)
 * @param limit - Number of items to fetch (default: 15)
 * @returns {Promise<TopicResponse>} Object with data and error
 */
export async function fetchTopicItems(
  region: string | null = null,
  offset: number = 0,
  limit: number = 15
): Promise<TopicResponse> {
  try {
    const query = supabase
      .from("ai_news_topics")
      .select("*")
      .eq("status", "active")
      .order("last_news_at", { ascending: false })
      .range(offset, offset + limit - 1);

    // Add region filter if provided
    const finalQuery = region ? query.eq("region", region) : query;
    const { data, error } = await finalQuery;

    if (error) {
      console.error("Error fetching ai_news_topics:", error);
      return { data: null, error };
    }

    return { data: data as AiNewsTopic[], error: null };
  } catch (err) {
    console.error("Unexpected error fetching ai_news_topics:", err);
    return { data: null, error: err };
  }
}

/**
 * Fetch a single AI news topic by ID
 * @param topicId - The UUID of the topic to fetch
 * @returns {Promise<{data: AiNewsTopic | null, error: any | null}>} Object with data and error
 */
export async function fetchTopicById(topicId: string) {
  try {
    const { data, error } = await supabase
      .from("ai_news_topics")
      .select("*")
      .eq("ai_topic_id", topicId)
      .single();

    if (error) {
      console.error("Error fetching topic by ID:", error);
      return { data: null, error };
    }

    return { data: data as AiNewsTopic, error: null };
  } catch (err) {
    console.error("Unexpected error fetching topic by ID:", err);
    return { data: null, error: err };
  }
}

/**
 * Fetch topics by region with progressive scrolling
 * @param region - Region to filter by
 * @param offset - Number of items to skip (for pagination)
 * @param limit - Number of items to fetch (default: 15)
 * @returns {Promise<TopicResponse>} Object with data and error
 */
export async function fetchTopicsByRegion(
  region: string,
  offset: number = 0,
  limit: number = 15
): Promise<TopicResponse> {
  return fetchTopicItems(region, offset, limit);
}

/**
 * Fetch all active topics with progressive scrolling
 * @param offset - Number of items to skip (for pagination)
 * @param limit - Number of items to fetch (default: 15)
 * @returns {Promise<TopicResponse>} Object with data and error
 */
export async function fetchAllTopics(
  offset: number = 0,
  limit: number = 15
): Promise<TopicResponse> {
  return fetchTopicItems(null, offset, limit);
}
