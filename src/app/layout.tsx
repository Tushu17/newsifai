import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/footer";
import SigninWrapper from "./components/signinwrapper/signinwrapper";
import { UserDataProvider } from "@/contexts";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Loadingbar from "./components/ui/loadingbar/loadingbar";

const geistInter = Geist({
  variable: "--font-geist-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-serif",
  subsets: ["latin"],
});

// this is because navbar is scrolling up in mobile devices
export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    userScalable: true,
    maximumScale: 2.0,
    minimumScale: 1,
  };
}

export const metadata: Metadata = {
  title: "Newsifai – Information wrapped in entertainment",
  description:
    "Newsifai is an AI-powered news platform that curates the most relevant, concise, and intelligent news from across the world — making you smarter with every scroll.",
  keywords: [
    "AI News",
    "AI news aggregator",
    "Newsifai",
    "intelligent news",
    "latest headlines",
    "AI-curated news",
    "real-time news",
    "global news",
    "smart news app",
    "Entertaining news",
  ],
  authors: [{ name: "Newsifai Team", url: "https://newsifai.com" }],
  creator: "Newsifai",
  publisher: "Newsifai",
  openGraph: {
    title: "Newsifai – AI-Powered News",
    description:
      "Your daily AI-curated news digest. No spam. No scroll guilt. Just pure infotainment.",
    url: "https://newsifai.com",
    siteName: "Newsifai",
    images: [
      {
        url: "https://systmzaxlbymwcsrserr.supabase.co/storage/v1/object/public/images//logo.png", // update with your OG image URL
        width: 1200,
        height: 630,
        alt: "Newsifai Open Graph Image",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistInter.variable} ${geistMono.variable} antialiased`}
      >
        <UserDataProvider>
          <SigninWrapper>
            <Loadingbar />
            <Navbar />
            {children}
            <Footer />
          </SigninWrapper>
        </UserDataProvider>
      </body>
    </html>
  );
}
