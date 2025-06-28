"use client";
import React, { useEffect, useState } from "react";
// import Infobox from "../infobox/infobox";
import Categorybox from "../../ui/categorybox/categorybox";
import Scroller from "../feedbox/scroller/scroller";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import AiTopicScroller from "../aitopicscroller/aitopicscroller";

// Define the interface for place data
interface PlaceData {
  id: number;
  place: string;
  region?: string;
  country?: string;
  // Allow for additional fields
}

const Homefeed = () => {
  const [isOpen, setIsOpen] = useState<"infobox" | "scroller" | "categorybox">(
    "infobox"
  );
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const [selectedPlaceData, setSelectedPlaceData] = useState<PlaceData>(() => {
    if (typeof window !== "undefined") {
      const storedPlaceData = localStorage.getItem("selectedPlaceData");
      if (storedPlaceData) {
        try {
          return JSON.parse(storedPlaceData);
        } catch (error) {
          console.error("Error parsing stored place data:", error);
        }
      }

      // Default fallback
      return {
        id: 1,
        place: "Delhi",
        region: "Asia",
        country: "India",
      };
    }
    return {
      id: 1,
      place: "Delhi",
      region: "Asia",
      country: "India",
    };
  });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 770);
    };

    // Check initial screen size
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedPlaceData = localStorage.getItem("selectedPlaceData");
      if (storedPlaceData) {
        try {
          const parsedData = JSON.parse(storedPlaceData);
          if (parsedData.place !== selectedPlaceData.place) {
            setSelectedPlaceData(parsedData);
          }
        } catch (error) {
          console.error("Error parsing stored place data:", error);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [selectedPlaceData.place]);

  const toggleModal = (modal: string) => {
    setIsOpen(modal as "infobox" | "scroller" | "categorybox");
  };

  return (
    <div
      className={`max-w-screen-xl mx-auto px-1 lg:py-5 lg:px-2 h-full overflow-scroll`}
    >
      <div className="flex flex-col lg:flex-row justify-around">
        {/* Infobox Section */}
        <span>
          <div className="lg:mr-3 lg:h-[82vh] h-full mt-3">
            <div className="mb-4">
              <div className="p-4 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60">
                <div className="flex items-center">
                  <div className="mr-4">
                    <span className="block w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Info for the day in {selectedPlaceData.place}
                    </h2>

                    {/* Simple toggle buttons */}
                    {isSmallScreen && (
                      <>
                        {isOpen !== "infobox" ? (
                          <button
                            className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 active:scale-95 transition-transform duration-100"
                            onClick={() => toggleModal("infobox")}
                          >
                            <FaChevronCircleDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                        ) : (
                          <button
                            className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 active:scale-95 transition-transform duration-100"
                            onClick={() => toggleModal("scroller")}
                          >
                            <FaChevronCircleUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Show component on large screens OR when selected on small screens */}
            {(!isSmallScreen || isOpen === "infobox") && (
              // <Infobox selectedPlace={selectedPlaceData.place} />
              <AiTopicScroller />
            )}
          </div>
        </span>

        {/* Scroller Section */}
        <span>
          <div className="lg:mr-3 lg:h-[82vh] h-full mt-3">
            <div className="mb-4">
              <div className="p-4 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60">
                <div className="flex items-center">
                  <div className="mr-4">
                    <span className="block w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
                  </div>

                  <div className="flex items-center justify-between w-full">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Read by yourself
                    </h2>

                    {isSmallScreen && (
                      <>
                        {isOpen !== "scroller" ? (
                          <button
                            className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 active:scale-95 transition-transform duration-100"
                            onClick={() => toggleModal("scroller")}
                          >
                            <FaChevronCircleDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                        ) : (
                          <button
                            className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 active:scale-95 transition-transform duration-100"
                            onClick={() => toggleModal("categorybox")}
                          >
                            <FaChevronCircleUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Show component on large screens OR when selected on small screens */}
            {(!isSmallScreen || isOpen === "scroller") && <Scroller />}
          </div>
        </span>

        {/* Categorybox Section */}
        <span>
          <div className="lg:mr-3 my-3">
            <div className="mb-4">
              <div className="p-4 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60">
                <div className="flex items-center">
                  {/* Clean accent bar */}
                  <div className="mr-4">
                    <span className="block w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></span>
                  </div>

                  <div className="flex items-center justify-between w-full">
                    {/* Clean typography */}
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Read by flag
                    </h2>

                    {/* Simple toggle buttons */}
                    {isSmallScreen && (
                      <>
                        {isOpen !== "categorybox" ? (
                          <button
                            className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 active:scale-95 transition-transform duration-100"
                            onClick={() => toggleModal("categorybox")}
                          >
                            <FaChevronCircleDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                        ) : (
                          <button
                            className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 active:scale-95 transition-transform duration-100"
                            onClick={() => toggleModal("infobox")}
                          >
                            <FaChevronCircleUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Show component on large screens OR when selected on small screens */}
            {(!isSmallScreen || isOpen === "categorybox") && <Categorybox />}
          </div>
        </span>
      </div>
    </div>
  );
};

export default Homefeed;
