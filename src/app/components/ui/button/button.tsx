import React from "react";

const button = (name: string) => {
  return (
    <button className="relative border-2 border-gray-800 text-gray-800 px-6 py-3 rounded-lg overflow-hidden group">
      <span className="absolute inset-0 bg-gray-800 transform -translate-x-full group-hover:translate-x-0 transition duration-300"></span>
      <span className="relative z-10 group-hover:text-white">{name}</span>
    </button>
  );
};

export default button;
