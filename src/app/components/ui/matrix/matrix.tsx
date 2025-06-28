import React, { useEffect, useState } from "react";
import { fetchNewsItems } from "@/helper/getData";
import { NewsItem } from "@/models/data";

const RATINGS = Array.from({ length: 10 }, (_, i) => i + 1);

const Matrix = () => {
  const [ratingCounts, setRatingCounts] = useState<number[]>(Array(10).fill(0));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      const { data, error } = await fetchNewsItems();
      if (error || !data) {
        setRatingCounts(Array(10).fill(0));
        setLoading(false);
        return;
      }
      // Filter news from last 24 hours
      const recentNews = data.filter(
        (item: NewsItem) => new Date(item.published_at) >= new Date(since)
      );
      // Count number of news for each rating (1-10)
      const counts = Array(10).fill(0);
      recentNews.forEach((item: NewsItem) => {
        const rating = Math.round(Number(item.news_rating));
        if (rating >= 1 && rating <= 10) {
          counts[rating - 1] += 1;
        }
      });
      setRatingCounts(counts);
      setLoading(false);
    };
    fetchRatings();
  }, []);

  // Find max count for scaling
  const maxCount = Math.max(...ratingCounts, 1);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6 flex items-center justify-center min-h-[220px]">
      <div className="flex w-full h-48 items-end">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between h-full mr-2 text-xs text-gray-400 dark:text-gray-500">
          {[maxCount, Math.ceil(maxCount / 2), 0].map((v, i) => (
            <span key={i} style={{ height: i === 1 ? "50%" : "auto" }}>
              {v}
            </span>
          ))}
        </div>
        {/* Bar graph */}
        <div className="flex-1 flex items-end h-full">
          {RATINGS.map((rating, idx) => (
            <div key={rating} className="flex flex-col items-center flex-1">
              <div
                className="bg-blue-500 dark:bg-blue-400 rounded-t w-4 transition-all duration-300"
                style={{
                  height: `${(ratingCounts[idx] / maxCount) * 100 || 2}%`,
                  minHeight: "6px",
                }}
                title={`Rating ${rating}: ${ratingCounts[idx]}`}
              />
              <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {rating}
              </span>
            </div>
          ))}
        </div>
      </div>
      {loading && (
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-white/70 dark:bg-gray-800/70">
          <span className="text-gray-400 dark:text-gray-500">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Matrix;
