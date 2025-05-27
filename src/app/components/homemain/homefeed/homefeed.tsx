"use client";
import React, { useEffect, useState } from "react";
import Infobox from "../infobox/infobox";
import Feedbox from "../feedbox/feedbox";

const Homefeed = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-8 px-4 lg:py-16 lg:px-6">
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
