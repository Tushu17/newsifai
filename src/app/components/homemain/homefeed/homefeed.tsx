"use client";
import React from "react";
import Infobox from "../infobox/infobox";
import Feedbox from "../feedbox/feedbox";

const Homefeed = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-2 px-4 lg:py-12 lg:px-2 h-screen ">
      <div className="flex flex-col md:flex-row">
        <div className=" md:mr-5">
          <Infobox />
        </div>
        <div className="flex-1">
          <Feedbox />
        </div>
      </div>
    </div>
  );
};

export default Homefeed;
