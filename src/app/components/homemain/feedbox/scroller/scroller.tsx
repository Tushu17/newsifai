import { fetchNewsItems } from "@/helper/getData";
import React, { useEffect, useState } from "react";
import PopupModal from "../PopupModal";
// Define the NewsItem interface
interface NewsItem {
  id: number;
  headline: string;
  summary: string;
  tags: string;
  time: string;
}

// Define the props interface
interface ScrollerProps {
  title?: string;
  newsItems?: NewsItem[];
}

const Scroller = ({ title }: ScrollerProps) => {
  const [newsItems, setNewsItems] = useState([] as any[]);
  const [loading, setLoading] = useState(false);
  const [popUpOpen, setpopUpOpen] = useState(false);
  const [queryTag, setQueryTag] = useState(null as any);
  const categoryList = [
    "Global",
    "politics",
    "environment",
    "technology",
    "economy",
    "healthcare",
    "growth",
    "education",
    "sports",
    "entertainment",
  ];

  const getTagColor = (tags: string[]): string => {
    const colors: { [key: string]: string } = {
      markets: "bg-green-500",
      politics: "bg-blue-500",
      environment: "bg-emerald-500",
      technology: "bg-purple-500",
      economy: "bg-yellow-500",
      healthcare: "bg-red-500",
      default: "bg-gray-500",
    };

    // Find the first tag that matches a color key
    const matchingTag = tags.find((tag) => colors.hasOwnProperty(tag));
    // If found, return its color; otherwise, return default
    return matchingTag ? colors[matchingTag] : colors.default;
  };

  useEffect(() => {
    setpopUpOpen(false);
    fetchNews();
  }, [queryTag]);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await fetchNewsItems(queryTag);

    if (error) {
      setLoading(false);
      console.error("Failed to fetch news items:", error);
      return;
    }

    if (data) {
      setNewsItems(data);
      setLoading(false);
    }
  };

  //need to setup the openPopUp
  const handleOpenPopUp = (item: NewsItem) => {
    setpopUpOpen(true);
    console.log(item);
  };

  if (loading) {
    return (
      <div className=" w-[20vw] flex-1 overflow-y-auto rounded-xl shadow-xl border border-gray-700 min-h-0 dark:bg-gray-900 bg-gray-200">
        <div className="flex w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg animate-pulse dark:bg-gray-800 m-3">
          <div className="w-1/3 bg-gray-300 dark:bg-gray-600"></div>

          <div className="w-2/3 p-4 md:p-4">
            <h1 className="w-40 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

            <p className="w-48 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>

            <div className="flex mt-4 item-center gap-x-2 my-3">
              <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
              <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>

            <div className="flex justify-between mt-6 item-center">
              <h1 className="w-10 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

              <div className="h-4 bg-gray-200 rounded-lg w-28 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 mb-5">
      {/* Header */}
      <div className="mb-1">
        <h2 className="text-lg font-bold text-gray-950 dark:text-gray-200 flex items-center">
          <span className="ml-2 w-1 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3">
            <select
              value={queryTag}
              id="selectNews"
              //  style="outline-style: auto; outline-width: 2px;"
              className="ml-1.5 items-center w-auto h-13 cursor-pointer hover:text-orange-500 transition-colors duration-300  "
              onChange={(e) => {
                setQueryTag(
                  e.target.value === "Global" ? null : e.target.value
                );
              }}
            >
              {categoryList.map((item) => (
                <option
                  value={item}
                  className="items-center w-auto h-auto"
                  key={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </span>
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto rounded-xl shadow-xl border border-gray-700 min-h-0 dark:bg-gray-900 bg-gray-200">
        <div className="p-4 space-y-3">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="group  dark:bg-gray-800 bg-gray-300 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer transform hover:-translate-y-0.5"
            >
              {/* Category and Time */}
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium text-gray-200 dark:text-gray-200 ${getTagColor(
                    item.tags
                  )}`}
                >
                  {item.tags[0] || "General"}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {item.time}
                </span>
              </div>

              {/* Headline */}
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-200  mb-2 group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                {item.headline}
              </h3>

              {/* Summary */}
              <p className="text-xs text-gray-800 dark:text-gray-300 leading-relaxed line-clamp-2">
                {item.summary}
              </p>

              {/* Read More Indicator */}
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span
                  className="text-xs text-blue-400 font-medium"
                  onClick={() => handleOpenPopUp(item)}
                >
                  Read more →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scroller;
