"use client";
import React from "react";

const ContributionPage = () => (
  <div className="max-w-4xl mx-auto py-16 px-4">
    <h1 className="text-4xl font-bold mb-8 text-center">
      Let&#39;s Build Together
    </h1>

    <div className="space-y-12 border-2 rounded-2xl dark:bg-gray-900 bg-white">
      {/* My Story Section */}
      <section className="shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">My Journey So Far</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          I started this project a couple of months ago. I won&#39;t call myself
          a coding wizard — I rely on AI and learn as I go. But here&#39;s what
          this journey has taught me: every time I look at the project, I notice
          countless ways it can get better. Instead of feeling overwhelmed,
          I&#39;ve trained myself to focus on just one thing at a time — and
          improve that. Step by step, it adds up.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          This approach has kept me moving forward, and now I&#39;m excited to
          invite others to join this journey. There&#39;s so much potential
          here, and I believe collaboration can make this project truly special.
        </p>
      </section>

      {/* Endless Possibilities */}
      <section className="shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Endless Possibilities</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          In my opinion, there are endless things that can be done in this
          project. Here are just some areas where your contribution could make a
          huge difference:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">New Topic Modes</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Add new types of topic modes or improve existing ones. The current
              system is just the beginning!
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">User Experience</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Make the platform more user-friendly, intuitive, and accessible to
              everyone.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Data Structures</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Create better data structures, improve performance, or add new
              features.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Marketing & Awareness
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              I&#39;ve seen people spend 10x more on PR than on the actual
              website. As a solopreneur, I&#39;m still figuring this out how to
              get engagement organically.
            </p>
          </div>
        </div>
      </section>

      {/* How You Can Help */}
      <section className="shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">How You Can Help</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Code Contributions</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Whether you&#39;re a seasoned developer or just starting out,
              there&#39;s room for everyone. I&#39;m proof that you don&#39;t
              need to be an expert to make meaningful contributions!
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Feedback & Ideas</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Share your thoughts, report bugs, suggest features, or just tell
              me what you think could be better. Every perspective is valuable.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Documentation & Testing
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Help improve documentation, test features, or create guides that
              make the project more accessible to others.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Spread the Word</h3>
            <p className="text-gray-600 dark:text-gray-300">
              If you find value in this project, help others discover it too.
              Word of mouth and community support are incredibly valuable.
            </p>
          </div>
        </div>
      </section>

      {/* Let&#39;s Connect */}
      <section className="shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Let&#39;s Connect</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          If you want to contribute in any way, I&#39;m here to hear from you.
          Whether it&#39;s a small suggestion or a big collaboration, I&#39;m
          excited to work together.
        </p>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
          <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Ready to collaborate? Have an idea? Just want to say hello?
          </p>
          <a
            href="mailto:myemail@gmail.com"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Email me at myemail@gmail.com
          </a>
        </div>
      </section>

      {/* Thank You */}
      <section className="shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Thank You</h2>
        <p className="text-gray-600 dark:text-gray-300">
          To everyone who has already contributed, provided feedback, or simply
          used this project - thank you. You&#39;ve made this journey
          worthwhile, and I&#39;m excited to see where we can take it together.
        </p>
      </section>
    </div>
  </div>
);

export default ContributionPage;
