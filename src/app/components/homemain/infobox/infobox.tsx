"use client";
import React, { useEffect, useState } from "react";

const Infobox = ({
  quote = "Winners don't blame the rim, wind or the court, they just win.",
  quoteAuthor = "Harvey",
  transportation = [
    "All metro routes are operational",
    "Diversions around key areas like Jawaharlal Nehru Stadium and INA Market.",
  ],
  markets = {
    equity: [
      "May be cautious sentiment",
      "Moderate trading activity",
      "IT and banking ✓",
    ],
    realEstate: ["Highest-ever sales figures", "Increased affordability"],
  },
  goodToKnow = [
    "Market volatility expected in tech sector this week",
    "New policy changes affecting small businesses",
    "Infrastructure development projects announced",
  ],
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mr-0 md:mr-2 mb-3 md:mb-0 w-full min-h-[60vh] h-auto md:w-[31vw] md:h-full bg-gray-900 rounded-lg shadow-lg border border-gray-700 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-t-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold text-white">Local</h1>
          <div className="text-white text-xs">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="p-3 md:h-[calc(100%-3rem)] flex flex-col min-h-[50vh] md:min-h-0">
        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3 flex-1 min-h-[35vh] md:min-h-0">
          {/* Quote Section */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-blue-500 transition-all duration-300 flex flex-col justify-between min-h-[16vh] md:min-h-0">
            <h2 className="text-sm font-bold text-white mb-2 flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
              Today's Quote
            </h2>
            <blockquote className="text-gray-300 text-xs leading-relaxed mb-2 italic">
              "{quote}"
            </blockquote>
            <cite className="text-gray-400 text-xs">— {quoteAuthor}</cite>
          </div>

          {/* Transportation */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-green-500 transition-all duration-300 flex flex-col justify-between min-h-[16vh] md:min-h-0">
            <h2 className="text-sm font-bold text-white mb-2 flex items-center">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>
              Transportation
            </h2>
            <div className="space-y-1">
              {transportation.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="w-1 h-1 bg-green-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <p className="text-gray-300 text-xs leading-tight">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Markets Section */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-yellow-500 transition-all duration-300 flex flex-col justify-between min-h-[16vh] md:min-h-0">
            <h2 className="text-sm font-bold text-white mb-2 flex items-center">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></span>
              Markets
            </h2>

            <div className="space-y-2">
              <div>
                <h3 className="text-xs font-semibold text-yellow-400 mb-1 italic">
                  Equity Outlook:—
                </h3>
                <div className="space-y-0.5">
                  {markets.equity.slice(0, 2).map((item, index) => (
                    <div key={index} className="flex items-start">
                      <span className="w-1 h-1 bg-yellow-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <p className="text-gray-300 text-xs leading-tight">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-yellow-400 mb-1 italic">
                  Real Estate
                </h3>
                <div className="space-y-0.5">
                  {markets.realEstate.slice(0, 1).map((item, index) => (
                    <div key={index} className="flex items-start">
                      <span className="w-1 h-1 bg-yellow-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <p className="text-gray-300 text-xs leading-tight">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Good to Know */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:border-purple-500 transition-all duration-300 flex flex-col justify-between min-h-[16vh] md:min-h-0">
            <h2 className="text-sm font-bold text-white mb-2 flex items-center">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
              Good to Know
            </h2>
            <div className="space-y-1">
              {goodToKnow.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="w-1 h-1 bg-purple-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  <p className="text-gray-300 text-xs leading-tight">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full Width Market Pulse */}
        <div className="mt-3 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-3 border border-blue-700">
          <div className="text-center mb-2">
            <h3 className="text-white font-bold text-sm">Market Pulse</h3>
            <p className="text-blue-200 text-xs">December 12, 2024</p>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-black bg-opacity-30 rounded-md p-2">
              <div className="text-lg font-bold text-white">23°C</div>
              <div className="text-xs text-gray-300">High</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-md p-2">
              <div className="text-lg font-bold text-white">12°C</div>
              <div className="text-xs text-gray-300">Low</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-md p-2">
              <div className="text-lg font-bold text-white">18°C</div>
              <div className="text-xs text-gray-300">Humidity</div>
            </div>
            <div className="bg-black bg-opacity-30 rounded-md p-2">
              <div className="text-lg font-bold text-white">35%</div>
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
