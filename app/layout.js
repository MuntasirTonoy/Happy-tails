import "./globals.css";

export const metadata = {
  title: "Happy Tails ",
  description: "A Pet Adoption Portal ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
