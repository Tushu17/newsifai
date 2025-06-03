import { infoData } from "@/models/infodata";
import { createClient } from "@supabase/supabase-js";

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
 * Fetch all news items from the news_items table
 * @returns {Promise<{data: infoData[] | null, error: any | null}>} Object with data and error
 */
export async function fetchInfoData(place: string) {
  try {
    const { data, error } = await supabase
      .from("infobox_data")
      .select("*")
      .eq("place", place);

    if (error) {
      console.error("Error fetching news_items:", error);
      return { data: null, error };
    }

    return { data: data as infoData[], error: null };
  } catch (err) {
    console.error("Unexpected error fetching news_items:", err);
    return { data: null, error: err };
  }
}
