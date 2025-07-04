import { createClient } from "@supabase/supabase-js";
import { NewsItem } from "../models/data";

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
 * Fetch news items from the news_items table with pagination support
 * @param queryTag - Optional tag to filter by
 * @param offset - Number of items to skip (for pagination)
 * @param limit - Number of items to fetch (default: 30)
 * @param location - Optional location to filter news by place
 * @returns {Promise<{data: NewsItem[] | null, error: any | null}>} Object with data and error
 */
export async function fetchNewsItems(
  queryTag: string | null = null,
  offset: number = 0,
  limit: number = 30,
  location?: string | null
) {
  try {
    let query = supabase
      .from("news_items")
      .select("*")
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (queryTag) {
      query = query.contains("tags", [queryTag]);
    }
    if (location) {
      query = query.eq("place", location);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching news_items:", error);
      return { data: null, error };
    }

    return { data: data as NewsItem[], error: null };
  } catch (err) {
    console.error("Unexpected error fetching news_items:", err);
    return { data: null, error: err };
  }
}
