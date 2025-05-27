"use client";

import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };
  return (
    <nav className="flex flex-col justify-center items-center md:flex-row md:justify-start shadow-md  sticky top-0 border-b-1   text-gray-900 dark:text-gray-200 backdrop-blur-md border-gray-600 dark:bg-gray-950 bg-gray-200">
      <div className="container mt-3">
        {/* This div is for mid and big screen navbar styling */}
        <div className="grid-cols-2 hidden md:block w-screen h-auto">
          <div className="h-15 flex justify-between pr-4 items-end dark:text-gray-200 text-gray-900">
            <div className="logo ml-3">
              <a
                href="/"
                className=" font-bold text-2xl inline-block align-baseline"
              >
                <div className="flex text-center items-end  md:text-2xl font-semibold text-gray-950 dark:text-gray-200 ">
                  <img
                    className="mt-1 translate-y-2"
                    width={60}
                    height={40}
                    src="/logo.png"
                    alt=""
                  />
                  <h2 className="pl-2 text-5xl font-extrabold ">Quicknws</h2>
                  <span className="font-light">-Daily</span>
                </div>
              </a>
            </div>
            <div className="date flex text-lg font-medium">
              <span>Monday, 23 June 2024</span>
            </div>
          </div>

          <div className="hidden md:flex justify-between items-baseline pr-4 mb-0 pb-0">
            {/* left side options */}
            <div className="ml-4 flex items-baseline md:ml-15 h-8  md:block w-3/6 text-gray-700 dark:text-gray-300 ">
              <a
                href="#"
                className="text-base font-light hover:text-orange-500 px-3 rounded-md transition-colors duration-300"
              >
                Home
              </a>
              <a
                href="#"
                className="text-base font-light hover:text-orange-500 px-3 rounded-md transition-colors duration-300"
              >
                Archeives
              </a>
              <a
                href="#"
                className="text-base font-light hover:text-orange-500 px-3 rounded-md transition-colors duration-300"
              >
                About
              </a>
              <a
                href="#"
                className="text-base font-light hover:text-orange-500 px-3 rounded-md transition-colors duration-300"
              >
                Menu
              </a>
              <a
                href="#"
                className="text-base font-light hover:text-orange-500 px-3 rounded-md transition-colors duration-300"
              >
                Solar Roof
              </a>
              <a
                href="#"
                className="text-base font-light hover:text-orange-500 px-3 rounded-md transition-colors duration-300"
              >
                Solar Panels
              </a>
            </div>
            {/* right side options */}
            <div className="ml-4 flex  md:ml-6  justify-end  w-2/5 items-baseline dark:text-gray-300 text-gray-700">
              <a
                href="#"
                className="text-base font-light  hover:text-orange-500 px-3 rounded-md transition-colors duration-300"
              >
                Shop
              </a>
              <a
                href="#"
                className="text-base font-light hover:text-orange-500 px-3 rounded-md transition-colors duration-300"
              >
                Account
              </a>
              <a
                href="#"
                className="text-base font-light hover:text-orange-500 px-3 rounded-md transition-colors duration-300"
              >
                Menu
              </a>
            </div>
          </div>

          {/* this is for small screen navbar styling */}
          {/* <div className=" dark:bg-gray-900 w-h-screen h-8 md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                id="menu-icon"
                className={`h-6 w-6 ${menuOpen ? "hidden" : "block"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12h18M3 6h18M3 18h18"></path>
              </svg>
              <svg
                id="close-icon"
                className={`h-6 w-6 ${menuOpen ? "block" : "hidden"}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div> */}
        </div>
      </div>
      {/* <div
        id="menu"
        className={`fixed top-16 right-0 w-64 h-screen dark:bg-gray-900 shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#"
            className="hover:text-orange-500 block px-3 py-2 rounded-md text-base font-light"
          >
            Model S
          </a>
          <a
            href="#"
            className="hover:text-orange-500 block px-3 py-2 rounded-md text-base font-light"
          >
            Model 3
          </a>
          <a
            href="#"
            className="hover:text-orange-500 block px-3 py-2 rounded-md text-base font-light"
          >
            Model X
          </a>
          <a
            href="#"
            className="hover:text-orange-500 block px-3 py-2 rounded-md text-base font-light"
          >
            Model Y
          </a>
          <a
            href="#"
            className="hover:text-orange-500 block px-3 py-2 rounded-md text-base font-light"
          >
            Solar Roof
          </a>
          <a
            href="#"
            className="hover:text-orange-500 block px-3 py-2 rounded-md text-base font-light"
          >
            Solar Panels
          </a>
          <a
            href="#"
            className="hover:text-orange-500 block px-3 py-2 rounded-md text-base font-light"
          >
            Shop
          </a>
          <a
            href="#"
            className="hover:text-orange-500 block px-3 py-2 rounded-md text-base font-light"
          >
            Account
          </a>
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
