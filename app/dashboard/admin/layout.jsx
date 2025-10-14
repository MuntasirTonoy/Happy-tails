"use client";
import { useTheme } from "@/components/ui/ThemeContext";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const { darkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // prevent SSR mismatch
    return null;
  }

  return (
    <div
      className={`flex min-h-screen transition-colors duration-300 overflow-hidden  ${
        darkMode ? "bg-[#0f172a] text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <AdminSidebar />
      <main className="flex-1 w-full min-h-screen p-6 lg:ml-64">
        {children}
      </main>
    </div>
  );
}
