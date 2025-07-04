"use client";
import Link from "next/link";
import React from "react";

const TeamsPage = () => (
  <div className="max-w-xl mx-auto py-16 px-4">
    <h1 className="text-4xl font-bold mb-8 text-center">Meet the Team</h1>
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 text-gray-800 dark:text-gray-200 text-justify space-y-6">
      <p>
        Welcome to the Teams page! You might be expecting a list of names,
        faces, and impressive titles, but the truth is: this project is built
        and maintained by a single developer (that&#39;s me!).
      </p>
      <p>
        While there&#39;s no team of engineers, designers, or marketers behind
        the scenes, I&#39;m passionate about building, learning, and sharing.
        Every line of code, every pixel, and every idea comes from one
        person&#39;s vision and effort.
      </p>
      <p>
        If you&#39;re curious about my motivation, philosophy, or the story
        behind this project, I invite you to visit the{" "}
        <Link href="/about" className="text-blue-600 hover:underline">
          About
        </Link>{" "}
        page, where I share more about my journey and what drives this work.
      </p>
      <p>Thank you for stopping by and supporting solo developers!</p>
    </div>
  </div>
);

export default TeamsPage;
