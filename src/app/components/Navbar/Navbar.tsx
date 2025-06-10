"use client";

import { supabase } from "@/libs/utils/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { IoMenu, IoCloseCircle } from "react-icons/io5";

const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };

  const logoutUser = async () => {
    console.log("the function is called");

    const user = localStorage.getItem("myuser");

    if (!user) {
      console.log("there is no user");
    }

    const handleLogout = async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        // Clear local storage if used
        localStorage.removeItem("sb-auth-token");
        localStorage.removeItem("myuser");
        router.push("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
    handleLogout();
  };
  return (
    <nav
      className={`flex flex-col justify-center items-center md:flex-row md:justify-start shadow-md  sticky top-0 border-b-1 z-50 text-gray-900 dark:text-gray-200 backdrop-blur-md border-gray-200 dark:border-gray-600 dark:bg-gray-950 bg-gray-200 ${
        !menuOpen && `overflow-x-hidden`
      }`}
    >
      <div className="container mt-1 md:mt-3">
        {/* Desktop Navbar */}
        <div className="grid-cols-2 hidden md:block w-screen h-auto">
          <div className="h-15 flex justify-between pr-4 items-end dark:text-gray-200 text-gray-900">
            <div className="logo ml-3">
              <Link
                href="/"
                className=" font-bold text-2xl inline-block align-baseline"
              >
                <div className="flex text-center items-end  md:text-2xl font-semibold text-gray-950 dark:text-gray-200 ">
                  <Image
                    className="mt-1 translate-y-2"
                    width={60}
                    height={40}
                    src="/logo.png"
                    alt=""
                  />
                  <h2 className="pl-2 text-5xl font-extrabold ">Quicknws</h2>
                  <span className="font-light">-Daily</span>
                </div>
              </Link>
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
                Archives
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
              <button
                onClick={() => logoutUser()}
                className="text-base font-light hover:text-orange-500 px-3 rounded-md transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden w-screen">
          {/* Mobile Header Bar */}
          <div className="flex justify-between items-center px-2 py-3 ">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 ">
                <Link href={"/"}>
                  <span className="text-gray-900 dark:text-gray-200 font-bold text-lg">
                    <Image
                      className=""
                      width={60}
                      height={40}
                      src="/logo.png"
                      alt=""
                    />
                  </span>
                </Link>
              </div>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-4 gray-900">
              {/* Search Icon */}
              <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
                <svg
                  className="w-6 h-6 text-gray-900 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200 relative">
                <svg
                  className="w-6 h-6 text-gray-900 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5-5-5h5zm-5-10a5 5 0 110 10h5a5 5 0 01-10 0z"
                  />
                </svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-800 rounded-full"></span>
              </button>

              {/* Star/Favorites Icon */}
              <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
                <svg
                  className="w-6 h-6 text-gray-900 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </button>

              {/* Menu Hamburger */}
              <IoMenu
                className="text-4xl cursor-pointer text-slate-800 dark:text-slate-200"
                onClick={toggleMenu}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        ref={ref}
        className={`md:w-[25vw] h-[100vh] fixed top-0 right-0 p-10
     px-6 shadow translate transition-transform bg-slate-400 dark:bg-slate-950 z-10
      ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <span
          onClick={toggleMenu}
          className="absolute top-2 right-2 cursor-pointer text-3xl text-blue-500"
        >
          <IoCloseCircle />
        </span>
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
      </div>
    </nav>
  );
};

export default Navbar;
