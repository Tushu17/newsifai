import React from "react";
import Homefeed from "./components/homemain/homefeed/homefeed";

const Homepage = () => {
  return (
    // there is the scrolling scene
    <section className="h-screen">
      <div className="h-full w-full flex">
        <Homefeed />
      </div>
    </section>
  );
};

export default Homepage;
