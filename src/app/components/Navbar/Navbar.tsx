"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMenu, IoCloseCircle } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { toast, ToastContainer } from "react-toastify";
import { LogoutUser } from "@/helper/logout";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLoggedIn, setUserLoggedin] = useState<string | null>(null);
  const [dropDown, setDropDown] = useState(false);
  const currentPath = pathname;
  useEffect(() => {
    setMenuOpen(false);
    const data = localStorage.getItem("myuser");
    setUserLoggedin(data || null);
  }, [pathname]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const logoutUser = async () => {
    const userLogout = await LogoutUser();
    if (userLogout.success) {
      toast.success(userLogout.message);
    } else {
      toast.error(userLogout.message);
    }

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <nav className="bg-gray-100 border-gray-200 py-2.5 dark:bg-gray-900 sticky top-0 z-50">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto border rounded-2xl border-gray-400  lg:p-2 min-h-14">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              width={36}
              height={36}
              className="h-8 mr-3 sm:h-9"
              alt="Landwind Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Quicknws
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            {userLoggedIn ? (
              <div
                className="relative"
                onMouseOver={() => {
                  setDropDown(true);
                }}
                onMouseLeave={() => {
                  setDropDown(false);
                }}
              >
                <button
                  onClick={() => setDropDown((d) => !d)}
                  className="flex items-center text-gray-700 dark:text-gray-200 focus:outline-none"
                >
                  <VscAccount className="text-3xl mr-2" />
                </button>
                {dropDown && (
                  <div className="absolute right-0 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 ">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <Link
                          href="/myaccount"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 "
                        >
                          My Account
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/admin/adminhome"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Admin
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={logoutUser}
                          className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer hover:text-red-700"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
              >
                Login
              </Link>
            )}
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <IoCloseCircle className="w-6 h-6" />
              ) : (
                <IoMenu className="w-6 h-6" />
              )}
            </button>
          </div>
          <div
            className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 md:mr-8 ${
              menuOpen ? "" : "hidden"
            }`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 mr-5">
              <li>
                <Link
                  href="/"
                  className={`block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${
                    currentPath == `/`
                      ? `text-purple-700 dark:text-white`
                      : `text-gray-700 dark:text-gray-400`
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/category"
                  className={`block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${
                    currentPath == `/category`
                      ? `text-purple-700 dark:text-white`
                      : `text-gray-700 dark:text-gray-400`
                  }`}
                >
                  Category
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${
                    currentPath == `/about`
                      ? `text-purple-700 dark:text-white`
                      : `text-gray-700 dark:text-gray-400`
                  }`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${
                    currentPath == `/about`
                      ? `text-purple-700 dark:text-white`
                      : `text-gray-700 dark:text-gray-400`
                  }`}
                >
                  Membership
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
