"use client";
import React, { useState, useEffect } from "react";
import Homefeed from "./components/homemain/homefeed/homefeed";
import LoadingBar from "react-top-loading-bar";

const Homepage = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start loading bar when component mounts
    setProgress(30);
    // Simulate loading completion
    const timer = setTimeout(() => {
      setProgress(100);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    // there is the scrolling scene
    <section className="h-screen overflow-scroll">
      <LoadingBar
        color="#2719f1"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={400}
      />
      <div className="h-full w-full flex">
        <Homefeed />
      </div>
    </section>
  );
};

export default Homepage;
