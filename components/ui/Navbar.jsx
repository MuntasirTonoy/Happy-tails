"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  FaBars,
  FaTimes,
  FaPaw,
  FaSearch,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useTheme } from "./ThemeContext";
import Logout from "../auth/Logout/Logout";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md shadow-sm text-base-content">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold text-xl sm:text-2xl"
          >
            <FaPaw className="text-green-600 dark:text-green-400" />
            <span>HappyTails</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex mx-auto max-w-4xl items-center gap-4">
            <LinkItem href="/" label="Home" />
            <LinkItem href="/pets" label="Pets" />
            <LinkItem href="/blogs" label="Blogs" />
            <LinkItem href="/about" label="About Us" />
          </div>

          {/* Right Side Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Search */}
            <button className="hover:text-green-600 dark:hover:text-green-400">
              <FaSearch className="w-5 h-5" />
            </button>

            {/* Theme Switch */}
            <button
              onClick={toggleTheme}
              className="hover:text-green-600 dark:hover:text-green-400"
            >
              {darkMode ? (
                <FaSun className="w-5 h-5 text-yellow-300" />
              ) : (
                <FaMoon className="w-5 h-5 text-yellow-300" />
              )}
            </button>

            {/* Profile / Auth */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full border-2 border-green-600">
                    <img
                      src={user.image || "/default-profile.png"}
                      alt="Profile"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-4 shadow menu menu-sm dropdown-content bg-base-300 rounded-box w-52"
                >
                  <li>
                    <Link href="/dashboard" className="text-lg">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Logout />
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="btn rounded-md btn-outline btn-success btn-sm shadow-none"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn rounded-md btn-success btn-sm shadow-none"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block lg:hidden hover:text-green-600 dark:hover:text-green-400"
          >
            {isOpen ? (
              <FaTimes className="w-7 h-7" />
            ) : (
              <FaBars className="w-7 h-7" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* blur overlay  */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 backdrop-blur-sm z-20 pointer-events-none"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed top-0 left-0 h-full w-72 max-w-[85%] shadow-xl p-6 z-50 bg-base-100 flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg text-base-content font-semibold">
                  Menu
                </span>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-3 flex-grow">
                <LinkItemMobile href="/" label="Home" />
                <LinkItemMobile href="/pets" label="Pets" />
                <LinkItemMobile href="/blogs" label="Blogs" />
                <LinkItemMobile href="/about" label="About Us" />

                <div className="border-t pt-4 mt-4">
                  {user ? (
                    <>
                      <LinkItemMobile href="/dashboard" label="Dashboard" />
                      <Logout />
                    </>
                  ) : (
                    <>
                      <LinkItemMobile href="/login" label="Login" />
                      <LinkItemMobile href="/register" label="Register" />
                    </>
                  )}
                </div>
              </div>

              {/* Bottom (Theme toggle) */}
              <div className="mt-6 flex items-center justify-between">
                <span>Theme</span>
                <button onClick={toggleTheme}>
                  {darkMode ? (
                    <FaSun className="w-5 h-5 text-yellow-300" />
                  ) : (
                    <FaMoon className="w-5 h-5 text-yellow-300" />
                  )}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------ */
/* Helper Components  */
/* ------------------ */

function LinkItem({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "text-green-600 underline underline-offset-4"
          : "hover:text-green-600"
      }`}
    >
      {label}
    </Link>
  );
}

function LinkItemMobile({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-base transition-colors ${
        isActive
          ? "text-green-600 font-semibold"
          : "hover:text-green-600 text-base-content"
      }`}
    >
      {label}
    </Link>
  );
}
