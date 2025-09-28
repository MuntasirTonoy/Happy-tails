import Navbar from "@/components/ui/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeContext";
import Footer from "@/components/ui/Footer";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Happy Tails",
  description: "A Pet Adoption Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
