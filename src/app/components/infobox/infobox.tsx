import React from "react";

const Infobox = () => {
  return (
    <section className="container w-1/2  sm:h-9/12 mt-20 mx-2 bg-black-300 text-slate-50 ">
      <h2 className="text-xl text-white bg-black py-2">-Today's</h2>
      <div
        className=" w-full h-full text-slate-50 border-2 border-white grid grid-cols-2 gap-2 grid-rows-2 "
        style={{ gridTemplateRows: "40% 1fr" }}
      >
        <div className="bg-red  mx-1 mt-1">
          <h2 className="text-3xl text-center font-bold ">Quote</h2>
          <p className="text-lg font-semibold px-2 mt-2">
            It all make sense in the end, place every step carefully and dont
            stress much
            <br />
            <span className="text-lg font-extralight mt-0">-Writer</span>
          </p>
        </div>
        <div className="bg-red   mx-1 mt-1 ">
          <h2 className="text-3xl text-center font-bold ">Good to know</h2>

          <ul className="ml-6 font-thin list-disc text-xl">
            <li> this is a table row 1</li>
            <li> this is a table row 1</li>
            <li> this is a table row 1</li>
          </ul>
        </div>
        <div className="bg-red   mx-1 mb-1">
          <h2 className="text-3xl text-center font-bold">Markets</h2>
          <span className="">
            <h3>Equity outlook</h3>
          </span>
          <span className="">
            <h3>Real Estate</h3>
          </span>
        </div>
        <div className="bg-red   mx-1 mb-1"> hello</div>
      </div>
    </section>
  );
};

export default Infobox;
