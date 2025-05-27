import React from "react";
type Category =
  | "Markets"
  | "Politics"
  | "Environment"
  | "Technology"
  | "Economy"
  | "Healthcare";

// Define the NewsItem interface
interface NewsItem {
  id: number;
  headline: string;
  summary: string;
  category: Category;
  time: string;
}

// Define the props interface
interface ScrollerProps {
  title?: string;
  newsItems?: NewsItem[];
}

const Scroller = ({
  title = "Global",
  newsItems = [
    {
      id: 1,
      headline: "Market Rally Continues as Tech Stocks Surge",
      summary:
        "Major technology companies posted strong quarterly earnings, driving market optimism and investor confidence to new heights.",
      category: "Markets",
      time: "2h ago",
    },
    {
      id: 2,
      headline: "New Infrastructure Bill Passes Senate Vote",
      summary:
        "Bipartisan legislation allocating $2.1 trillion for nationwide infrastructure improvements receives overwhelming support.",
      category: "Politics",
      time: "4h ago",
    },
    {
      id: 3,
      headline: "Climate Summit Reaches Historic Agreement",
      summary:
        "World leaders commit to ambitious carbon reduction targets with concrete implementation timelines and funding mechanisms.",
      category: "Environment",
      time: "6h ago",
    },
    {
      id: 4,
      headline: "Breakthrough in Quantum Computing Research",
      summary:
        "Scientists achieve stable quantum processing at room temperature, potentially revolutionizing computing technology.",
      category: "Technology",
      time: "8h ago",
    },
    {
      id: 5,
      headline: "Global Trade Relations Show Signs of Recovery",
      summary:
        "International commerce rebounds strongly following diplomatic breakthroughs and reduced trade barriers between major economies.",
      category: "Economy",
      time: "10h ago",
    },
    {
      id: 6,
      headline: "Healthcare Innovation Receives Major Funding",
      summary:
        "Medical research institutions secure unprecedented investment for next-generation treatment development and accessibility programs.",
      category: "Healthcare",
      time: "12h ago",
    },
  ],
}) => {
  const getCategoryColor = (category: Category): string => {
    const colors = {
      Markets: "bg-green-500",
      Politics: "bg-blue-500",
      Environment: "bg-emerald-500",
      Technology: "bg-purple-500",
      Economy: "bg-yellow-500",
      Healthcare: "bg-red-500",
      default: "bg-gray-500",
    };
    return colors[category] || colors.default;
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 mb-5">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-lg font-bold text-gray-950 dark:text-gray-200 hover:text-orange-500 transition-colors duration-300 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></span>
          {title}
        </h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto rounded-xl shadow-xl border border-gray-700 min-h-0 dark:bg-gray-900 bg-gray-200">
        <div className="p-4 space-y-3">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="group dark:bg-gray-800  bg-gray-200 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer transform hover:-translate-y-0.5"
            >
              {/* Category and Time */}
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium text-gray-900 dark:text-gray-200 ${getCategoryColor(
                    item.category as Category
                  )}`}
                >
                  {item.category}
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
                <span className="text-xs text-blue-400 font-medium">
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
