"use client";
import React, { useEffect, useState } from "react";
import Categorybox from "../categorybox/categorybox";
import Scroller from "../scroller/scroller";
import AiTopicScroller from "../aitopicscroller/aitopicscroller";
import { FiHome } from "react-icons/fi";
import { MdOutlineExplore } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
// this component work as a nesting for all three other components
// it is used to handle the small screen layout and the large screen layout
// it is also used to handle the storage of the selected place data
// it is also used to handle the switching of the active menu

// Floating Capsule Menu for small screens
const menuItems = [
  { key: "infobox", icon: <FiHome />, label: "Home" },
  { key: "scroller", icon: <MdOutlineExplore />, label: "Feed" },
  { key: "categorybox", icon: <TbCategoryPlus />, label: "Categories" },
];

const FloatingCapsuleMenu = ({
  active,
  onSwitch,
}: {
  active: string;
  onSwitch: (key: string) => void;
}) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
    <div className="flex items-center bg-orange-400 border-4 border-gray-700 rounded-full shadow-2xl px-4 py-2 space-x-4">
      {menuItems.map((item) => (
        <button
          key={item.key}
          onClick={() => onSwitch(item.key)}
          className={`flex flex-col items-center justify-center text-2xl transition-all duration-200 ${
            active === item.key
              ? "text-gray-900 bg-orange-200 shadow-md"
              : "text-gray-700 bg-transparent"
          } rounded-full p-2 hover:bg-orange-300`}
          aria-label={item.label}
        >
          {item.icon}
        </button>
      ))}
    </div>
  </div>
);

// Define the type for userData
interface UserData {
  selectedPlaceData: {
    id: number;
    place: string;
    region: string;
  };
}

const Homefeed = () => {
  const [activeMenu, setActiveMenu] = useState<string>("infobox");
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  // this is to scroll component to top when a small screen user swithces between component
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activeMenu]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        try {
          setUserData(JSON.parse(storedUserData));
        } catch (error) {
          console.log(error);
        }
      }
      // this data is solely stored for the first time users when there is userData is undefined or localstorage has no saved data
      if (!storedUserData) {
        setUserData({
          selectedPlaceData: {
            id: 1,
            place: "Delhi",
            region: "India",
          },
        });
      }
    }
  }, []);

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
    if (isSmallScreen) {
    }
  }, [isSmallScreen]);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUserData = localStorage.getItem("userData");

      if (storedUserData) {
        try {
          setUserData(JSON.parse(storedUserData));
        } catch (error) {
          console.error("Error parsing stored user data:", error);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // this is to show for loading face
  if (!userData || !userData.selectedPlaceData) {
    return (
      <div className="min-h-screen bg-gray-200 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          {/* Logo with pulse animation */}
          <div className="relative">
            <img
              src="/logo.png"
              alt="Newsifai"
              className="w-20 h-20 animate-pulse"
            />
            {/* Optional: Add a subtle glow effect */}
            <div className="absolute inset-0 w-20 h-20 bg-blue-500/20 rounded-full animate-ping"></div>
          </div>

          {/* Loading text (optional) */}
          <div className="mt-6 text-gray-600 dark:text-gray-400 text-sm font-medium">
            Loading...
          </div>

          {/* Loading dots animation */}
          <div className="flex space-x-1 mt-2">
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
  // Remove top-level loading state; always render children and let them handle loading

  // Only show one main component at a time on small screens
  if (isSmallScreen) {
    return (
      <div className="relative min-h-screen bg-transparent">
        {activeMenu === "infobox" && (
          <AiTopicScroller
            selectedPlaceData={userData.selectedPlaceData}
            isSmallScreen={true}
            onClose={() => {}}
          />
        )}
        {activeMenu === "scroller" && (
          <Scroller selectedPlaceData={userData.selectedPlaceData} />
        )}
        {activeMenu === "categorybox" && <Categorybox />}
        <FloatingCapsuleMenu active={activeMenu} onSwitch={setActiveMenu} />
      </div>
    );
  }

  // Large screen layout (unchanged)
  return (
    <div className={`max-w-screen-xl mx-auto px-1 lg:py-5 lg:px-2 h-full `}>
      <div className="flex flex-col lg:flex-row justify-around">
        {/* Infobox Section */}
        <span>
          <div className="lg:mr-3 lg:h-[82vh] h-full mt-2">
            <AiTopicScroller
              selectedPlaceData={userData.selectedPlaceData}
              isSmallScreen={false}
              onClose={() => {}}
            />
          </div>
        </span>

        {/* Scroller Section */}
        <span>
          <div className="lg:mr-3 lg:h-[82vh] h-full mt-2">
            <Scroller selectedPlaceData={userData.selectedPlaceData} />
          </div>
        </span>

        {/* Categorybox Section */}
        <span>
          <div className="lg:mr-3 my-3">
            <Categorybox />
          </div>
        </span>
      </div>
    </div>
  );
};

export default Homefeed;
