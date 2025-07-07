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
        className={`px-2 py-1 rounded-full text-xs font-bold bg-yellow-400 text-black shadow-sm border border-yellow-500 ${className}`}
        tabIndex={0}
      >
        {rating}
      </span>
    </Tooltip>
  );
};

export default NewsRating;
