"use client";
import React, { useEffect, useState } from "react";
import Scroller from "./scroller/scroller";
import Categorybox from "../../ui/categorybox/categorybox";

const Feedbox = () => {
  const [isSmalldevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    setIsSmallDevice(window.innerWidth < 720);
  }, [isSmalldevice]);
  return (
    <div className="flex flex-col sm:flex-row gap-4 md:h-[78vh] h-full">
      {/* Left Column - Scrollable */}
      {isSmalldevice ? (
        <Categorybox />
      ) : (
        <>
          <Scroller />
          <Categorybox />
        </>
      )}
    </div>
  );
};

export default Feedbox;
