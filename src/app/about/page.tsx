"use client";

import React from "react";
import Head from "next/head";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>About Us - Treasrup</title>
        <meta
          name="description"
          content="Learn about Treasrup&#39;s journey and vision"
        />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              Your Time-Saving News Companion
            </h1>
            <p className="text-xl opacity-90">
              AI-powered news aggregation that brings you the most relevant
              updates, saving you hours of browsing.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Features */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI-Powered News Selection
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                page explaing how ai cherry picks the news for you.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Daily Essentials at a Glance
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Explain the objective of website.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-green-600 dark:text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  features and upcoming things
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                wht is limiting and what is comming
              </p>
            </div>
          </div>

          {/* Right Column - Stats & Benefits */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose QuickNews?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Save up to 2 hours daily on news consumption
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get personalized news recommendations
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Cost and money
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    We as human persue things for one of the few particular
                    reasons which are- money, learning or social work. Part of
                    me wants to try to make money from this website but part of
                    me wants to take it as a learning experience and help others
                    but even to keep this website running i need money. right
                    now website is operable on few places but i want to increase
                    the content quality by more places like breaking a city into
                    further places. but i dont want to ask money from people who
                    can sacrfice my project and its features for not paying i
                    want to build a good active user base. but somebody gotta
                    bare the expenses and the problem is people who can afford
                    to pay will not pay unless i force them to and we are back
                    to square one where i dont want to force people who can
                    afford to pay. sure there is a way like &#34;but me a coffee
                    &#34; kinda thing i&#39;m not sure if people will pay and
                    how much they will pay and how sustainable will it be, will
                    it be enough to keep the website running? all these
                    questions are obviously there but for me i&#39;ll do my
                    deeds and will move ahead, i&#39;ll to automate this website
                    as much as i can and leave it to people if they want to add
                    more features and places we they will give the money. if i
                    ever get a money from this website i&#39;ll surely reinvest
                    atleast 80% of it in the website and the rest will be used
                    for my personal expenses or some other future projects.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="opacity-90">
                To revolutionize how people consume news by leveraging AI to
                deliver the most relevant information efficiently, helping you
                make informed decisions without wasting time.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Save Time?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their news consumption
            experience with QuickNews.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
