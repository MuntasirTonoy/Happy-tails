"use client";

import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { ThemeProvider } from "@/components/ui/ThemeContext";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AnimatePresence>
            {!hideNavbar && (
              <motion.div
                key="navbar"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Navbar />
              </motion.div>
            )}
          </AnimatePresence>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
