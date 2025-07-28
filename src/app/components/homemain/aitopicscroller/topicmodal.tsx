import { AiNewsTopic } from "@/models/topicdata";
import { NewsItem } from "@/models/data";
import React, { useEffect, useState } from "react";
import { fetchNewsItemsByIds } from "@/helper/getData";

interface TopicModalProps {
  topic: AiNewsTopic;
  onClose: () => void;
}

const TopicModal: React.FC<TopicModalProps> = ({ topic, onClose }) => {
  // Disable body scrolling when modal is open
  useEffect(() => {
    // Store original overflow style
    const originalOverflow = document.body.style.overflow;

    // Disable scrolling
    document.body.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when modal closes
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      onClose();
    };

    // Push a new state when modal opens
    window.history.pushState({ modal: "topic" }, "", window.location.pathname);

    // Listen for popstate (back button)
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onClose]);

  // Close modal if clicking on overlay background
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Fetch related news items
  const [relatedNews, setRelatedNews] = useState<NewsItem[] | null>(null);
  const [relatedNewsLoading, setRelatedNewsLoading] = useState(false);

  useEffect(() => {
    const fetchRelated = async () => {
      if (
        topic.ai_topic_related_news_ids &&
        topic.ai_topic_related_news_ids.length > 0
      ) {
        setRelatedNewsLoading(true);
        const { data, error } = await fetchNewsItemsByIds(
          topic.ai_topic_related_news_ids
        );
        if (!error) {
          setRelatedNews(data || []);
        } else {
          setRelatedNews([]);
        }
        setRelatedNewsLoading(false);
      } else {
        setRelatedNews([]);
      }
    };
    fetchRelated();
  }, [topic.ai_topic_related_news_ids]);

  // Helper to get news item by ID
  const getNewsById = (id: number) => {
    return relatedNews?.find((item) => item.id === id);
  };

  return (
    <div
      className="fixed inset-0 rounded-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 flex justify-center items-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-300 dark:bg-gray-900 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] relative flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors z-10 cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6 flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {topic.ai_topic_heading}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                {topic.region || "Global"}
              </span>
              <span>
                Confidence:{" "}
                {topic.ai_confidence
                  ? (topic.ai_confidence * 100).toFixed(0)
                  : "N/A"}
                %
              </span>
              <span>
                Last News from:{" "}
                {topic.last_news_at || topic.updated_at
                  ? new Date(
                      topic.last_news_at || topic.updated_at!
                    ).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>

          {/* Short Summary */}
          {topic.ai_topic_short_summary && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Summary
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {topic.ai_topic_short_summary}
              </p>
            </div>
          )}

          {/* Long Summary with Date-wise Breakdown */}
          {topic.ai_topic_long_summary_json &&
            topic.ai_topic_long_summary_json.length > 0 && (
              <div className="mb-6 flex-1 flex flex-col min-h-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex-shrink-0">
                  Detailed Timeline
                </h3>
                <div
                  className="space-y-4 overflow-y-auto flex-1 pr-2"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#ff6900 #e5e7eb",
                  }}
                >
                  {topic.ai_topic_long_summary_json.map((dateEntry, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-blue-500 pl-4"
                    >
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {new Date(dateEntry.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h4>
                      <ul className="space-y-2">
                        {dateEntry.bullets.map((bullet, bulletIndex) => {
                          let newsContent = null;
                          if (relatedNewsLoading) {
                            newsContent = (
                              <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                Loading...
                              </span>
                            );
                          } else {
                            const news = getNewsById(bullet.news_id);
                            if (news) {
                              newsContent = news.url ? (
                                <a
                                  href={news.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 dark:text-blue-300 underline ml-1"
                                >
                                  {news.source || "News Source"}
                                </a>
                              ) : (
                                <span className="text-xs text-gray-500 dark:text-gray-500 mt-1 ml-1">
                                  Link not available
                                </span>
                              );
                            } else {
                              newsContent = (
                                <span className="text-xs text-gray-500 dark:text-gray-500 mt-1 ml-1">
                                  Link not available
                                </span>
                              );
                            }
                          }
                          return (
                            <li key={bulletIndex} className="flex items-start">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              <div className="flex-1">
                                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                  {bullet.text}
                                </p>
                                <span className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                  Source: {newsContent}
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Created:{" "}
              {topic.created_at
                ? new Date(topic.created_at).toLocaleDateString()
                : "N/A"}
            </div>
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicModal;
