import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/footer";

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

// const robotoSerif = Roboto_Serif({
//   variable: "--font-roboto-serif",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "News-if-Ai AI-powered news insights!",
  description: "Ai that saves!",
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
        <Loadingbar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
