import React, { useState, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import {
  MdNewReleases,
  MdViewList,
  MdSort,
  MdTrendingUp,
} from "react-icons/md";
import { useUserData } from "@/contexts";

interface DropdownFilterProps {
  isOpen: boolean;
  onClose: () => void;
  dropdownRef?: React.RefObject<HTMLDivElement | null>;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  isOpen,
  onClose,
  dropdownRef,
}) => {
  const { userPreference, updateUserPreference, isUserSignedIn } =
    useUserData();

  // Local state for temporary changes
  const [tempFreshContentFirst, setTempFreshContentFirst] = useState(
    userPreference.showFreshFirst
  );
  const [tempSortBy, setTempSortBy] = useState(userPreference.sortBy);

  // Update local state when userPreference changes or dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTempFreshContentFirst(userPreference.showFreshFirst);
      setTempSortBy(userPreference.sortBy);
    }
  }, [isOpen, userPreference]);

  const sortOptions = [
    { value: "last_news_at", label: "Latest News", icon: <MdNewReleases /> },
    { value: "created_at", label: "Recently Created", icon: <MdViewList /> },
    { value: "topic_score", label: "Topic Score", icon: <MdTrendingUp /> },
    { value: "ai_confidence", label: "AI Confidence", icon: <MdSort /> },
  ];

  const handleApply = () => {
    updateUserPreference({
      showFreshFirst: tempFreshContentFirst,
      sortBy: tempSortBy,
    });
    onClose();
  };

  const handleReset = () => {
    const defaultFreshContentFirst = isUserSignedIn;
    setTempFreshContentFirst(defaultFreshContentFirst);
    setTempSortBy("last_news_at");
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 rounded-lg border-2 border-orange-200 bg-white shadow-xl z-50 p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <MdSort className="text-orange-500" />
          Filter & Sort
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Fresh Content Toggle */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MdNewReleases
              className={`${
                isUserSignedIn ? "text-green-500" : "text-gray-400"
              }`}
            />
            <div>
              <p
                className={`font-medium ${
                  isUserSignedIn ? "text-gray-800" : "text-gray-500"
                }`}
              >
                Fresh Content First
              </p>
              <p className="text-xs text-gray-500">
                {isUserSignedIn
                  ? "Show unseen topics first, then seen ones"
                  : "Sign in to prioritize fresh content in your feed"}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if (isUserSignedIn) {
                setTempFreshContentFirst(!tempFreshContentFirst);
              }
            }}
            disabled={!isUserSignedIn}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              !isUserSignedIn
                ? "bg-gray-200 cursor-not-allowed opacity-50"
                : tempFreshContentFirst
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                tempFreshContentFirst ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Sort By Section */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
          <MdSort className="text-blue-500" />
          Sort By
        </h4>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setTempSortBy(option.value);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                tempSortBy === option.value
                  ? "bg-orange-100 border-2 border-orange-300 text-orange-800"
                  : "bg-gray-50 border-2 border-transparent text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              <span className="font-medium flex-1 text-left">
                {option.label}
              </span>
              {tempSortBy === option.value && (
                <IoCheckmark className="text-orange-600 text-lg" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-3 border-t border-gray-200">
        <button
          onClick={handleReset}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={handleApply}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default DropdownFilter;
