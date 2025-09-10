import "./globals.css";

export const metadata = {
  title: "Happt Tails ",
  description: "A Pet Adoption Portal ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
