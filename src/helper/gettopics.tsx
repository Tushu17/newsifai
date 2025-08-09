import {
  AiNewsTopic,
  TopicResponse,
  TopicDateEntry,
} from "../models/topicdata";
import { UserPreference, PlaceData } from "@/contexts";
import { supabase } from "./gettopicdata"; // Reuse existing Supabase client

// Enhanced topic interface with interaction status and metadata
interface TopicWithStatus {
  // Original topic fields
  ai_topic_id: string;
  ai_topic_name: string;
  ai_topic_heading: string;
  ai_topic_short_summary?: string;
  ai_topic_long_summary_json?: TopicDateEntry[];
  ai_topic_related_news_ids?: number[];
  region?: string;
  status: string;
  ai_confidence?: number;
  created_at: string;
  updated_at: string;
  last_news_at?: string;
  place?: string;
  genz_conversion?: string;
  humour_conversion?: string;
  topic_score?: string;
  topic_status?: string;
  // Computed interaction fields
  is_seen: boolean;
  is_updated_since_last_seen: boolean;
  last_seen_at?: string;
  // Metadata fields
  total_unseen_count: number;
  total_seen_count: number;
  current_batch_unseen: number;
  current_batch_seen: number;
}

// Enhanced response interface
interface TopicResponseWithStatus {
  data: TopicWithStatus[] | null;
  error: unknown | null;
  metadata?: {
    totalUnseen: number;
    totalSeen: number;
    batchUnseen: number;
    batchSeen: number;
  };
}

// Helper function to map table name to topic type
function getTopicTypeFromTable(tableName: string): string {
  const mapping: Record<string, string> = {
    ai_news_topics: "ai_news_topics",
    genz_ai_topics: "genz_ai_topics",
    humour_ai_topics: "humour_ai_topics",
  };
  return mapping[tableName] || "ai_news_topics";
}

/**
 * Fetch topics with user preferences using RPC function
 * Supports fresh-first ordering, sorting, filtering, and pagination
 */
export async function fetchTopicsWithPreferences(
  userPreference: UserPreference,
  selectedPlace: PlaceData | null,
  isUserSignedIn: boolean,
  userId?: string,
  offset: number = 0,
  limit: number = 20,
  tableName: string = "ai_news_topics"
): Promise<TopicResponseWithStatus> {
  try {
    const { data, error } = await supabase.rpc(
      "fetch_topics_with_preferences",
      {
        p_user_id: userId || null,
        p_table_name: tableName,
        p_topic_type: getTopicTypeFromTable(tableName),
        p_show_fresh_first: isUserSignedIn
          ? userPreference.showFreshFirst
          : false,
        p_sort_by: userPreference.sortBy,
        p_region: selectedPlace?.region || null,
        p_place: selectedPlace?.place || null,
        p_offset: offset,
        p_limit: limit,
      }
    );

    if (error) {
      console.error("RPC Error:", error);
      return { data: null, error };
    }

    // Extract metadata from first row (all rows have same metadata)
    const metadata =
      data && data.length > 0
        ? {
            totalUnseen: data[0].total_unseen_count,
            totalSeen: data[0].total_seen_count,
            batchUnseen: data[0].current_batch_unseen,
            batchSeen: data[0].current_batch_seen,
          }
        : {
            totalUnseen: 0,
            totalSeen: 0,
            batchUnseen: 0,
            batchSeen: 0,
          };

    return {
      data: data as TopicWithStatus[],
      error: null,
      metadata,
    };
  } catch (err) {
    console.error("Unexpected error calling RPC:", err);
    return { data: null, error: err };
  }
}

/**
 * Fallback function for when RPC is not available
 * Uses the original fetchTopicItems logic
 */
export async function fetchTopicsSimple(
  userPreference: UserPreference,
  selectedPlace: PlaceData | null,
  offset: number = 0,
  limit: number = 20,
  tableName: string = "ai_news_topics"
): Promise<TopicResponse> {
  try {
    let query = supabase
      .from(tableName)
      .select("*")
      .eq("status", "active")
      .order(userPreference.sortBy, {
        ascending: false,
      })
      .range(offset, offset + limit - 1);

    // Add region filter if provided
    if (selectedPlace?.region) {
      query = query.eq("region", selectedPlace.region);
    }

    // Add place filter if provided
    if (selectedPlace?.place) {
      query = query.eq("place", selectedPlace.place);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching topics from ${tableName}:`, error);
      return { data: null, error };
    }

    return { data: data as AiNewsTopic[], error: null };
  } catch (err) {
    console.error("Unexpected error fetching topics:", err);
    return { data: null, error: err };
  }
}

// Export types for use in other components
export type { TopicWithStatus, TopicResponseWithStatus };

/**
 * Enhanced test function that uses actual user preferences
 * Call this from your component to test with real settings
 */
export async function testRPCConnection(
  userId?: string,
  userPreference?: UserPreference,
  selectedPlace?: PlaceData | null,
  isUserSignedIn?: boolean
) {
  console.log("🧪 Testing RPC with user preferences...");
  console.log("📋 Test Parameters:", {
    userId: userId || "anonymous",
    showFreshFirst: userPreference?.showFreshFirst || false,
    sortBy: userPreference?.sortBy || "created_at",

    region: selectedPlace?.region || "none",
    place: selectedPlace?.place || "none",
    isSignedIn: isUserSignedIn || false,
  });

  try {
    const { data, error } = await supabase.rpc(
      "fetch_topics_with_preferences",
      {
        p_user_id: userId || null,
        p_show_fresh_first: isUserSignedIn
          ? userPreference?.showFreshFirst || false
          : false,
        p_sort_by: userPreference?.sortBy || "created_at",
        p_region: selectedPlace?.region || null,
        p_place: selectedPlace?.place || null,
        p_limit: 5, // Get more topics to see sorting
      }
    );

    console.log("✅ RPC Test Results:", {
      success: !error,
      error: error,
      dataCount: data?.length || 0,
      topics:
        data?.map((t: TopicWithStatus) => ({
          name: t.ai_topic_name,
          score: t.topic_score,
          isSeen: t.is_seen,
          sortValue:
            t[
              (userPreference?.sortBy as keyof TopicWithStatus) || "created_at"
            ],
        })) || [],
      metadata: data?.[0]
        ? {
            totalUnseen: data[0].total_unseen_count,
            totalSeen: data[0].total_seen_count,
            batchUnseen: data[0].current_batch_unseen,
            batchSeen: data[0].current_batch_seen,
          }
        : null,
    });

    return { success: !error, data, error };
  } catch (err) {
    console.error("❌ RPC Test Error:", err);
    return { success: false, data: null, error: err };
  }
}
