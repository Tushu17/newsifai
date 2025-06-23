"use client";
import React, { useEffect, useState } from "react";
import Infobox from "../infobox/infobox";
import Categorybox from "../../ui/categorybox/categorybox";
import Scroller from "../feedbox/scroller/scroller";

const Homefeed = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedPlace") || "Delhi";
    }
    return "Delhi";
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedPlace = localStorage.getItem("selectedPlace");
      if (storedPlace && storedPlace !== selectedPlace) {
        setSelectedPlace(storedPlace);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [selectedPlace]);

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };
  return (
    <div
      className={`max-w-screen-xl mx-auto px-1 lg:py-5 lg:px-2 h-screen overflow-scroll ${
        isFocused && "overflow-scroll"
      }`}
    >
      <div className="flex flex-col lg:flex-row">
        <span>
          <div className=" lg:mr-3 lg:h-[82vh] h-full mt-3 ">
            <div className="mb-1">
              <div className="flex items-center">
                <span className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></span>
                <h2 className="text-lg font-bold text-gray-950 dark:text-gray-200">
                  Info for the day in {selectedPlace}
                </h2>
              </div>
            </div>
            <Infobox selectedPlace={selectedPlace} />
          </div>
        </span>
        <span>
          <div
            className="flex flex-col sm:flex-col lg:h-[82vh] h-full md:mr-4 mt-3"
            onMouseEnter={handleFocus}
            onMouseLeave={handleFocus}
          >
            <div className="mb-1">
              <div className="flex items-center">
                <span className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></span>
                <h2 className="text-lg font-bold text-gray-950 dark:text-gray-200">
                  Important News
                </h2>
              </div>
            </div>
            <Scroller />
          </div>
        </span>
        <span>
          <div className=" lg:mr-3 my-2">
            <div className="mb-1">
              <div className="flex items-center">
                <span className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></span>
                <h2 className="text-lg font-bold text-gray-950 dark:text-gray-200">
                  Read by flag
                </h2>
              </div>
            </div>
            <Categorybox />
          </div>
        </span>
      </div>
    </div>
  );
};

export default Homefeed;
