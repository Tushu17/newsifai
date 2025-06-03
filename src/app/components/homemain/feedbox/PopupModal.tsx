"use client";
import React from "react";

interface NewsItem {
  id: number;
  headline: string;
  summary: string;
  tags: string[];
  time: string;
}

interface PopupModalProps {
  newsItem: NewsItem | null;
  onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ newsItem, onClose }) => {
  if (!newsItem) return null;

  // Close modal if clicking on overlay background
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          &#x2715;
        </button>

        {/* Headline */}
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {newsItem.headline}
        </h2>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {newsItem.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 rounded-full bg-blue-500 text-white text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Time */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {newsItem.time}
        </p>

        {/* Summary */}
        <p className="text-gray-800 dark:text-gray-300 whitespace-pre-line">
          {newsItem.summary}
        </p>
      </div>
    </div>
  );
};

export default PopupModal;
