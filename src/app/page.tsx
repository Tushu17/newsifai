import React from "react";
import Feedbox from "./components/feedbox/feedbox";
import Infobox from "./components/infobox/infobox";

const Homepage = () => {
  return (
    <section className="text-2xl h-screen overflow-scroll ">
      <div className="h-full w-full flex">
        <Infobox />
        <Feedbox />
      </div>
    </section>
  );
};

export default Homepage;
