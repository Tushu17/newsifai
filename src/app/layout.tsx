import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/footer";
import SigninWrapper from "./components/signinwrapper/signinwrapper";
import { UserDataProvider } from "@/contexts";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Loadingbar from "./components/ui/loadingbar/loadingbar";
import RegisterSW from "./components/RegisterSW";

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
    themeColor: "#000000",
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
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Newsifai",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  authors: [{ name: "Newsifai Team", url: "https://newsifai.com" }],
  creator: "Newsifai",
  publisher: "Newsifai",
  openGraph: {
    title: "Newsifai – AI-Powered News",
    description:
      "Your daily AI-curated news digest. No spam. No scroll guilt. Just pure infotainment.",
    url: "https://newsifai.com",
    siteName: "Newsifai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Newsifai – AI-Powered News",
    description:
      "Your daily AI-curated news digest. No spam. No scroll guilt. Just pure infotainment.",
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
          <RegisterSW />
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
