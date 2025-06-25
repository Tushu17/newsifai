"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { NewsItem } from "@/models/data";
import { fetchNewsItems } from "@/helper/getData";
import NewsModal from "@/app/components/newsmodal/newsmodal";
import Image from "next/image";

const CategoryPage = () => {
  const params = useParams();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      setLoading(true);

      try {
        // For global, pass null to get all news
        // For other categories, pass the slug as query parameter
        const queryParam =
          params.slug === "global" ? null : (params.slug as string);
        const { data, error } = await fetchNewsItems(queryParam);

        if (error) {
          console.error("Failed to fetch news items:", error);
          setNewsItems([]);
        } else if (data && Array.isArray(data)) {
          setNewsItems(data);
        } else {
          setNewsItems([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNewsItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryNews();
  }, [params.slug]);

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 mb-2">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
          {params.slug} News
        </h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {newsItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              No news available for {params.slug}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((news) => (
              <div
                key={news.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer flex flex-col sm:flex-row md:flex-col"
                onClick={() => handleNewsClick(news)}
              >
                <div className="relative h-48 sm:h-32 sm:w-1/3 md:w-full md:h-48">
                  <Image
                    src={news.image_url || "/placeholder-news.jpg"}
                    alt={news.headline}
                    className="object-cover"
                    width={1000}
                    height={1000}
                  />
                  <div className="absolute top-2 right-2 flex flex-col">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                      {Array.isArray(news.tags)
                        ? news.tags[0]
                        : news.tags?.split(",")[0] || "General"}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:w-2/3 md:w-full">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {news.headline}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {news.summary}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {news.time}
                    </span>
                    <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </div>
  );
};

export default CategoryPage;
