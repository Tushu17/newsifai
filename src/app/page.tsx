import React from "react";
import Feedbox from "./components/homemain/feedbox/feedbox";
import Infobox from "./components/homemain/infobox/infobox";
import Homefeed from "./components/homemain/homefeed/homefeed";

const Homepage = () => {
  return (
    <section className="h-screen overflow-scroll">
      <div className="h-full w-full flex">
        {/* <Infobox />
        <Feedbox /> */}
        <Homefeed />
      </div>
    </section>
  );
};

export default Homepage;
