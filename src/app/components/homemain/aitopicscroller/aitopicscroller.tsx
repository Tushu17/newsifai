import React, { useState, useEffect, useCallback, useRef } from "react";
import TopicModal from "./topicmodal";
import { AiNewsTopic } from "@/models/topicdata";
import { fetchTopicItems } from "@/helper/gettopicdata";
import { CiLocationOn } from "react-icons/ci";

interface AiTopicScrollerProps {
  onClose?: () => void;
  isSmallScreen?: boolean;
  selectedPlaceData: {
    place: string;
    region?: string;
    country?: string;
    [key: string]: unknown;
  };
}

const TOPIC_TYPE_OPTIONS = [
  { label: "Conventional", value: "conventional", table: "ai_news_topics" },
  { label: "Cult - classic", value: "cult", table: "humour_ai_topics" },
  { label: "Genz", value: "genz", table: "genz_ai_topics" },
];

const AiTopicScroller = ({ selectedPlaceData }: AiTopicScrollerProps) => {
  const [topics, setTopics] = useState<AiNewsTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<AiNewsTopic | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [topicType, setTopicType] = useState(TOPIC_TYPE_OPTIONS[0]);
  const [openTypeDropdown, setOpenTypeDropdown] = useState(false);
  const typeButtonRef = useRef<HTMLButtonElement>(null);
  const typeDropdownRef = useRef<HTMLUListElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = 15;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        typeButtonRef.current &&
        !typeButtonRef.current.contains(event.target as Node) &&
        typeDropdownRef.current &&
        !typeDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenTypeDropdown(false);
      }
    }
    if (openTypeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openTypeDropdown]);

  const fetchTopics = useCallback(
    async (isInitialLoad: boolean = true) => {
      if (isInitialLoad) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      try {
        const { data, error } = await fetchTopicItems(
          selectedPlaceData.region || null,
          offset,
          ITEMS_PER_PAGE,
          undefined,
          topicType.table
        );

        if (error) {
          console.error("Failed to fetch topics:", error);
          setError("Failed to load topics");
          if (isInitialLoad) {
            setTopics([]);
          }
          return;
        }

        if (data && Array.isArray(data)) {
          if (isInitialLoad) {
            setTopics(data);
          } else {
            setTopics((prev) => [...prev, ...data]);
          }

          // Check if we have more data to load
          setHasMore(data.length === ITEMS_PER_PAGE);
          setOffset((prev) => prev + data.length);
        } else {
          if (isInitialLoad) {
            setTopics([]);
          }
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error in fetchTopics:", error);
        setError("An unexpected error occurred");
        if (isInitialLoad) {
          setTopics([]);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [offset, selectedPlaceData, topicType]
  );

  useEffect(() => {
    setOffset(0);
    setHasMore(true);
    fetchTopics(true);
  }, [selectedPlaceData, topicType]);

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loadingMore && !loading) {
          fetchTopics(false);
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: "100px", // Start loading 100px before reaching the end
        threshold: 0.1,
      }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [hasMore, loadingMore, loading, fetchTopics]);

  const handleTopicClick = (topic: AiNewsTopic) => {
    setSelectedTopic(topic);
  };

  const handleRefresh = () => {
    setOffset(0);
    setHasMore(true);
    setError(null);
    fetchTopics(true);
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto rounded-xl shadow-xl dark:bg-gray-900 bg-gray-200 lg:w-[36vw] min-h-[70vh] lg:h-[72vh h-full">
        <div className="flex-1 overflow-y-auto rounded-xl shadow-xl border border-gray-700 min-h-0 dark:bg-gray-900 bg-gray-200">
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-square bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-pulse flex items-center justify-center"
                >
                  <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-1">
        <div className="p-3 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <div className="mr-4">
                <span className="block w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Info for the day in {selectedPlaceData.place}
              </h2>
            </div>
            <div className="relative inline-block">
              <button
                ref={typeButtonRef}
                onClick={() => setOpenTypeDropdown((o) => !o)}
                className="flex rounded-full border border-transparent p-2 text-center transition-all text-gray-700 dark:text-white hover:bg-gray-600 cursor-pointer min-w-0 min-h-0"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={openTypeDropdown}
                style={{ zIndex: 2 }}
              >
                <CiLocationOn className="pointer-events-none text-xl" />
                <span className="ml-1 text-md">{topicType.value}</span>
              </button>
              {openTypeDropdown && (
                <ul
                  ref={typeDropdownRef}
                  role="listbox"
                  className="absolute right-0 mt-2 min-w-[140px] rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg z-50"
                >
                  {TOPIC_TYPE_OPTIONS.map((item) => (
                    <li
                      key={item.value}
                      onClick={() => {
                        setTopicType(item);
                        setOpenTypeDropdown(false);
                      }}
                      className={`px-4 py-2 cursor-pointer text-sm capitalize rounded transition-colors text-slate-700 hover:bg-purple-100 ${
                        item.value === topicType.value
                          ? "bg-purple-200 font-bold"
                          : ""
                      }`}
                      role="option"
                      aria-selected={item.value === topicType.value}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col min-h-0 mb-5 lg:h-[72vh] h-full">
        {/* 2x4 Grid of Topic Boxes */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto rounded-xl shadow-xl border border-gray-700 dark:bg-gray-900 bg-gray-200 mb-3 md:mb-0 w-full min-h-[50vh] h-auto lg:w-[35vw] lg:h-[72vh]"
        >
          <div className="p-4">
            {error ? (
              <div className="text-center py-8">
                <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                <button
                  onClick={handleRefresh}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            ) : topics.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">
                  No AI topics available
                </p>
                <button
                  onClick={handleRefresh}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Refresh
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {topics.map((topic) => (
                    <div
                      key={topic.ai_topic_id}
                      className="aspect-square bg-gray-300 dark:bg-gray-800 rounded-lg shadow-lg border border-black dark:border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer transform hover:-translate-y-0.5 flex items-center justify-center p-4"
                      onClick={() => handleTopicClick(topic)}
                    >
                      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200 text-center leading-tight">
                        {topic.ai_topic_name}
                      </h3>
                    </div>
                  ))}
                </div>

                {/* Loading indicator for infinite scroll */}
                {loadingMore && (
                  <div className="flex justify-center py-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      {[...Array(4)].map((_, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-pulse flex items-center justify-center"
                        >
                          <div className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Intersection observer target */}
                <div ref={loadingRef} className="h-4" />
              </>
            )}
          </div>
        </div>

        {/* Topic Modal */}
        {selectedTopic && (
          <TopicModal
            topic={selectedTopic}
            onClose={() => setSelectedTopic(null)}
          />
        )}

        {/* Bottom accent */}
        <div className="h-0.5 bg-gradient-to-r from-fuchsia-500 to-emerald-700 animate-pulse rounded-b-lg mt-3"></div>
      </div>
    </>
  );
};

export default AiTopicScroller;
