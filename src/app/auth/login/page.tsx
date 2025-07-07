"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Head from "next/head";
import { supabase } from "@/helper/getinfoData";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("myuser");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("You have been logged-in successfully!");

        if (data.user) {
          localStorage.setItem(
            "myuser",
            JSON.stringify({
              user_id: data.user.id,
              token: data.session.access_token,
              email: data.user.email,
            })
          );
          setTimeout(() => {
            router.push("/");
          }, 1000);
        }
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
      // If successful, the user will be redirected to the callback URL
    } catch {
      toast.error("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Login - Newsifai</title>
        <meta name="description" content="Login to your Newsifai account" />
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
          <Image
            className="mx-auto h-[9rem] w-auto"
            width={1000}
            height={1000}
            src="/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-slate-200">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" method="POST">
            <div>
              <label
                // for="email"
                className="block text-sm/6 font-medium text-gray-900 dark:text-slate-400"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="on"
                  onChange={handleChange}
                  required
                  placeholder="john1234@example.com"
                  className="w-full py-1 px-3 leading-8 text-slate-900 border border-slate-300 rounded-lg bg-slate-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-slate-200 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  //   for="password"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-slate-400"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="/forgot"
                    className="font-semibold text-red-600 hover:text-red-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  required
                  onChange={handleChange}
                  placeholder="A!B@c#$@1234"
                  className="w-full py-1 px-3 leading-8 text-slate-900 border border-slate-300 rounded-lg bg-slate-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-slate-200 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign In Button */}
          <div>
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex w-full justify-center items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-gray-700 dark:text-gray-200 shadow-xs hover:bg-gray-50 dark:hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:opacity-50 disabled:cursor-not-allowed
              cursor-pointer"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              {isLoading ? "Signing in..." : "Sign in with Google"}
            </button>
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don&apos;t have a Newsifai profile?
            <Link
              href={"/auth/signup"}
              className="font-semibold text-red-600 hover:text-red-500 mx-1"
            >
              Create Account!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
