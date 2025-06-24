"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Categorybox = () => {
  const router = useRouter();

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
  ];

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      politics: "border-blue-500 hover:border-blue-600",
      environment: "border-emerald-500 hover:border-emerald-600",
      technology: "border-purple-500 hover:border-purple-600",
      economy: "border-yellow-500 hover:border-yellow-600",
      healthcare: "border-red-500 hover:border-red-600",
      growth: "border-green-500 hover:border-green-600",
      education: "border-indigo-500 hover:border-indigo-600",
      sports: "border-orange-500 hover:border-orange-600",
      entertainment: "border-pink-500 hover:border-pink-600",
      global: "border-rose-500 hover:border-rose-600",
    };

    return (
      colors[category.toLowerCase()] || "border-gray-500 hover:border-gray-600"
    );
  };

  const getCategoryTextColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      politics: "text-blue-500 group-hover:text-blue-600",
      environment: "text-emerald-500 group-hover:text-emerald-600",
      technology: "text-purple-500 group-hover:text-purple-600",
      economy: "text-yellow-500 group-hover:text-yellow-600",
      healthcare: "text-red-500 group-hover:text-red-600",
      growth: "text-green-500 group-hover:text-green-600",
      education: "text-indigo-500 group-hover:text-indigo-600",
      sports: "text-orange-500 group-hover:text-orange-600",
      entertainment: "text-pink-500 group-hover:text-pink-600",
      global: "text-rose-500 group-hover:text-rose-600",
    };

    return (
      colors[category.toLowerCase()] ||
      "text-gray-500 group-hover:text-gray-600"
    );
  };

  const handleCategoryClick = (category: string) => {
    const slug = category.toLowerCase();
    router.push(`/news/${slug}`);
  };

  return (
    <>
      <div className="w-full h-auto   text-gray-950 dark:text-gray-200 lg:w-[60%]">
        {/* Header */}
        {/* <div className="mb-1">
          <div className="flex items-center">
            <span className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></span>
            <h2 className="text-lg font-bold text-gray-950 dark:text-gray-200">
              Read by flair
            </h2>
          </div>
        </div> */}

        {/* Categories Grid */}
        <div className="p-2 overflow-scroll rounded-xl shadow-lg border border-gray-700 lg:w-[20vw] bg-gray-200 dark:bg-gray-900">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categoryList.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer group relative overflow-hidden rounded-lg py-2 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gray-300 dark:bg-gray-800 border-2 ${getCategoryColor(
                  category
                )}`}
              >
                <div className="relative z-10">
                  <h3
                    className={`text-xs font-semibold capitalize ${getCategoryTextColor(
                      category
                    )}`}
                  >
                    {category}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom accent */}
      </div>
      <div className="h-0.5 bg-gradient-to-r from-emerald-500 to-red-500 rounded-b-lg mb-4"></div>
    </>
  );
};

export default Categorybox;
