"use client";
import React from "react";

const MembershipPage = () => (
  <div className="max-w-2xl mx-auto py-16 px-4">
    <h1 className="text-4xl font-bold mb-8 text-center">
      Membership Coming Soon
    </h1>
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 text-gray-800 dark:text-gray-200 text-justify space-y-6">
      <p>
        Thank you for your interest in supporting this project! As a solo
        developer, my goal has always been to create something valuable,
        accessible, and enjoyable for everyone. I believe in sharing knowledge,
        inspiration, and tools without putting up intrusive paywalls or locking
        away content just for the sake of profit.
      </p>
      <p>
        That said, running a project like this does come with real
        costs—servers, APIs, and the time and energy it takes to keep things
        running smoothly. To help cover these expenses and ensure the project
        can continue to grow and improve, I am planning to introduce a
        membership option soon.
      </p>
      <p>
        Membership will never be about restricting access or making you feel
        left out. Instead, it will be a way for those who find value here to
        contribute and help sustain the platform. There will be no aggressive
        pop-ups, no guilt trips, and no &#34;subscribe or else&#34; tactics.
        Just a simple, honest way to support the work if you choose.
      </p>
      <p>
        If you&#39;re interested in becoming a member, please stay tuned! More
        details will be announced soon. Your support—whether through membership,
        sharing the site, or simply being here—means the world to me.
      </p>
      <p>
        Thank you for believing in independent, user-focused projects. If you
        have thoughts or suggestions about what you&#39;d like to see in a
        membership, feel free to reach out!
      </p>
      <p className="text-center text-xs text-gray-400 mt-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  </div>
);

export default MembershipPage;
