"use client";
import React from "react";
import { useTheme } from "./ThemeContext";
import { Button } from "./button";

export default function MakeDifference() {
  const { darkMode } = useTheme();

  return (
    <section className={`relative py-20 transition-colors duration-300 ${darkMode ? "bg-green-300" : "bg-green-100"}`}>
      {/* Overlay */}
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          backgroundColor: darkMode ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.08)",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <div className="hero-content text-center">
          <div className="max-w-md mx-auto">
            <h1
              className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
                darkMode ? "text-gray-100" : "text-stone-900"
              }`}
            >
              Ready To Make a Difference?
            </h1>
            <p
              className={`py-6 transition-colors duration-300 ${
                darkMode ? "text-stone-50" : "text-stone-700"
              }`}
            >
              Join our community of animal lovers and help us find homes for pets in need. Your new best friend is waiting!
            </p>
            <Button
              className={`px-6 py-3 rounded-lg font-medium text-base sm:text-lg mt-8 transition-colors duration-300 ${
                darkMode
                  ? "bg-green-600 hover:bg-green-400 text-white"
                  : "bg-green-400 hover:bg-green-600 text-white"
              }`}
            >
              Start Your Adoption Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
