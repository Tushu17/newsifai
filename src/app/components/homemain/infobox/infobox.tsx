"use client";
import { fetchInfoData } from "@/helper/getinfoData";
import React, { useCallback, useEffect, useState } from "react";
import { InfoData } from "@/models/infodata";
interface InfoboxProps {
  selectedPlace: string;
}
const Infobox: React.FC<InfoboxProps> = ({ selectedPlace }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [infoData, setInfoData] = useState<InfoData | undefined>();
  const [loading, setLoading] = useState(true);

  const fetchInfodata = useCallback(async (place: string) => {
    setLoading(true);

    const { data, error } = await fetchInfoData(place);
    if (error) {
      console.error("Error fetching infodata:", error);
    }
    if (data) {
      setInfoData(data && data[0]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchInfodata(selectedPlace);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [fetchInfodata, selectedPlace]);

  if (loading) {
    return (
      <div className="mr-0 lg:mr-2 mb-3 lg:mb-0 w-[80vw] min-h-[70vh] h-auto lg:w-[31vw] lg:h-full bg-gray-200 rounded-lg shadow-lg border border-gray-700 text-gray-100 dark:bg-gray-900 dark:text-gray-200">
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

  if (!infoData) {
    return (
      <div className="mr-0 lg:mr-2 mb-3 lg:mb-0 w-full min-h-[50vh] h-auto lg:w-[31vw] lg:h-full dark:bg-gray-900 bg-gray-200 rounded-lg shadow-lg border border-gray-700 text-gray-950 dark:text-gray-200">
        <div className="p-4 text-center text-gray-950 dark:text-gray-200">
          No data available for {selectedPlace}.
        </div>
      </div>
    );
  }

  return (
    <div className="mr-0 lg:mr-2 mb-3 md:mb-0 w-full min-h-[50vh] h-auto lg:w-[31vw] lg:h-[77vh] ">
      {/* <div className="mb-1">
        <div className="flex items-center">
          <span className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></span>
          <h2 className="text-lg font-bold text-gray-950 dark:text-gray-200">
            Info for the day in {selectedPlace}
          </h2>
        </div>
      </div> */}
      <div className="p-1.5 lg:h-[calc(100%-3rem)] flex flex-col min-h-[50vh] lg:min-h-0 dark:bg-gray-900 bg-gray-200 rounded-lg shadow-lg border border-gray-700 text-gray-950 dark:text-gray-200">
        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3 flex-1 min-h-[35vh] lg:min-h-0">
          {/* Quote Section */}
          <div className="dark:bg-gray-800 bg-gray-300 rounded-lg p-1.5 border border-gray-700 hover:border-blue-500 transition-all duration-300 flex flex-col min-h-[16vh] lg:min-h-0 overflow-scroll">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-200 mb-2 flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
              Quote for today
            </h2>
            <blockquote className="text-gray-800 dark:text-gray-300 text-xs leading-relaxed mb-2 italic">
              “{infoData?.quote}“
            </blockquote>
            <cite className="text-gray-600 text-xs">
              — {infoData?.quote_author}
            </cite>
          </div>

          {/* Transportation */}
          <div className="dark:bg-gray-800 bg-gray-300 rounded-lg p-1.5 border border-gray-700 hover:border-green-500 transition-all duration-300 flex flex-col min-h-[16vh] lg:min-h-0 overflow-scroll">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-200 mb-2 flex items-center">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
              Transportation
            </h2>
            <div className="space-y-1">
              {infoData?.transportation?.map((item: string, index: number) => (
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
          <div className="dark:bg-gray-800 bg-gray-300 rounded-lg p-1.5 border border-gray-700 hover:border-yellow-500 transition-all duration-300 flex flex-col min-h-[16vh] lg:min-h-0">
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
                  {infoData?.markets?.equity
                    ?.slice(0, 2)
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
                  {infoData?.markets?.realEstate
                    ?.slice(0, 1)
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
          <div className="dark:bg-gray-800 bg-gray-300 rounded-lg p-1.5 border border-gray-700 hover:border-purple-500 transition-all duration-300 flex flex-col min-h-[16vh] lg:min-h-0">
            <h2 className="text-sm font-bold text-gray-900 dark:text-gray-200 mb-2 flex items-center">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
              Good to Know
            </h2>
            <div className="space-y-1">
              {infoData?.good_to_know
                ?.slice(0, 3)
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
        <div className="mt-2 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-2 border border-blue-700">
          <div className="flex items-center justify-center mb-2">
            <h3 className="text-white font-bold text-sm">Market Pulse</h3>
            <p className="pl-2 text-blue-200 text-xs">
              {currentTime.toLocaleDateString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                year: "numeric",
                month: "short",
                day: "numeric",
              }) || "Unknown time"}
            </p>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-black bg-opacity-30 rounded-md p-1.5">
              <div className="text-base font-bold text-white">
                {infoData?.market_pulse?.highTemp}
              </div>
              <div className="text-xs text-gray-300">High</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-md p-1.5">
              <div className="text-base font-bold text-white">
                {infoData?.market_pulse?.lowTemp}
              </div>
              <div className="text-xs text-gray-300">Low</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-md p-1.5">
              <div className="text-base font-bold text-white">
                {infoData?.market_pulse?.humidity}
              </div>
              <div className="text-xs text-gray-300">Humidity</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-md p-1.5">
              <div className="text-base font-bold text-white">
                {infoData?.market_pulse?.wind?.trim()}
              </div>
              <div className="text-xs text-gray-300">Wind</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated bottom accent */}
      <div className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse rounded-b-lg mt-3"></div>
    </div>
  );
};

export default Infobox;
