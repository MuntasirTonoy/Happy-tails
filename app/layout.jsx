import Navbar from "@/components/ui/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeContext";
import Footer from "@/components/ui/Footer";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Happy Tails",
  description: "A Pet Adoption Portal",
};

import { Toaster } from "react-hot-toast";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeProvider>
            <Navbar />
            {children}
            <Toaster position="top-right" />
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
