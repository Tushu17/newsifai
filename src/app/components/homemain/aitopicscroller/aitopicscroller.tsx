import React, { useState, useEffect, useCallback, useRef } from "react";
import TopicModal from "./topicmodal";
import { AiNewsTopic } from "@/models/topicdata";
import {
  fetchTopicsWithPreferences,
  TopicWithStatus,
} from "@/helper/gettopics";
import { MdOutlineViewModule } from "react-icons/md";
import { IoIosOptions } from "react-icons/io";
import DropdownFilter from "@/app/components/ui/dropdownfilter/dropdownfilter";
import { useUserData } from "@/contexts";

const TOPIC_TYPE_OPTIONS = [
  { label: "Conventional", value: "conventional", table: "ai_news_topics" },
  { label: "Lit Feed 🔥", value: "Lit Feed 🔥", table: "genz_ai_topics" },
  {
    label: "Cynical Scroll",
    value: "Cynical Scroll",
    table: "humour_ai_topics",
  },
];

const AiTopicScroller = () => {
  const {
    selectedPlace,
    topicType,
    updateTopicType,
    userPreference,
    isUserSignedIn,
    userId,
  } = useUserData();
  // All hooks at the top!
  const [topics, setTopics] = useState<TopicWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<AiNewsTopic | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [openTypeDropdown, setOpenTypeDropdown] = useState(false);
  const [openFilterDropdown, setOpenFilterDropdown] = useState(false);
  const typeButtonRef = useRef<HTMLButtonElement>(null);
  const typeDropdownRef = useRef<HTMLUListElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef(0);

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

      if (
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target as Node) &&
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenFilterDropdown(false);
      }
    }
    if (openTypeDropdown || openFilterDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openTypeDropdown, openFilterDropdown]);

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

        // Use RPC function with user preferences
        const result = await fetchTopicsWithPreferences(
          userPreference,
          selectedPlace,
          isUserSignedIn,
          userId || undefined,
          currentOffset,
          ITEMS_PER_PAGE,
          topicType.table
        );

        if (result.error) {
          console.error("Failed to fetch topics:", result.error);
          setError("Failed to load topics");
          if (isInitialLoad) {
            setTopics([]);
          }
          return;
        }

        if (result.data && Array.isArray(result.data)) {
          if (isInitialLoad) {
            setTopics(result.data);
          } else {
            // Filter out duplicates based on unique ID
            setTopics((prev) => {
              const existingIds = new Set(
                prev.map((topic) => topic.ai_topic_id)
              );
              const newTopics = result.data!.filter(
                (topic) => !existingIds.has(topic.ai_topic_id)
              );
              return [...prev, ...newTopics];
            });
          }

          // Update offset ref immediately
          offsetRef.current = currentOffset + result.data.length;

          // Check if we have more data to load
          setHasMore(result.data.length === ITEMS_PER_PAGE);
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
    [selectedPlace, topicType, userPreference, isUserSignedIn, userId] // Updated dependencies
  );

  useEffect(() => {
    if (selectedPlace?.place) {
      offsetRef.current = 0;
      setHasMore(true);
      fetchTopics(true);
    }
  }, [selectedPlace, topicType, userPreference, fetchTopics]);

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

  const handleTopicClick = (topic: TopicWithStatus) => {
    // Update local state to mark topic as seen immediately
    if (isUserSignedIn && !topic.is_seen) {
      setTopics((prevTopics) =>
        prevTopics.map((t) =>
          t.ai_topic_id === topic.ai_topic_id ? { ...t, is_seen: true } : t
        )
      );
    }

    // Convert TopicWithStatus back to AiNewsTopic for the modal
    const aiNewsTopic: AiNewsTopic = {
      ai_topic_id: topic.ai_topic_id,
      ai_topic_name: topic.ai_topic_name,
      ai_topic_heading: topic.ai_topic_heading,
      ai_topic_short_summary: topic.ai_topic_short_summary,
      ai_topic_long_summary_json: topic.ai_topic_long_summary_json,
      ai_topic_related_news_ids: topic.ai_topic_related_news_ids,
      region: topic.region,
      status: topic.status as "active" | "archived" | "deleted",
      ai_confidence: topic.ai_confidence,
      created_at: topic.created_at,
      updated_at: topic.updated_at,
      last_news_at: topic.last_news_at,
      place: topic.place,
      genz_conversion: topic.genz_conversion,
      humour_conversion: topic.humour_conversion,
      topic_score: topic.topic_score,
      topic_status: topic.topic_status,
    };
    setSelectedTopic(aiNewsTopic);
  };

  if (!selectedPlace || !selectedPlace.place) {
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
              <div className=" mr-2 lg:mr-4">
                <span className="block w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  AI Topics - {selectedPlace.place}
                </h2>
              </div>
            </div>
            {/* this is mode selector and filter buttons div */}
            <div className="flex items-center gap-2">
              {/* Mode selector */}
              <div className="relative inline-block">
                <button
                  ref={typeButtonRef}
                  onClick={() => setOpenTypeDropdown((o) => !o)}
                  className="flex items-center rounded-lg border-2 border-orange-400 bg-purple-800 hover:bg-orange-500 px-1 lg:px-3 py-1 lg:py-2 text-center transition-all text-white font-medium shadow-lg hover:shadow-xl cursor-pointer min-w-0 min-h-0"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={openTypeDropdown}
                  style={{ zIndex: 2 }}
                >
                  <MdOutlineViewModule className="pointer-events-none text-lg mr-1" />
                  <span className="text-sm font-semibold">
                    {topicType.label}
                  </span>
                </button>
              </div>

              {/* Filter button */}
              <div className="relative inline-block">
                <button
                  ref={filterButtonRef}
                  onClick={() => setOpenFilterDropdown(!openFilterDropdown)}
                  className="flex items-center justify-center rounded-lg border-2 border-orange-400 bg-orange-500 hover:bg-purple-800 lg:p-2 p-1 text-center transition-all text-white font-medium shadow-lg hover:shadow-xl cursor-pointer"
                  type="button"
                  title="Filter topics"
                >
                  <IoIosOptions className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col min-h-0 mb-5 lg:h-[72vh] h-full relative">
        {/* 2x4 Grid of Topic Boxes */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto rounded-xl shadow-xl border border-gray-700 dark:bg-gray-900 bg-gray-200 mb-3 md:mb-0 w-full min-h-[50vh] h-auto lg:w-[35vw] lg:h-[72vh] relative z-0"
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
                      className="aspect-square bg-gray-300 dark:bg-gray-800 rounded-lg shadow-lg border border-black dark:border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer transform hover:-translate-y-0.5 flex items-center justify-center p-4 relative"
                      onClick={() => handleTopicClick(topic)}
                    >
                      {/* Simple seen/unseen indicator */}
                      {isUserSignedIn && (
                        <div className="absolute top-2 right-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              topic.is_seen ? "bg-gray-400" : "bg-green-500"
                            }`}
                            title={topic.is_seen ? "Seen" : "New"}
                          />
                        </div>
                      )}

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
                      {selectedPlace.place}
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
            topicType={topicType.table}
            onClose={() => setSelectedTopic(null)}
          />
        )}

        {/* Bottom accent */}
        <div className="h-0.5 bg-gradient-to-r from-fuchsia-500 to-emerald-700 animate-pulse rounded-b-lg mt-3"></div>
      </div>

      {/* Topic Type Dropdown - rendered outside scrollable area */}
      {openTypeDropdown && (
        <div
          className="fixed inset-0 z-100"
          onClick={() => setOpenTypeDropdown(false)}
        >
          <div
            className="absolute"
            style={{
              top: typeButtonRef.current
                ? typeButtonRef.current.getBoundingClientRect().bottom +
                  window.scrollY +
                  8
                : 0,
              right: typeButtonRef.current
                ? window.innerWidth -
                  typeButtonRef.current.getBoundingClientRect().right
                : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ul
              ref={typeDropdownRef}
              role="listbox"
              className="min-w-[160px] rounded-lg border-2 border-orange-200 bg-white p-2 shadow-xl z-100"
            >
              {TOPIC_TYPE_OPTIONS.map((item) => (
                <li
                  key={item.value}
                  onClick={() => {
                    updateTopicType(item);
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
          </div>
        </div>
      )}

      {/* Dropdown Filter - rendered outside scrollable area */}
      {openFilterDropdown && (
        <div
          className="fixed inset-0 z-100"
          onClick={() => setOpenFilterDropdown(false)}
        >
          <div
            className="absolute"
            style={{
              top: filterButtonRef.current
                ? filterButtonRef.current.getBoundingClientRect().bottom +
                  window.scrollY +
                  8
                : 0,
              right: filterButtonRef.current
                ? window.innerWidth -
                  filterButtonRef.current.getBoundingClientRect().right
                : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownFilter
              isOpen={openFilterDropdown}
              onClose={() => setOpenFilterDropdown(false)}
              dropdownRef={filterDropdownRef}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AiTopicScroller;
