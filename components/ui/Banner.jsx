"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeContext";


export default function Banner() {
  const { darkMode } = useTheme();

  return (
    <section
      className="relative bg-base-100 text-base-content bg-cover bg-center min-h-[70vh] md:min-h-[90vh] flex items-center justify-center text-center"
      style={{
        backgroundImage: "url('/images/banner.jpg')",
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          backgroundColor: darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.0008)",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 sm:px-8 md:px-12">
        <h1 className="text-3xl sm:text-4xl text-stone-50 md:text-5xl lg:text-6xl font-bold mb-4">
          Find Your New Best Friend
        </h1>
        <p className="  sm:text-lg text-stone-50 md:text-xl mb-6">
          Welcome to <span className="font-semibold">Happy Tails</span> — the place where loving families meet their furry companions. Adopt, care, and create lifelong memories with your pets.
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
