import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "You are Offline – Newsifai",
  description: "It looks like you have lost internet connection.",
};

export default function OfflinePage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
        You are currently offline
      </h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        No internet connection detected. Please check your network connection and try again to fetch the latest AI-curated news updates.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md"
      >
        Try Reloading
      </Link>
    </div>
  );
}
