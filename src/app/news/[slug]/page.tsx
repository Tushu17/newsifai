"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

import { NewsItem } from "@/models/data";
import { fetchNewsItems } from "@/helper/getData";
import NewsModal from "@/app/components/newsmodal/newsmodal";
import Image from "next/image";

declare global {
  interface Window {
    getNewsPerformanceMetrics?: () => unknown; // You can specify a more precise return type if desired
  }
}

const CategoryPage = () => {
  const categoryList = [
    "global",
    "business",
    "technology",
    "sports",
    "health",
    "entertainment",
    "Global",
    "politics",
    "environment",
    "economy",
    "healthcare",
    "growth",
    "education",
  ];

  const params = useParams();
  const router = useRouter();

  // Progressive loading state management
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Refs for pagination and scroll detection
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isLoadingRef = useRef(false);

  // Constants
  const ITEMS_PER_PAGE = 30;

  // Performance monitoring
  const performanceRef = useRef({
    loadStartTime: 0,
    loadEndTime: 0,
    scrollDetectionCount: 0,
    apiCallCount: 0,
  });

  // Enhanced fetchNews function with pagination and error handling
  const fetchNews = useCallback(
    async (isInitialLoad: boolean = true) => {
      // Prevent multiple simultaneous API calls
      if (isLoadingRef.current) {
        return;
      }

      isLoadingRef.current = true;
      setError(null); // Clear previous errors

      // Performance monitoring
      performanceRef.current.loadStartTime = performance.now();
      performanceRef.current.apiCallCount += 1;

      if (isInitialLoad) {
        setLoading(true);
        offsetRef.current = 0;
      } else {
        setLoadingMore(true);
      }

      try {
        const currentOffset = offsetRef.current;
        // For global, pass null to get all news
        // For other categories, pass the slug as query parameter
        const queryParam =
          params.slug === "global" ? null : (params.slug as string);

        const { data, error } = await fetchNewsItems(
          queryParam,
          currentOffset,
          ITEMS_PER_PAGE
        );

        if (error) {
          console.error("Failed to fetch news items:", error);
          const errorMessage =
            typeof error === "string"
              ? error
              : error && typeof error === "object" && "message" in error
              ? String(error.message)
              : "Failed to load news items. Please try again.";
          setError(errorMessage);

          if (isInitialLoad) {
            setNewsItems([]); // Reset on error for initial load
          }
          return;
        }

        if (data && Array.isArray(data)) {
          if (isInitialLoad) {
            setNewsItems(data);
          } else {
            // Filter out duplicates by id
            setNewsItems((prev) => {
              const existingIds = new Set(prev.map((item) => item.id));
              const newItems = data.filter((item) => !existingIds.has(item.id));
              return [...prev, ...newItems];
            });
          }

          // Update offset and hasMore state
          offsetRef.current = currentOffset + data.length;
          setHasMore(data.length === ITEMS_PER_PAGE);
        } else {
          if (isInitialLoad) {
            setNewsItems([]);
            offsetRef.current = 0;
          }
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error in fetchNews:", error);

        // Handle different types of errors with proper type checking
        let errorMessage = "An unexpected error occurred. Please try again.";

        if (error instanceof TypeError && error.message.includes("fetch")) {
          errorMessage =
            "Network error. Please check your connection and try again.";
        } else if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === "string") {
          errorMessage = error;
        } else if (error && typeof error === "object" && "message" in error) {
          errorMessage = String(error.message);
        }

        setError(errorMessage);

        if (isInitialLoad) {
          setNewsItems([]);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
        isLoadingRef.current = false;

        // Performance monitoring
        performanceRef.current.loadEndTime = performance.now();
        const loadTime =
          performanceRef.current.loadEndTime -
          performanceRef.current.loadStartTime;

        // Log performance metrics in development
        if (process.env.NODE_ENV === "development") {
          console.log(
            `[Performance] Load time: ${loadTime.toFixed(2)}ms, API calls: ${
              performanceRef.current.apiCallCount
            }, Items loaded: ${newsItems.length}`
          );
        }
      }
    },
    [params.slug]
  );

  // Refresh functionality for error states
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);

    try {
      await fetchNews(true);
    } catch (error) {
      console.error("Error during refresh:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchNews]);

  // Initial load effect
  useEffect(() => {
    // Reset error state when category changes
    setError(null);
    setHasMore(true);
    fetchNews(true);
  }, [params.slug, fetchNews]);

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      // Reset loading state when component unmounts
      isLoadingRef.current = false;
    };
  }, []);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    const currentLoadingRef = loadingRef.current;

    if (!currentLoadingRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Only trigger if intersecting, has more content, not currently loading, and no error
        if (
          entry.isIntersecting &&
          hasMore &&
          !loadingMore &&
          !loading &&
          !error &&
          !isLoadingRef.current
        ) {
          performanceRef.current.scrollDetectionCount += 1;
          if (process.env.NODE_ENV === "development") {
            console.log(
              `[Performance] Scroll detection triggered: ${performanceRef.current.scrollDetectionCount}`
            );
          }
          fetchNews(false);
        }
      },
      {
        root: null, // Use viewport as root
        rootMargin: "100px", // Start loading 100px before reaching the end
        threshold: 0.1,
      }
    );

    observer.observe(currentLoadingRef);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, loadingMore, loading, error, fetchNews]);

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
  };

  // Performance testing utility (development only)
  const getPerformanceMetrics = useCallback(() => {
    if (process.env.NODE_ENV === "development") {
      return {
        totalApiCalls: performanceRef.current.apiCallCount,
        scrollDetections: performanceRef.current.scrollDetectionCount,
        totalItemsLoaded: newsItems.length,
        currentOffset: offsetRef.current,
        hasMoreItems: hasMore,
        isLoading: loading || loadingMore,
        duplicatePreventionActive: newsItems.length > 0,
        lastLoadTime:
          performanceRef.current.loadEndTime -
          performanceRef.current.loadStartTime,
      };
    }
    return null;
  }, [newsItems.length, hasMore, loading, loadingMore]);

  // Expose performance metrics to window for testing (development only)
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      window.getNewsPerformanceMetrics = getPerformanceMetrics;
    }
  }, [getPerformanceMetrics]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Header skeleton */}
        <div className="bg-white dark:bg-gray-800 shadow-md p-4 mb-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
        </div>

        {/* Skeleton grid placeholders */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 mb-2">
      {/* Header is also working as a selector for category */}
      <div className="bg-white dark:bg-gray-800 shadow-md p-4 mb-6">
        <select
          value={params.slug}
          onChange={(e) => router.push(`/news/${e.target.value}`)}
          className="text-2xl font-bold text-gray-900 dark:text-white capitalize bg-transparent border-none focus:ring-0"
        >
          {categoryList.map((category) => (
            <option
              key={category}
              value={category}
              className="text-gray-900 dark:text-white"
            >
              {category} News
            </option>
          ))}
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="container mx-auto px-4 mb-6">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
              <div className="ml-3">
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 px-3 py-1 rounded text-sm hover:bg-red-200 dark:hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRefreshing ? "Retrying..." : "Retry"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Scrollable Container */}
      <div ref={scrollContainerRef} className="container mx-auto px-4">
        {newsItems.length === 0 && !error ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
              No news available for {params.slug}
            </p>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        ) : newsItems.length > 0 ? (
          <>
            {/* News Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((news) => (
                <div
                  key={news.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer flex flex-col sm:flex-row md:flex-col"
                  onClick={() => handleNewsClick(news)}
                >
                  <div className="relative h-48 sm:h-32 sm:w-1/3 md:w-full md:h-48">
                    <Image
                      src={
                        news.image_url ||
                        "https://media1.tenor.com/m/51xvC35-fDEAAAAC/manhunt.gif"
                      }
                      alt={news.headline}
                      className="w-full h-48 object-cover"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "100%", height: "12rem" }}
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

            {/* Loading Indicator - After News Items Grid */}
            {loadingMore && !error && (
              <div
                className="flex justify-center items-center py-8"
                role="status"
                aria-live="polite"
                aria-label="Loading more news articles"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"
                    aria-hidden="true"
                  ></div>
                  <span className="text-gray-600 dark:text-gray-400">
                    Loading more news...
                  </span>
                </div>
              </div>
            )}

            {/* Error state for loading more */}
            {error && newsItems.length > 0 && (
              <div className="flex justify-center items-center py-8">
                <div className="text-center">
                  <p className="text-red-600 dark:text-red-400 text-sm mb-2">
                    Failed to load more news
                  </p>
                  <button
                    onClick={() => fetchNews(false)}
                    disabled={loadingMore}
                    className="bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 px-3 py-1 rounded text-sm hover:bg-red-200 dark:hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? "Retrying..." : "Try Again"}
                  </button>
                </div>
              </div>
            )}

            {/* End of content message */}
            {!hasMore && newsItems.length > 0 && !loading && (
              <div
                className="text-center py-8"
                role="status"
                aria-live="polite"
                aria-label="End of news articles reached"
              >
                <div className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <div
                    className="h-px bg-gray-300 dark:bg-gray-600 w-16"
                    aria-hidden="true"
                  ></div>
                  <span className="text-sm font-medium">
                    You&#39;ve reached the end
                  </span>
                  <div
                    className="h-px bg-gray-300 dark:bg-gray-600 w-16"
                    aria-hidden="true"
                  ></div>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  No more {params.slug} news to load
                </p>
              </div>
            )}

            {/* Intersection Observer Target Element */}
            <div
              ref={loadingRef}
              className="h-4"
              aria-hidden="true"
              data-testid="intersection-target"
            ></div>
          </>
        ) : null}
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </div>
  );
};

export default CategoryPage;
