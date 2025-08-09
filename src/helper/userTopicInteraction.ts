// src/helper/userTopicInteraction.ts
import { createClient } from "@supabase/supabase-js";

/**
 * Marks a topic as seen by the user.
 * @param userId - The user's UUID
 * @param topicId - The topic's UUID
 * @param topicType - The topic type string ('ai_news_topics', 'genz_ai_topics, 'humour_ai_topics')
 * @param topicVersion - The topic version (timestamp string)
 */

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable");
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable");
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function markTopicAsSeen({
  userId,
  topicId,
  topicType,
  topicVersion,
}: {
  userId: string;
  topicId: string;
  topicType: string;
  topicVersion: string;
}) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { error } = await supabase.from("user_topic_interactions").upsert(
    [
      {
        user_id: userId,
        topic_id: topicId,
        topic_type: topicType,
        topic_version: topicVersion,
        last_seen_at: new Date().toISOString(),
      },
    ],
    { onConflict: "user_id,topic_id,topic_type" }
  );

  if (error) {
    console.error("Failed to mark topic as seen:", error);
    throw error;
  }
}
