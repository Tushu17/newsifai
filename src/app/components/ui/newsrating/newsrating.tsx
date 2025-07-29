import React from "react";
import Tooltip from "@/app/components/ui/tooltip/tooltip";

interface NewsRatingProps {
  rating: string | number;
  className?: string;
  tooltipText?: string;
}

const defaultTooltip =
  "This rating reflects how important the news is, as judged by AI. It’s still in trial, so some less important stories might get rated higher than expected or vice-versa.";

const NewsRating: React.FC<NewsRatingProps> = ({
  rating,
  className = "",
  tooltipText,
}) => {
  if (!rating) return null;

  // Responsive: hover on large screens, click on small screens
  // We'll use CSS to show tooltip on hover for md+ screens, and always show on click for small screens
  // Tooltip component already supports click-to-show, so we just need to add hover for large screens

  return (
    <Tooltip content={tooltipText || defaultTooltip}>
      <span
        className={`px-2.5 py-1.5 rounded-full text-sm font-extrabold bg-yellow-400 text-black border-2 border-yellow-600 shadow-lg shadow-yellow-200/60 ring-2 ring-yellow-300/60 flex items-center gap-1 ${className}`}
        style={{ letterSpacing: "0.03em" }}
        tabIndex={0}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-yellow-600 mr-1"
          aria-hidden="true"
        >
          <circle
            cx="10"
            cy="10"
            r="8"
            fill="#fde047"
            stroke="#facc15"
            strokeWidth="2"
          />
          <text
            x="10"
            y="15"
            textAnchor="middle"
            fontSize="10"
            fontWeight="bold"
            fill="#b45309"
          >
            AI
          </text>
        </svg>
        {rating}
      </span>
    </Tooltip>
  );
};

export default NewsRating;
