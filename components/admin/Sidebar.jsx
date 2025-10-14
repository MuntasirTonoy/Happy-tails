"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaHome,
  FaUsers,
  FaBuilding,
  FaPaw,
  FaClipboardList,
  FaBullhorn,
} from "react-icons/fa";
import { useTheme } from "@/components/ui/ThemeContext";

const links = [
  { name: "Overview", href: "/dashboard/admin", icon: <FaHome /> },
  { name: "Manage Users", href: "/dashboard/admin/users", icon: <FaUsers /> },
  { name: "Manage Shelters", href: "/dashboard/admin/shelters", icon: <FaBuilding /> },
  { name: "Manage Pets", href: "/dashboard/admin/pets", icon: <FaPaw /> },
  { name: "Manage Applications", href: "/dashboard/admin/applications", icon: <FaClipboardList /> },
  { name: "Announcements & Tips", href: "/dashboard/admin/announcements", icon: <FaBullhorn /> },
];

export default function AdminSidebar() {
  const pathname = usePathname() || "";
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-[#0f172a]");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-[#0f172a]");
    }
  }, [darkMode]);

  const activeClass =
    "bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-semibold shadow-md backdrop-blur-md border border-white/20";
  const normalClass =
    "hover:bg-gray-400 dark:hover:bg-white/10 hover:text-white transition-all duration-300";

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="fixed top-0 left-0 flex-col hidden w-64 h-screen p-6 border-r shadow-xl lg:flex text-base-content backdrop-blur-2xl border-white/20"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text">
            Admin Panel
          </h2>
          <div className="w-16 h-1 mt-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"></div>
        </div>

        <nav className="flex flex-col flex-1 gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
                pathname === link.href ? activeClass : normalClass
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="font-medium">{link.name}</span>
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-2 mt-6 text-white transition-all shadow-md rounded-xl bg-gradient-to-r from-indigo-400 to-purple-500 hover:shadow-lg"
          >
            {darkMode ? <FaSun className="w-5 h-5 text-yellow-300" /> : <FaMoon className="w-5 h-5" />}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>

          {/* Back to Home */}
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 mt-auto font-medium text-white transition-all shadow-md rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg"
          >
            <FaHome />
            <span>Back to Home</span>
          </Link>
        </nav>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed z-50 p-3 text-white rounded-full shadow-lg bg-gradient-to-r from-emerald-500 to-teal-500 top-4 left-4 lg:hidden"
      >
        <FaBars size={22} />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed top-0 left-0 z-50 flex flex-col w-64 h-full p-6 border-r shadow-2xl bg-white/30 dark:bg-slate-900/40 backdrop-blur-2xl border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text">
                  Admin Panel
                </h2>
                <button onClick={() => setIsOpen(false)}>
                  <FaTimes size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
              </div>

              <nav className="flex flex-col flex-1 gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
                      pathname === link.href ? activeClass : normalClass
                    }`}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span className="font-medium">{link.name}</span>
                  </Link>
                ))}

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 px-4 py-2 mt-6 text-white transition-all shadow-md rounded-xl bg-gradient-to-r from-indigo-400 to-purple-500 hover:shadow-lg"
                >
                  {darkMode ? <FaSun className="w-5 h-5 text-yellow-300" /> : <FaMoon className="w-5 h-5" />}
                  <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                </button>

                {/* Back to Home */}
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 mt-auto font-medium text-white transition-all shadow-md rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg"
                >
                  <FaHome />
                  <span>Back to Home</span>
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
