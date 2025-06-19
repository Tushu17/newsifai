"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingBar from "react-top-loading-bar";

const Loadingbar = () => {
  const pathname = usePathname();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start loading bar when component mounts
    setProgress(30);
    // Simulate loading completion
    const timer = setTimeout(() => {
      setProgress(100);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname]);
  return (
    <LoadingBar
      color="#2719f1"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
      waitingTime={400}
    />
  );
};

export default Loadingbar;
