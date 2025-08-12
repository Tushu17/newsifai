"use client";
import Link from "next/link";

import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";
import { supabase } from "./../../../libs/utils/supabaseClient";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("myuser");

    if (token) {
      toast.success(`you are already signed up`);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [router]);

  // Password validation function
  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("At least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("At least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("At least one lowercase letter");
    }
    if (!/\d/.test(password)) {
      errors.push("At least one number");
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("At least one special character");
    }

    return errors;
  };

  const isPasswordStrong = (password: string): boolean => {
    return validatePassword(password).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      const newPassword = e.target.value;
      setPassword(newPassword);
      setPasswordErrors(validatePassword(newPassword));
    }
  };

  // Supabase handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check password strength before submitting
    if (!isPasswordStrong(password)) {
      toast.error("Please ensure your password meets all requirements");
      return;
    }

    setIsLoading(true);

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
        console.error("Signup error:", error, data);
        toast.error(error.message);
        return;
      }

      toast.success("Check your email for a confirmation link! Then login.");
      setName("");
      setEmail("");
      setPassword("");

      // Redirect to login page after successful signup
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
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
        <title>Create Account - Newsifai</title>
        <meta name="description" content="Create a new account on Newsifiai" />
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
            width={100}
            height={100}
            className="mx-auto h-[9rem] w-auto"
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
                  className={`w-full py-1 px-3 leading-8 text-slate-900 border rounded-lg bg-slate-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-slate-200 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    password && passwordErrors.length > 0
                      ? "border-red-500 dark:border-red-500"
                      : password && passwordErrors.length === 0
                      ? "border-green-500 dark:border-green-500"
                      : "border-slate-300"
                  }`}
                />
              </div>

              {/* Password Requirements */}
              {password && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Password requirements:
                  </p>
                  <div className="space-y-1">
                    {[
                      {
                        check: password.length >= 8,
                        text: "At least 8 characters long",
                      },
                      {
                        check: /[A-Z]/.test(password),
                        text: "At least one uppercase letter",
                      },
                      {
                        check: /[a-z]/.test(password),
                        text: "At least one lowercase letter",
                      },
                      {
                        check: /\d/.test(password),
                        text: "At least one number",
                      },
                      {
                        check: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
                          password
                        ),
                        text: "At least one special character",
                      },
                    ].map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            requirement.check ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></div>
                        <span
                          className={`text-xs ${
                            requirement.check
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {requirement.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={
                  isLoading ||
                  (password.length > 0 && !isPasswordStrong(password))
                }
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing up..." : "Sign up"}
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

          {/* Google Sign Up Button */}
          <div>
            <button
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="flex w-full justify-center items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-gray-700 dark:text-gray-200 shadow-xs hover:bg-gray-50 dark:hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              {isLoading ? "Signing up..." : "Sign up with Google"}
            </button>
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have a Newsifai profile?
            <Link
              href={"/auth/login"}
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
