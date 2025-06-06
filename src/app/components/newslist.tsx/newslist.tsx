// app/components/NewsList.tsx

import React from "react";

const NewsList = () => {
  return (
    <div className="flex-1 overflow-y-auto rounded-xl shadow-xl border border-gray-700 min-h-0 dark:bg-gray-900 bg-gray-200">
      <div className="p-4 space-y-3">
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            No news items available
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsList;
