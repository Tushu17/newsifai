"use client";
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../../../libs/utils/supabaseClient";
import { CiLocationOn } from "react-icons/ci";

// Define the interface for place data
interface PlaceData {
  id: number;
  place: string;
  region?: string;
  country?: string;
}

const LocationSelector = () => {
  const [placeList, setPlaceList] = useState<PlaceData[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<PlaceData | null>(null);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      const { data, error } = await supabase.from("places_config").select("*");
      if (error || !data || data.length === 0) {
        // Fallback with basic structure
        const fallbackPlaces: PlaceData[] = [
          { id: 1, place: "india", region: "Asia", country: "India" },
          { id: 2, place: "america", region: "Americas", country: "USA" },
          { id: 3, place: "europe", region: "Europe", country: "Europe" },
        ];
        setPlaceList(fallbackPlaces);
      } else {
        setPlaceList(data as PlaceData[]);
      }
    };
    fetchPlaces();
  }, []);

  useEffect(() => {
    const storedPlaceData = localStorage.getItem("selectedPlaceData");
    if (storedPlaceData) {
      try {
        const parsedData = JSON.parse(storedPlaceData);
        const foundPlace = placeList.find((p) => p.place === parsedData.place);
        if (foundPlace) {
          setSelectedPlace(foundPlace);
          return;
        }
      } catch (error) {
        console.error("Error parsing stored place data:", error);
      }
    }

    // Fallback to first place if no stored data or stored place not found
    if (placeList.length > 0) {
      const defaultPlace = placeList[0];
      setSelectedPlace(defaultPlace);
      localStorage.setItem("selectedPlaceData", JSON.stringify(defaultPlace));
    }
  }, [placeList]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handlePlaceChange = (place: PlaceData) => {
    setSelectedPlace(place);
    localStorage.setItem("selectedPlaceData", JSON.stringify(place));
    window.dispatchEvent(new Event("storage"));
    setOpen(false);
  };

  if (!placeList.length) return null;

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        className=" flex rounded-md border border-transparent p-2 text-center transition-all text-gray-700 dark:text-white hover:bg-gray-600 cursor-pointer"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <CiLocationOn className="pointer-events-none text-3xl" />
      </button>
      {open && (
        <ul
          ref={dropdownRef}
          role="listbox"
          className="absolute left-1/2 -translate-x-1/2 mt-2 min-w-[140px] rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg z-50"
        >
          {placeList.map((item) => (
            <li
              key={item.id}
              onClick={() => handlePlaceChange(item)}
              className={`px-4 py-2 cursor-pointer text-sm capitalize rounded transition-colors text-slate-700 hover:bg-purple-100 ${
                item.place === selectedPlace?.place
                  ? "bg-purple-200 font-bold"
                  : ""
              }`}
              role="option"
              aria-selected={item.place === selectedPlace?.place}
            >
              {item.place}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSelector;
