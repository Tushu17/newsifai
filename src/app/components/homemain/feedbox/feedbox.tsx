"use client";
import React, { useEffect, useState } from "react";
import Scroller from "./scroller/scroller";

const Feedbox = () => {
  const [isSmalldevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    setIsSmallDevice(window.innerWidth < 720);
  }, []);
  console.log("hels", window.innerWidth < 720);
  return (
    // creat two boxes side by side
    <div className="flex flex-col sm:flex-row gap-4 overflow-hidden -mb-4 -mx-2 lg:h-[4/6] md:h-[63vh] h-[53vh]">
      {/* Left Column - Scrollable */}
      <Scroller />

      {/* Right Column - Scrollable */}

      {!isSmalldevice && <Scroller />}
    </div>
  );
};

export default Feedbox;
