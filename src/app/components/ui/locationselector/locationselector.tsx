"use client";
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../../../libs/utils/supabaseClient";
import { CiLocationOn } from "react-icons/ci";

const LocationSelector = () => {
  const [placeList, setPlaceList] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<string>("");
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      const { data, error } = await supabase
        .from("places_config")
        .select("place");
      if (error || !data || data.length === 0) {
        setPlaceList(["india", "america", "europe"]); // Fallback
      } else {
        const places = data.map((item: { place: string }) => item.place);
        setPlaceList(places);
      }
    };
    fetchPlaces();
  }, []);

  useEffect(() => {
    const storedPlace = localStorage.getItem("selectedPlace");
    if (storedPlace && placeList.includes(storedPlace)) {
      setSelectedPlace(storedPlace);
    } else if (placeList.length > 0) {
      const defaultPlace = placeList[0];
      setSelectedPlace(defaultPlace);
      localStorage.setItem("selectedPlace", defaultPlace);
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

  const handlePlaceChange = (place: string) => {
    setSelectedPlace(place);
    localStorage.setItem("selectedPlace", place);
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
              key={item}
              onClick={() => handlePlaceChange(item)}
              className={`px-4 py-2 cursor-pointer text-sm capitalize rounded transition-colors text-slate-700 hover:bg-purple-100 ${
                item === selectedPlace ? "bg-purple-200 font-bold" : ""
              }`}
              role="option"
              aria-selected={item === selectedPlace}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSelector;
