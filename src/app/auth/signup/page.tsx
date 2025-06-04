"use client";
import Link from "next/link";

import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";
import { supabase } from "./../../../libs/utils/supabaseClient";
import { useRouter } from "next/navigation";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }

    // Test Supabase connection
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from("news_items")
          .select("count")
          .limit(1);
        if (error) {
          console.error("Supabase connection error:", error);
        } else {
          console.log("Supabase connection successful");
        }
        localStorage.setItem("data", data as any);
      } catch (err) {
        console.error("Failed to connect to Supabase:", err);
      }
    };

    testConnection();
  }, []);

  const handleChange = (e: any) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  // Supabase handleSubmit
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Use Supabase to sign up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name,
          },
        },
      });

      if (error) {
        console.error("Signup error:", error);
        toast.error(error.message);
        return;
      }

      if (data) {
        toast.success("Check your email for a confirmation link! Then login.");
        setName("");
        setEmail("");
        setPassword("");

        // Redirect to login page after successful signup
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Head>
        <title>Create Account - Treasrup</title>
        <meta name="description" content="Create a new account on Treasrup" />
      </Head>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
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
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-[9rem] w-auto
            "
            src="/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-slate-200">
            Signup for an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" method="POST">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-slate-400"
                >
                  Name
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="on"
                  required
                  placeholder="John"
                  className="w-full py-1 px-3 leading-8 text-slate-900 border border-slate-300 rounded-lg bg-slate-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-slate-200 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-slate-900 dark:text-slate-400"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="on"
                  required
                  placeholder="john1234@example.com"
                  className="w-full py-1 px-3 leading-8 text-slate-900 border border-slate-300 rounded-lg bg-slate-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-slate-200 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-slate-400"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  required
                  placeholder="A!B@c#$@1234"
                  className="w-full py-1 px-3 leading-8 text-slate-900 border border-slate-300 rounded-lg bg-slate-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-slate-200 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have a Treasrup profile?
            <Link
              href={"/login"}
              className="font-semibold text-red-600 hover:text-red-500 mx-1"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
