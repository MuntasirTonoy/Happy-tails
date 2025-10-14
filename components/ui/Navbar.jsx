"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
// React Icons
import {
  FaBars,
  FaTimes,
  FaPaw,
  FaSearch,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useTheme } from "./ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full py-2 shadow-sm md:py-2 lg:py-1 backdrop-blur-md text-base-content">
        <div className="flex items-center justify-between px-4 mx-auto max-w-7xl">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-extrabold"
          >
            <FaPaw className="text-green-600 dark:text-green-400" />
            <span className="sm:inline">HappyTails</span>
          </Link>

          {/* Desktop Menu */}
          <div className="items-center hidden max-w-4xl gap-4 px-5 py-3 mx-auto lg:flex">
            <LinkItem href="/" label="Home" />
            <LinkItem href="/pets" label="Pets" />
            <LinkItem href="/blogs" label="Blogs" variant="dark" />
            <LinkItem href="/about" label="About Us" variant="dark" />
          </div>

          {/* Right Side - Auth & Profile */}
          <div className="items-center hidden gap-5 text-gray-700 lg:flex dark:text-gray-200">
            <button className="hover:text-green-600 dark:hover:text-green-400">
              <FaSearch className="w-5 h-5 text-base-content" />
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

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2">
                  <img
                    src={user.photoURL || "/default-profile.png"}
                    alt="Profile"
                    className="w-8 h-8 border-2 border-green-600 rounded-full"
                  />
                  <span className="hidden sm:inline">{user.name}</span>
                </button>
                <div className="absolute right-0 z-50 flex flex-col invisible w-40 gap-2 p-2 mt-2 transition-all rounded-lg shadow-lg opacity-0 text-base-content group-hover:visible group-hover:opacity-100">
                  <button
                    onClick={handleLogout}
                    className="px-2 py-1 text-left rounded hover:text-green-600 dark:hover:text-green-400"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-1 px-3 py-2 font-bold text-green-600 bg-green-200 rounded-md hover:text-green-600 dark:hover:text-green-500"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1 px-3 py-2 font-bold text-white bg-green-600 rounded-md hover:text-green-100 dark:hover:text-green-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block lg:hidden text-base-content hover:text-green-600 dark:hover:text-green-400"
          >
            {isOpen ? (
              <FaTimes className="w-7 h-7" />
            ) : (
              <FaBars className="w-7 h-7" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer and  Main content Blur */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* blur overlay  */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-20 pointer-events-none backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed top-0 left-0 z-30 w-64 h-full p-6 text-white bg-green-700 shadow-xl dark:bg-green-500"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">Menu</span>
                <button onClick={() => setIsOpen(false)}>
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              {/* Theme Toggle  Mobile */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-base-content">Theme:</span>
                <button onClick={toggleTheme}>
                  {darkMode ? (
                    <FaSun className="w-5 h-5 text-yellow-300" />
                  ) : (
                    <FaMoon className="w-5 h-5 text-yellow-300" />
                  )}
                </button>
              </div>

              <div className="flex flex-col gap-4 p-2 -ml-2 text-base-content">
                <LinkItemMobile href="/" label="Home" />
                <LinkItemMobile href="/pets" label="Pets" />
                <LinkItemMobile href="/blogs" label="Blogs" />
                <LinkItemMobile href="/about" label="About Us" />

                {user ? (
                  <div className="flex flex-col gap-2 mt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-400"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <LinkItemMobile href="/login" label="Login" />
                    <LinkItemMobile href="/register" label="Register" />
                  </>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/*  */
function LinkItem({ href, label, icon, variant = "light" }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  let baseStyle =
    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  let style = "";

  if (variant === "dropdown") {
    style =
      "text-gray-700 dark:text-gray-200 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700";
  } else if (variant === "dark") {
    style =
      "hover:text-green-600 dark:hover:bg-gray-700 dark:hover:text-green-400";
  } else {
    style =
      "hover:text-green-600 dark:hover:bg-gray-700 dark:hover:text-green-400";
  }

  return (
    <Link
      href={href}
      className={`${baseStyle} ${style} ${
        isActive ? "text-base-content underline underline-offset-4" : ""
      }`}
    >
      {icon} {label}
    </Link>
  );
}

/* LinkItem Mobile */
function LinkItemMobile({ href, label, icon }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 hover:text-green-600 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors ${
        isActive ? "text-base-content underline underline-offset-4" : ""
      }`}
    >
      {icon} <span>{label}</span>
    </Link>
  );
}
