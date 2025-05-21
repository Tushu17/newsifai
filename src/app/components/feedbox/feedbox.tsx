import React from "react";

const Feedbox = () => {
  return (
    // creat two boxes side by side tomorrow
    <section className="container w-1/2  sm:h-9/12 mt-20 mx-2 bg-black-300 text-slate-50 ">
      <h2 className="text-xl text-white bg-black py-2">-Today's</h2>
      <div className=" w-full h-full text-slate-50 border-2 border-white grid grid-cols-2 gap-2 grid-rows-2 ">
        <div className="bg-red border-1 border-red-700 mx-1 mt-1">
          <h2 className="text-2xl text-center font-bold underline">
            Today's inspiration
          </h2>
          <p className="text-xl ">
            It all make sense in the end, place every step carefully and dont
            stress much
          </p>
        </div>
        <div className="bg-red border-1 border-red-700 mx-1 mt-1 ">
          <h2 className="text-2xl text-center">Good to know</h2>
        </div>
        <div className="bg-red border-1 border-red-700 mx-1 mb-1"> hello</div>
        <div className="bg-red border-1 border-red-700 mx-1 mb-1"> hello</div>
      </div>
    </section>
  );
};

export default Feedbox;
