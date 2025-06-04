import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/footer";

import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Serif } from "next/font/google";

import "./globals.css";

const geistInter = Geist({
  variable: "--font-geist-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-serif",
  subsets: ["latin"],
});

const robotoSerif = Roboto_Serif({
  variable: "--font-roboto-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ai quick news",
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
        className={`${robotoSerif.variable} ${geistInter.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
