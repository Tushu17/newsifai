"use client";
import { fetchInfoData } from "@/helper/getinfoData";
import React, { useEffect, useState } from "react";

const Infobox = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [infoData, setInfoData] = useState({} as any);
  const [loading, setLoading] = useState(true);
  const placeList = [
    "india",
    "america",
    "europe",
    "south africa",
    "australia",
    "uae",
    "france",
    "africa",
    "china",
    "uk",
  ];

  useEffect(() => {
    fetchInfodata();
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchInfodata = async () => {
    setLoading(true);
    const { data, error } = await fetchInfoData("delhi");
    if (error) {
      console.error("Error fetching infodata:", error);
      setLoading(false);
    }
    if (data) {
      setInfoData(data && data[0]);
      console.log(data);
      setLoading(false);
      return data;
    }
  };

  if (loading) {
    return (
      <div className="mr-0 md:mr-2 mb-3 md:mb-0 w-full min-h-[60vh] h-auto md:w-[31vw] md:h-full bg-gray-900 rounded-lg shadow-lg border border-gray-700 text-gray-100">
        <div className="flex flex-col items-center max-w-xl gap-4 mt-20">
          <div className="animate-pulse rounded-full h-20 w-20 bg-gray-400 mb-4"></div>
          <div className="h-5 bg-gray-400 rounded w-1/2"></div>
          <div className="h-5 bg-gray-400 rounded w-1/2"></div>
          <div className="h-5 bg-gray-400 rounded w-1/2"></div>
          <div className="h-5 bg-gray-400 rounded w-1/2"></div>
          <div className="h-5 bg-gray-400 rounded w-1/2"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="mr-0 md:mr-2 mb-3 md:mb-0 w-full min-h-[60vh] h-auto md:w-[31vw] md:h-full dark:bg-gray-900 bg-gray-200 rounded-lg shadow-lg border border-gray-700 text-gray-950 dark:text-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-t-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold text-gray-200 ">
            <select
              // style="outline-style: auto; outline-width: 2px;"
              className="items-center w-25 h-10 mr-2 cursor-pointer hover:outline "
            >
              {placeList.map((item) => (
                <option
                  key={item}
                  value="eu"
                  className="items-center pb-1 px-1 w-auto h-auto"
                >
                  {item}
                </option>
              ))}
            </select>
            overview
          </h1>
          <div className="text-gray-200 text-xs">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="p-3 md:h-[calc(100%-3rem)] flex flex-col min-h-[50vh] md:min-h-0">
        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3 flex-1 min-h-[35vh] md:min-h-0">
          {/* Quote Section */}
          <div className="dark:bg-gray-800 bg-gray-300  rounded-lg p-3 border border-gray-700 hover:border-blue-500 transition-all duration-300 flex flex-col min-h-[16vh] md:min-h-0 overflow-scroll">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-200  text- mb-2 flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
              Today's Quote
            </h2>
            <blockquote className="text-gray-800 dark:text-gray-300 text-xs leading-relaxed mb-2 italic">
              "{infoData.quote}"
            </blockquote>
            <cite className="text-gray-600 text-xs">
              — {infoData.quote_author}
            </cite>
          </div>

          {/* Transportation */}
          <div className="dark:bg-gray-800 bg-gray-300 rounded-lg p-3 border border-gray-700 hover:border-green-500 transition-all duration-300 flex flex-col min-h-[16vh] md:min-h-0 overflow-scroll">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-200  mb-2 flex items-center">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
              Transportation
            </h2>
            <div className="space-y-1">
              {infoData.transportation.map((item: string, index: number) => (
                <div key={index} className="flex items-start">
                  <span className="w-1 h-1 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <p className="text-gray-800 dark:text-gray-300 text-xs leading-tight">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Markets Section */}
          <div className="dark:bg-gray-800 bg-gray-300 rounded-lg p-3 border border-gray-700 hover:border-yellow-500 transition-all duration-300 flex flex-col min-h-[16vh] md:min-h-0">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-200 mb-2 flex items-center">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
              Markets
            </h2>

            <div className="space-y-2 overflow-scroll">
              <div>
                <h3 className="text-xs font-semibold text-yellow-500 mb-1 italic">
                  Equity Outlook:—
                </h3>
                <div className="space-y-0.5">
                  {infoData.markets.equity
                    .slice(0, 2)
                    .map((item: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-yellow-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <p className="text-gray-800 dark:text-gray-300 text-xs leading-tight">
                          {item}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-yellow-500 mb-1 italic">
                  Real Estate
                </h3>
                <div className="space-y-0.5">
                  {infoData.markets.realEstate
                    .slice(0, 1)
                    .map((item: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <span className="w-1 h-1 bg-yellow-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        <p className="text-gray-800 dark:text-gray-300 text-xs leading-tight">
                          {item}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Good to Know */}
          <div className="dark:bg-gray-800 bg-gray-300 rounded-lg p-3 border border-gray-700 hover:border-purple-500 transition-all duration-300 flex flex-col min-h-[16vh] md:min-h-0">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-200  mb-2 flex items-center">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
              Good to Know
            </h2>
            <div className="space-y-1">
              {infoData.good_to_know
                .slice(0, 3)
                .map((item: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <span className="w-1 h-1 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <p className="text-gray-800 dark:text-gray-300 text-xs leading-tight">
                      {item}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Full Width Market Pulse */}
        <div className="mt-3 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-3 border border-blue-700">
          <div className="text-center mb-2">
            <h3 className="text-white font-bold text-sm">Market Pulse</h3>
            <p className="text-blue-200 text-xs">
              {infoData.market_pulse.date}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-black bg-opacity-30 rounded-md p-2">
              <div className="text-lg font-bold text-white">
                {infoData.market_pulse.highTemp}
              </div>
              <div className="text-xs text-gray-300">High</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-md p-2">
              <div className="text-lg font-bold text-white">
                {infoData.market_pulse.lowTemp}
              </div>
              <div className="text-xs text-gray-300">Low</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-md p-2">
              <div className="text-lg font-bold text-white">
                {infoData.market_pulse.humidity}
              </div>
              <div className="text-xs text-gray-300">Humidity</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-md p-2">
              <div className="text-lg font-bold text-white">
                {infoData.market_pulse.wind.trim()}
              </div>
              <div className="text-xs text-gray-300">Wind</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated bottom accent */}
      <div className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse rounded-b-lg"></div>
    </div>
  );
};

export default Infobox;
