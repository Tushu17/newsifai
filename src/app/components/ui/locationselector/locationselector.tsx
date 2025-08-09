"use client";
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../../../libs/utils/supabaseClient";
import { CiLocationOn } from "react-icons/ci";
import { useUserData, type PlaceData } from "@/contexts";

const LocationSelector = () => {
  const { selectedPlace, updatePlace, loading } = useUserData();
  const [placeList, setPlaceList] = useState<PlaceData[]>([]);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      const { data, error } = await supabase.from("places_config").select("*");
      if (error || !data || data.length === 0) {
        // Fallback with basic structure
        const fallbackPlaces: PlaceData[] = [
          { id: 1, place: "California", region: "USA" },
          { id: 2, place: "Delhi", region: "India" },
          { id: 3, place: "Paris", region: "France" },
        ];
        setPlaceList(fallbackPlaces);
      } else {
        setPlaceList(data as PlaceData[]);
      }
    };
    fetchPlaces();
  }, []);

  // Update selected place if it's not in the current place list
  useEffect(() => {
    if (placeList.length > 0 && selectedPlace && !loading) {
      const foundPlace = placeList.find((p) => p.place === selectedPlace.place);
      if (!foundPlace) {
        // If current selected place is not in the list, update to first place
        updatePlace(placeList[0]);
      }
    }
  }, [placeList, selectedPlace, updatePlace, loading]);

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
    updatePlace(place);
    setOpen(false);
  };

  if (!placeList.length || loading) return null;

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
