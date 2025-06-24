import { fetchNewsItems } from "@/helper/getData";
import React, { useCallback, useEffect, useState } from "react";
// import PopupModal from "../PopupModal";
import { NewsItem } from "@/models/data";
import NewsModal from "@/app/components/newsmodal/newsmodal";

// Define the NewsItem interface

const Scroller = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Helper function to normalize tags
  const normalizeTags = (tags: string | string[]): string[] => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    if (typeof tags === "string") {
      // Handle comma-separated string or single tag
      return tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
    }
    return [];
  };

  const getTagColor = (tags: string | string[]): string => {
    const colors: { [key: string]: string } = {
      markets: "bg-green-500",
      politics: "bg-blue-500",
      environment: "bg-emerald-500",
      technology: "bg-purple-500",
      economy: "bg-yellow-500",
      healthcare: "bg-red-500",
      default: "bg-gray-500",
    };

    const normalizedTags = normalizeTags(tags);
    // Find the first tag that matches a color key
    const matchingTag = normalizedTags.find((tag) =>
      colors.hasOwnProperty(tag.toLowerCase())
    );
    // If found, return its color; otherwise, return default
    return matchingTag ? colors[matchingTag.toLowerCase()] : colors.default;
  };

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      // Ask it to fetch news items with news_rating greater than 5
      const { data, error } = await fetchNewsItems();

      if (error) {
        console.error("Failed to fetch news items:", error);
        setNewsItems([]); // Reset on error
        return;
      }

      if (data && Array.isArray(data)) {
        setNewsItems(data);
      } else {
        setNewsItems([]);
      }
    } catch (error) {
      console.error("Error in fetchNews:", error);
      setNewsItems([]);
    } finally {
      setLoading(false);
    }
  }, []); // Fixed dependency - should be queryTag, not selectedCategory

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto rounded-xl shadow-xl    dark:bg-gray-900 bg-gray-200 lg:w-[36vw] min-h-[70vh] lg:h-[72vh]">
        <div className="mb-1 w-full">
          <h2 className="text-lg font-bold text-gray-950 dark:text-gray-200">
            Loading News...
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto rounded-xl shadow-xl border border-gray-700 min-h-0 dark:bg-gray-900 bg-gray-200">
          <div className="p-4 space-y-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex w-full overflow-hidden bg-white rounded-lg shadow-lg animate-pulse dark:bg-gray-800"
              >
                <div className="w-full p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="w-20 h-4 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
                    <div className="w-16 h-3 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2"></div>
                  <div className="w-3/4 h-3 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 mb-5  lg:h-[72vh] ">
      <>
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto rounded-xl shadow-xl border border-gray-700 dark:bg-gray-900 bg-gray-200 mb-3 md:mb-0 w-full min-h-[50vh] h-auto lg:w-[35vw] lg:h-[72vh]">
          <div className="p-2 space-y-3 ">
            {newsItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  No news items available
                </p>
                <button
                  onClick={fetchNews}
                  className="mt-4 px-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Refresh
                </button>
              </div>
            ) : (
              newsItems.map((item) => {
                const normalizedTags = normalizeTags(item.tags);
                return (
                  <div
                    key={item.id}
                    className="group dark:bg-gray-800 bg-gray-300 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer transform hover:-translate-y-0.5"
                    onClick={() => handleNewsClick(item)}
                  >
                    {/* Category and Time */}
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getTagColor(
                          item.tags
                        )}`}
                      >
                        {normalizedTags[0] || "General"}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(item.published_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        ) || "Unknown time"}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200 mb-2 group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                      {item.headline || "No headline available"}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-gray-800 dark:text-gray-300 leading-relaxed line-clamp-3">
                      {item.summary || "No summary available"}
                    </p>

                    {/* Read More Indicator */}
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs text-blue-400 font-medium">
                        Read more →
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        {selectedNews && (
          <NewsModal
            news={selectedNews}
            onClose={() => setSelectedNews(null)}
          />
        )}
      </>
      <div className="h-0.5 bg-gradient-to-r from-fuchsia-500 to-emerald-700 animate-pulse rounded-b-lg mt-3"></div>
    </div>
  );
};

export default Scroller;
