import React, { useState, useEffect, useCallback, useRef } from "react";
import TopicModal from "./topicmodal";
import { AiNewsTopic } from "@/models/topicdata";
import { fetchTopicItems } from "@/helper/gettopicdata";
import { MdOutlineViewModule } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import Tooltip from "@/app/components/ui/tooltip/tooltip";

interface AiTopicScrollerProps {
  onClose?: () => void;
  isSmallScreen?: boolean;
  selectedPlaceData?: {
    place: string;
    region?: string;
    country?: string;
    [key: string]: unknown;
  };
}
const aiContentWarning =
  "This content is AI-generated and may contain translation inaccuracies or unintended interpretations. Viewer discretion is advised. Please report any concerns.";

const TOPIC_TYPE_OPTIONS = [
  { label: "Conventional", value: "conventional", table: "ai_news_topics" },
  { label: "Lit Feed 🔥", value: "Lit Feed 🔥", table: "genz_ai_topics" },
  {
    label: "Cynical Scroll",
    value: "Cynical Scroll",
    table: "humour_ai_topics",
  },
];

const AiTopicScroller = ({ selectedPlaceData }: AiTopicScrollerProps) => {
  // All hooks at the top!
  const [topics, setTopics] = useState<AiNewsTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<AiNewsTopic | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topicType, setTopicType] = useState(() => {
    // Initialize from localStorage
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("userData");
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          if (parsed.topicType) {
            const savedTopicType = TOPIC_TYPE_OPTIONS.find(
              (option) => option.value === parsed.topicType.value
            );
            if (savedTopicType) {
              return savedTopicType;
            }
          }
        } catch (error) {
          console.error("Error parsing userData:", error);
        }
      }
    }
    return TOPIC_TYPE_OPTIONS[0];
  });
  const [openTypeDropdown, setOpenTypeDropdown] = useState(false);
  const typeButtonRef = useRef<HTMLButtonElement>(null);
  const typeDropdownRef = useRef<HTMLUListElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef(0);

  const ITEMS_PER_PAGE = 15;

  // Save topicType to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("userData");
      let parsedUserData = {};

      if (userData) {
        try {
          parsedUserData = JSON.parse(userData);
        } catch (error) {
          console.error("Error parsing userData:", error);
          parsedUserData = {};
        }
      }

      // Update userData with new topicType
      parsedUserData = {
        ...parsedUserData,
        topicType: topicType,
      };

      localStorage.setItem("userData", JSON.stringify(parsedUserData));
    }
  }, [topicType]);

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
        offsetRef.current = 0;
      } else {
        setLoadingMore(true);
      }

      try {
        const currentOffset = offsetRef.current;

        const { data, error } = await fetchTopicItems(
          selectedPlaceData?.region || null,
          currentOffset,
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
            // Filter out duplicates based on unique ID
            setTopics((prev) => {
              const existingIds = new Set(
                prev.map((topic) => topic.ai_topic_id)
              );
              const newTopics = data.filter(
                (topic) => !existingIds.has(topic.ai_topic_id)
              );
              return [...prev, ...newTopics];
            });
          }

          // Update offset ref immediately
          offsetRef.current = currentOffset + data.length;

          // Check if we have more data to load
          setHasMore(data.length === ITEMS_PER_PAGE);
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
          offsetRef.current = 0;
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [selectedPlaceData, topicType] // Clean dependencies
  );

  useEffect(() => {
    offsetRef.current = 0;
    setHasMore(true);
    fetchTopics(true);
  }, [selectedPlaceData, topicType]);

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

  const handleRefresh = () => {
    offsetRef.current = 0;
    setHasMore(true);
    setError(null);
    fetchTopics(true);
  };
  const handleTopicClick = (topic: AiNewsTopic) => {
    setSelectedTopic(topic);
  };

  if (!selectedPlaceData || !selectedPlaceData.place) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-500">Loading location...</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto rounded-xl shadow-xl dark:bg-gray-900 bg-gray-200 lg:w-[36vw] min-h-[70vh] lg:h-[72vh h-full">
        <div className="mb-1 w-full">
          <h2 className="text-lg font-bold text-gray-950 dark:text-gray-200">
            Loading Ai topics...
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto rounded-xl shadow-xl border border-gray-700 min-h-0 dark:bg-gray-900 bg-gray-200">
          <div className="p-2">
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
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  AI Topics - {selectedPlaceData.place}
                </h2>
                <Tooltip content={aiContentWarning}>
                  <IoWarningOutline className="text-yellow-500 text-lg hover:text-yellow-400 transition-colors" />
                </Tooltip>
              </div>
            </div>
            {/* this is mode selector div */}
            <div className="relative inline-block">
              <button
                ref={typeButtonRef}
                onClick={() => setOpenTypeDropdown((o) => !o)}
                className="flex items-center rounded-lg border-2 border-orange-400 bg-purple-800 hover:bg-orange-600 px-3 py-2 text-center transition-all text-white font-medium shadow-lg hover:shadow-xl cursor-pointer min-w-0 min-h-0"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={openTypeDropdown}
                style={{ zIndex: 2 }}
              >
                <MdOutlineViewModule className="pointer-events-none text-lg mr-1" />
                <span className="text-sm font-semibold">{topicType.label}</span>
              </button>
              {openTypeDropdown && (
                <ul
                  ref={typeDropdownRef}
                  role="listbox"
                  className="absolute right-0 mt-2 min-w-[160px] rounded-lg border-2 border-orange-200 bg-white p-2 shadow-xl z-50"
                >
                  {TOPIC_TYPE_OPTIONS.map((item) => (
                    <li
                      key={item.value}
                      onClick={() => {
                        setTopicType(item);
                        setOpenTypeDropdown(false);
                      }}
                      className={`px-4 py-3 cursor-pointer text-sm font-medium rounded-md transition-all text-gray-700 hover:bg-orange-100 hover:text-orange-700 ${
                        item.value === topicType.value
                          ? "bg-orange-200 text-orange-800 font-bold shadow-sm"
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
          <div className="p-2">
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

                {/* End of topics message */}
                {!hasMore && topics.length > 0 && !loadingMore && (
                  <div className="text-center py-6 mt-4">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-gray-400"></div>
                      <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        🤖
                      </span>
                      <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-gray-400"></div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      You&#39;ve reached the end of AI topics for{" "}
                      {selectedPlaceData.place}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                      Check back later for more AI insights
                    </p>
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
