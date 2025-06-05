import { createClient } from "@supabase/supabase-js";

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
 * @returns {Promise<{data: authData[] | null, error: any | null}>} Object with data and error
 */

export async function signUpAccount() {
  try {
    const { data, error } = await supabase
      .from("news_items")
      .select("count")
      .limit(1);
    if (error) {
      console.error("Supabase connection error:", error);
    } else {
      console.log("Supabase connection successful");
    }
    //comback if error
    localStorage.setItem("data", JSON.stringify(data));
  } catch (err) {
    console.error("Failed to connect to Supabase:", err);
  }
}
