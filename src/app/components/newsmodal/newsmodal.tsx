import React, { useEffect } from "react";
import { NewsItem } from "@/models/data";
import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import NewsRating from "@/app/components/ui/newsrating/newsrating";

interface NewsModalProps {
  news: NewsItem;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ news, onClose }) => {
  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      onClose();
    };

    // Push a new state when modal opens
    window.history.pushState({ modal: "news" }, "", window.location.pathname);

    // Listen for popstate (back button)
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onClose]);
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
  return (
    <div className="fixed inset-0 bg-gray-100/10 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <Image
            src={news.image_url || "/placeholder-news.jpg"}
            alt={news.headline}
            className="w-full h-64 object-cover"
            width={1000}
            height={1000}
          />
          <div className="absolute top-4 left-4">
            <div className="relative">
              <div className="absolute top-3 left-3 z-10">
                <NewsRating rating={news.news_rating} className="z-10" />
              </div>

              {/* Stamp effect shadow */}
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 cursor-pointer"
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
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              {Array.isArray(news.tags)
                ? news.tags[0]
                : news.tags?.split(",")[0] || "General"}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-4">
              {news.time}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {news.headline}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {news.content}
          </p>
          <div className="flex justify-end">
            <a
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              <span className="flex items-center">
                {news.source}
                <FiExternalLink className="ml-2" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
