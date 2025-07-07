"use client";

import React from "react";
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <div>
      <Head>
        <title>Privacy Policy - Newsifai</title>
        <meta
          name="description"
          content="Privacy Policy for Newsifai - Learn how we protect your data"
        />
      </Head>

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Privacy Policy for Newsifai
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Effective Date: July 7, 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                This Privacy Policy describes how Newsifai (&#34;we,&#34;
                &#34;us,&#34; or &#34;our&#34;) collects, uses, and handles your
                information when you use our application and sign in via Google.
                Your privacy is important to us, and we are committed to
                protecting it.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We are committed to collecting only the minimum amount of
                information necessary to operate our service. When you choose to
                create an account and authenticate using your Google account, we
                collect the following personal data provided by Google:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  <strong>Full Name:</strong> To personalize your experience and
                  address you within the application.
                </li>
                <li>
                  <strong>Email Address:</strong> To serve as a unique
                  identifier for your account and for essential account-related
                  communication.
                </li>
                <li>
                  <strong>Profile Picture:</strong> To be displayed on your user
                  profile within the application.
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We do not request access to and do not collect any other
                personal information from your Google account, such as your
                contacts, calendar, or files.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The personal information we collect is used exclusively for the
                following purposes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  <strong>To Provide and Maintain Our Service:</strong> To
                  create, manage, and secure your user account.
                </li>
                <li>
                  <strong>To Personalize Your Experience:</strong> To display
                  your name and profile picture within the application&#39;s
                  user interface.
                </li>
                <li>
                  <strong>To Ensure Security:</strong> Your email address is
                  used as a unique identifier to prevent unauthorized access and
                  to distinguish your account from others.
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We do not use your personal information for marketing,
                advertising, or analytical purposes. We will never sell, rent,
                or lease your personal data to any third party.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                3. Data Storage and Security
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                All user data, including the information collected from Google
                Sign-In, is securely stored and managed by Supabase, our trusted
                backend service provider. Supabase employs industry-standard
                security measures, including data encryption, to protect your
                information from unauthorized access, alteration, or disclosure.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We do not store copies of your personal data on our own servers.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                4. Data Sharing and Third Parties
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We do not share your personal information with any third
                parties, except for our essential service provider, Supabase,
                which processes your data on our behalf for authentication and
                database management as described in this policy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                5. User Rights and Data Deletion
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                You have the right to access and control your personal data. If
                you wish to have your account and all associated data
                permanently deleted from our service, please send a deletion
                request to our support email. We will process your request
                within a reasonable timeframe.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                6. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We may update this Privacy Policy from time to time. We will
                notify you of any significant changes by posting the new policy
                on this page and updating the &#34;Effective Date&#34; at the
                top. We encourage you to review this Privacy Policy
                periodically.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                7. Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or your data, please do not hesitate to contact
                us at:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-gray-900 dark:text-white font-medium">
                  support@newsifai.com
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Last updated: July 7, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
