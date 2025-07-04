"use client";

import React from "react";
import Head from "next/head";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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
                This app does use rss news aggregators to fetchnews but final
                content that user receives is completely depended on ai, it
                gives importance rating to every news removes irrelavant or
                duplicate news, create news topic snipets posts, update it. All
                this a complete autonmous mission with multiple funciton and
                checks going simultenously to keep the website running and
                relavant.
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
                There are more genre that i want to include in this website that
                might appiel a large portion of audience if you want like some
                sterotipical lingo or something then tell us, we might include
                that in our website and to improve the accuracy and relavancy of
                news and topics i want to make content more local like giving
                priorities to the content closer to your location.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-orange-600 dark:text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Subscription and payment
                </h3>
              </div>

              <p className="text-gray-600 dark:text-gray-300">
                Just like any other project, I also want to commercialize this
                website but primarly i want to give something that i would
                personally want to spend money on. The fact is this website no
                where close to what i want it to be. perhaps it is also true
                that if i want to improve the quality of content or user
                interaction i will have to pay for it, good ai models and fast
                servers and more frequent update are expensive and at some point
                i&#39;d look for funding those things. i&#39;m aware that i
                first need to build a good active userbase to understand the
                public view about this project i&#39;d continue to keep this
                website completely free for sometime.
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
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Content quality and reach
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                This project quality is directly related to the quality of
                affordable ai present, like a couple of years back i don&#39;t
                think it was possible to create this kinda project, now
                possiblities seems endless to me if you have financial backing,
                but as a soloprenuer, my budget is limited, hence i&#39;m
                serving limited locations, genre and so on but with time when
                smart ai models starts becoming more affordable, I will serve
                more locations and genre. The quality of content will also leap.
                <br />
                Right now i&#39;m operating on 7-8 places across 4 continents
                and content quality is subpar with what i can deliver, if i
                operate on more niche level and use better ai models like
                claude-4 and all, but it&#39;ll be expensive, Same with genre,
                there are multiple genre i want to include but some of them
                doesn&#39;t sound fun to me and ai is not consitent with some of
                them but as ai gonna progress, the content quality gonna improve
                parallel to it.
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
                  <p className="text-gray-600 dark:text-gray-300"></p>
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
            experience with Newsifai.
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
