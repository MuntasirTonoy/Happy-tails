"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiHome } from "react-icons/hi"; 

// React Icons
import {
  FaBars,
  FaTimes,
  FaPaw,
  FaBlog,
  FaInfoCircle,
  FaSignInAlt,
  FaUserPlus,
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
    <nav className="fixed top-0 left-0 w-full z-50 py-4 backdrop-blur-md shadow-sm text-base-content">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl">
          <FaPaw className="text-green-700 dark:text-green-400" />
          <span className="sm:inline">HappyTails</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex mx-auto max-w-4xl py-3 px-5 items-center gap-4">
          <LinkItem href="/" label="Home" icon={<HiHome className="w-4 h-4" />} />
          <LinkItem href="/pets" label="Pets" icon={<FaPaw className="w-4 h-4" />} />

          <LinkItem href="/blogs" label="Blogs" icon={<FaBlog className="w-4 h-4 " />} variant="dark" />
          <LinkItem href="/about" label="About Us" icon={<FaInfoCircle className="w-4 h-4 " />} variant="dark" />
        </div>

        {/* Right Side - Auth & Profile */}
        <div className="hidden lg:flex items-center gap-5 text-gray-700 dark:text-gray-200">
          <button className="hover:text-green-600 dark:hover:text-green-400">
            <FaSearch className="w-5 h-5 text-base-content" />
          </button>

          {/* Theme Switch */}
          <button onClick={toggleTheme} className="hover:text-green-600 dark:hover:text-green-400">
            {darkMode ? <FaSun className="w-5 h-5 text-yellow-300" /> : <FaMoon className="w-5 h-5 text-yellow-300" />}
          </button>

          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2">
                <img
                  src={user.photoURL || "/default-profile.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-green-500"
                />
                <span className="hidden sm:inline">{user.name}</span>
              </button>
              <div className="absolute right-0 mt-2 w-40 text-base-content shadow-lg rounded-lg invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all p-2 flex flex-col gap-2 z-50">
                <button
                  onClick={handleLogout}
                  className="hover:text-green-600 dark:hover:text-green-400 text-left px-2 py-1 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login" className="flex text-base-content items-center gap-1 hover:text-green-600 dark:hover:text-green-400">
                <FaSignInAlt className="w-4 h-4" /> Login
              </Link>
              <Link href="/register" className="flex text-base-content items-center gap-1 hover:text-green-600 dark:hover:text-green-400">
                <FaUserPlus className="w-4 h-4" /> Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block lg:hidden text-base-content hover:text-green-600 dark:hover:text-green-400"
        >
          {isOpen ? <FaTimes className="w-7 h-7" /> : <FaBars className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-green-500 to-green-600 text-white shadow-xl p-6 z-40"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            {/* Theme Toggle in Mobile */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base-content">Theme:</span>
              <button onClick={toggleTheme}>
                {darkMode ? <FaSun className="w-5 h-5 text-yellow-300" /> : <FaMoon className="w-5 h-5 text-yellow-300" />}
              </button>
            </div>

            <div className="flex flex-col text-base-content -ml-2 p-2 gap-4">
              <LinkItemMobile href="/" label="Home" icon={<HiHome />} />
              <LinkItem href="/pets" label="Pets" icon={<FaPaw className="w-4 h-4" />} />
              <LinkItemMobile href="/blogs" label="Blogs" icon={<FaBlog />} />
              <LinkItemMobile href="/about" label="About Us" icon={<FaInfoCircle />} />

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
                  <LinkItemMobile href="/login" label="Login" icon={<FaSignInAlt />} />
                  <LinkItemMobile href="/register" label="Register" icon={<FaUserPlus />} />
                </>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </nav>
  );
}


/* LinkItem Desktop */
function LinkItem({ href, label, icon, variant = "light" }) {
  let baseStyle = "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  let style = "";

  if (variant === "dropdown") {
    style = "text-gray-700 dark:text-gray-200 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700";
  } else if (variant === "dark") {
    style = "hover:text-green-600  dark:hover:bg-gray-700 dark:hover:text-green-400";
  } else {
    style = "hover:text-green-600  dark:hover:bg-gray-700 dark:hover:text-green-400";
  }

  return (
    <Link href={href} className={`${baseStyle} ${style}`}>
      {icon} {label}
    </Link>
  );
}

/* LinkItem Mobile */
function LinkItemMobile({ href, label, icon }) {
  return (
    <Link href={href} className="flex items-center gap-3 hover:text-green-600 dark:hover:bg-gray-700  p-2 rounded-lg transition-colors">
      {icon} <span>{label}</span>
    </Link>
  );
}
