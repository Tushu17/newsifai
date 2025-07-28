"use client";

import React from "react";
import Head from "next/head";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 ">
      <Head>
        <title>About Us - Newsifai</title>
        <meta
          name="description"
          content="Learn about Newsifai&#34;s journey and vision"
        />
      </Head>

      {/* Hero Section */}
      <div className="flex justify-center items-center py-4">
        <div className="max-w-3xl w-full mx-auto text-center rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-3 py-4">
          <h1 className="text-2xl font-normal mb-2 text-gray-900 dark:text-white">
            About -{" "}
            <span className="font-extrabold text-3xl bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent">
              Newsifai
            </span>
          </h1>
          <p className="text-base opacity-80 text-gray-700 dark:text-gray-300">
            One of the First Complete AI Content Creation Websites
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 border-2 rounded-2xl my-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Features */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-1">
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
                  Our Goal 🎯
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                My goal is to create the first AI-based content creation
                platform that truly serves people. I believe this platform is a
                great start to that journey. While this app uses RSS aggregators
                to fetch news, everything you receive is fully managed and
                created by AI. Every topic, news item, and piece of information
                is selected, molded, updated, and managed by AI with complete
                automation. My role is to keep improving the algorithms and
                functions. The AI assigns importance ratings to every news item,
                removes irrelevant or duplicate content, creates concise topic
                snippets, and continuously updates everything. It’s a fully
                autonomous operation, with multiple functions and checks running
                simultaneously to keep the website current and relevant.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-1">
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
                  Features and Upcoming Additions
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                There are many more genres I want to include that might appeal
                to a broader audience. If you&#39;re looking for specific types
                of content or have suggestions, let us know—we might just add
                them to our platform. To improve accuracy and relevance, I&#39;m
                also working on making content more localized by giving priority
                to news closer to your location.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-1">
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Subscription and Payment
                </h3>
              </div>

              <p className="text-gray-600 dark:text-gray-300">
                Like any project, I eventually want to monetize this website—but
                primarily, I want to create something I&#39;d personally pay
                for. The truth is, this website is not yet what I envision it
                becoming. I also realize that improving content quality and user
                interaction will require investment: better AI models, faster
                servers, and more frequent updates are expensive.
                <br />
                <br />
                At some point, I&#39;ll need funding for these improvements.
                I&#39;m aware that I first need to build an active user base to
                understand public perception of this project, so I&#39;ll
                continue keeping this website completely free for now.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-1">
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Content Quality and Reach
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                This project&#39;s quality is directly tied to the quality of
                affordable AI available. A couple of years ago, I don&#39;t
                think this kind of project was possible. Now the possibilities
                seem endless if you have financial backing—but as a solopreneur,
                my budget is limited.
                <br />
                <br />
                Currently, I&#39;m serving 7-8 locations across 4 continents,
                and the content quality is not as high as it could be if I
                operated at a more niche level with better AI models like
                Claude-4. But that would be expensive. The same goes for
                genres—there are multiple categories I want to include, but some
                don&#39;t appeal to me personally, and AI isn&#39;t consistent
                with others yet.
                <br />
                <br />
                As AI progresses, content quality will improve alongside it.
                When smarter AI models become more affordable, I&#39;ll serve
                more locations and genres.
              </p>
            </div>
          </div>

          {/* Right Column - Stats & Benefits */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Newsifai?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Advanced news aggregator that delivers the latest news with
                    no nonsense.
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    A healthy alternative to your passive scrolling habit
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Currently free with no ads- When was the last time you saw a
                    website with no ads?
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Makes you smarter and more aware of real-world news
                  </p>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  The Problem We&#39;re Solving
                </h3>
                <div className="bg-white dark:bg-gray-800 p-4 shadow-lg ">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Let&#39;s face it: with the growing internet, we&#39;re all
                    spending more time online than we should, and we constantly
                    feel guilty about it because we know we&#39;re not consuming
                    content we should be. So we look for alternatives—following
                    &#34;informative&#34; accounts on social media, watching
                    podcasts, or visiting news sites to compensate and feel less
                    guilty.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    But our attention spans have shrunk to the point where 4-5
                    minute YouTube videos don&#39;t get as many views as
                    60-second reels or shorts.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    This is what I want to change. I&#39;m a big promoter of
                    &#34;infotainment&#34; because that&#39;s the best way to
                    improve our habits and ourselves. While I think it&#39;s
                    nearly impossible to achieve content quality as engaging as
                    memes or Reddit posts, people like me who want to improve
                    their passive scrolling habits should have a better option
                    than reading boring news or watching 2-hour podcasts that
                    give you the ick before you even start.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    This is where Newsifai comes in. I want to include only
                    essential news and information that we actually look for
                    while scrolling Reddit or Instagram—pure information wrapped
                    in funny or relatable, engaging words. Scrolling that
                    doesn&#39;t feel like a guilty activity. This is a beta
                    model, but as we progress, we&#39;ll get closer to our goal.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white border-1">
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
        <div className="mt-16 text-center ">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 ">
            Ready to Save Time?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their news consumption
            experience with Newsifai.
          </p>
          <Link href={"/auth/signup"}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
              Get Started Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
