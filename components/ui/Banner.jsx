"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeContext";
import { ReactTyped } from "react-typed";

const TYPING_STRINGS = [
  "Find Your New Best Friend",
  "Adopt Today, Love Forever"
];

export default function Banner() {
  const { darkMode } = useTheme();

  return (
    <section
      className="relative bg-base-100 text-base-content bg-no-repeat bg-center bg-cover min-h-[70vh] md:min-h-[100vh] flex items-center justify-center text-center"
      style={{
        backgroundImage: "url('/images/heroimage.jpg')",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          backgroundColor: darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.08)",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 sm:px-8 md:px-12 mb-36">
        <h1 className="text-3xl sm:text-4xl text-green-600 md:text-5xl lg:text-6xl font-bold">
          <ReactTyped
            strings={TYPING_STRINGS}
            typeSpeed={80}
            backSpeed={40}
            loop={true}
            backDelay={1500}
            showCursor={false}
          />
        </h1>
        <p className="sm:text-lg text-stone-50 md:text-xl mb-6">
          Welcome to <span className="font-semibold">Happy Tails</span> — the
          place where loving families meet their furry companions. Adopt, care,
          and create lifelong memories with your pets.
        </p>
        <Link href="/pets">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium text-base sm:text-lg mt-8">
            Browse Pets
          </Button>
        </Link>
      </div>
    </section>
  );
}
