// app/layout.js
import { Geist, Geist_Mono, Playfair_Display, Caveat, Figtree } from "next/font/google";
import { cormorantGaramond, manrope } from "./lib/font";
import "./globals.css";
import UnderlayNav from "./components/UnderlayNav";
import SiteFooter from "./components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "PKR Estate",
  description: "Premium homes, thoughtfully built.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${caveat.variable} ${cormorantGaramond.variable} ${manrope.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
        <UnderlayNav />
        <main data-main className="flex-1" style={{ width: "100%" }}>
          {children}
        </main>
        <div style={{ width: "100%" }}>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}