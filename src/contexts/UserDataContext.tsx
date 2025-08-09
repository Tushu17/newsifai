"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Types
interface PlaceData {
  id?: number;
  place: string;
  region?: string;
}

interface TopicType {
  value: string;
  label: string;
  table: string;
}

interface UserPreference {
  showFreshFirst: boolean;
  sortBy: string;
}

interface UserDataContextType {
  selectedPlace: PlaceData | null;
  topicType: TopicType;
  userPreference: UserPreference;
  isUserSignedIn: boolean;
  userId: string | null;
  loading: boolean;
  updatePlace: (place: PlaceData) => void;
  updateTopicType: (type: TopicType) => void;
  updateUserPreference: (preference: Partial<UserPreference>) => void;
  updateSignInStatus: (isSignedIn: boolean) => void;
  resetToDefaults: () => void;
}

// Default values
const DEFAULT_PLACE: PlaceData = { id: 1, place: "California", region: "USA" };

const DEFAULT_TOPIC_TYPE: TopicType = {
  value: "conventional",
  label: "Conventional",
  table: "ai_news_topics",
};

// Helper function to get default user preference based on sign-in status
const getDefaultUserPreference = (isSignedIn: boolean): UserPreference => ({
  showFreshFirst: isSignedIn,
  sortBy: "last_news_at",
});

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

interface UserDataProviderProps {
  children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({
  children,
}) => {
  const [selectedPlace, setSelectedPlace] = useState<PlaceData | null>(null);
  const [topicType, setTopicType] = useState<TopicType>(DEFAULT_TOPIC_TYPE);
  const [userPreference, setUserPreference] = useState<UserPreference>(
    getDefaultUserPreference(false)
  );
  const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize user data from localStorage and check auth status
  useEffect(() => {
    const initializeUserData = async () => {
      try {
        // First check authentication status
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const isSignedIn = !!session;
        const currentUserId = session?.user?.id || null;
        setIsUserSignedIn(isSignedIn);
        setUserId(currentUserId);

        if (typeof window !== "undefined") {
          const storedUserData = localStorage.getItem("userData");
          if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);

            // Set selected place
            if (parsedData.selectedPlaceData) {
              setSelectedPlace(parsedData.selectedPlaceData);
            } else {
              setSelectedPlace(DEFAULT_PLACE);
            }

            // Set topic type
            if (parsedData.topicType) {
              setTopicType(parsedData.topicType);
            }

            // Set user preference
            if (parsedData.userPreference) {
              setUserPreference(parsedData.userPreference);
            } else {
              setUserPreference(getDefaultUserPreference(isSignedIn));
            }

            // Update stored sign-in status
            if (parsedData.isUserSignedIn !== isSignedIn) {
              const updatedUserData = {
                ...parsedData,
                isUserSignedIn: isSignedIn,
              };
              localStorage.setItem("userData", JSON.stringify(updatedUserData));
            }
          } else {
            // Set defaults for first-time users
            const defaultUserPreference = getDefaultUserPreference(isSignedIn);
            setSelectedPlace(DEFAULT_PLACE);
            setTopicType(DEFAULT_TOPIC_TYPE);
            setUserPreference(defaultUserPreference);

            // Save defaults to localStorage
            const defaultUserData = {
              selectedPlaceData: DEFAULT_PLACE,
              topicType: DEFAULT_TOPIC_TYPE,
              userPreference: defaultUserPreference,
              isUserSignedIn: isSignedIn,
            };
            localStorage.setItem("userData", JSON.stringify(defaultUserData));
          }
        }
      } catch (error) {
        console.error("Error initializing user data:", error);
        // Set defaults on error
        setSelectedPlace(DEFAULT_PLACE);
        setTopicType(DEFAULT_TOPIC_TYPE);
        setUserPreference(getDefaultUserPreference(false));
        setIsUserSignedIn(false);
        setUserId(null);
      } finally {
        setLoading(false);
      }
    };

    initializeUserData();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const isSignedIn = !!session;
      const currentUserId = session?.user?.id || null;
      setIsUserSignedIn(isSignedIn);
      setUserId(currentUserId);

      // Update localStorage with new auth status
      try {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          const updatedUserData = {
            ...parsedData,
            isUserSignedIn: isSignedIn,
          };
          localStorage.setItem("userData", JSON.stringify(updatedUserData));
        }
      } catch (error) {
        console.error("Error updating auth status in localStorage:", error);
      }
    });

    // Listen for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userData" && e.newValue) {
        try {
          const parsedData = JSON.parse(e.newValue);
          if (parsedData.selectedPlaceData) {
            setSelectedPlace(parsedData.selectedPlaceData);
          }
          if (parsedData.topicType) {
            setTopicType(parsedData.topicType);
          }
          if (parsedData.userPreference) {
            setUserPreference(parsedData.userPreference);
          }
          if (parsedData.isUserSignedIn !== undefined) {
            setIsUserSignedIn(parsedData.isUserSignedIn);
          }
        } catch (error) {
          console.error("Error parsing storage change:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      subscription.unsubscribe();
    };
  }, []);

  // Helper function to update localStorage
  const updateLocalStorage = (
    updates: Partial<{
      selectedPlaceData: PlaceData;
      topicType: TopicType;
      userPreference: UserPreference;
      isUserSignedIn: boolean;
    }>
  ) => {
    try {
      const currentData = localStorage.getItem("userData");
      let parsedData = {};

      if (currentData) {
        parsedData = JSON.parse(currentData);
      }

      const updatedData = { ...parsedData, ...updates };
      localStorage.setItem("userData", JSON.stringify(updatedData));
      // Dispatch storage event for other components
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }
  };

  const updatePlace = (place: PlaceData) => {
    setSelectedPlace(place);
    updateLocalStorage({ selectedPlaceData: place });
  };

  const updateTopicType = (type: TopicType) => {
    setTopicType(type);
    updateLocalStorage({ topicType: type });
  };

  const updateUserPreference = (preference: Partial<UserPreference>) => {
    const updatedPreference = { ...userPreference, ...preference };
    setUserPreference(updatedPreference);
    updateLocalStorage({ userPreference: updatedPreference });
  };

  const updateSignInStatus = (isSignedIn: boolean) => {
    setIsUserSignedIn(isSignedIn);
    updateLocalStorage({ isUserSignedIn: isSignedIn });
  };

  const resetToDefaults = () => {
    const defaultUserPreference = getDefaultUserPreference(isUserSignedIn);
    setSelectedPlace(DEFAULT_PLACE);
    setTopicType(DEFAULT_TOPIC_TYPE);
    setUserPreference(defaultUserPreference);

    const defaultUserData = {
      selectedPlaceData: DEFAULT_PLACE,
      topicType: DEFAULT_TOPIC_TYPE,
      userPreference: defaultUserPreference,
      isUserSignedIn: isUserSignedIn,
    };
    localStorage.setItem("userData", JSON.stringify(defaultUserData));
    window.dispatchEvent(new Event("storage"));
  };

  const value: UserDataContextType = {
    selectedPlace,
    topicType,
    userPreference,
    isUserSignedIn,
    userId,
    loading,
    updatePlace,
    updateTopicType,
    updateUserPreference,
    updateSignInStatus,
    resetToDefaults,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

// Custom hook to use user data context
export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

// Export types for use in other components
export type { PlaceData, TopicType, UserPreference };

export default UserDataContext;
