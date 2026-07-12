import type { Metadata } from "next";
import { Inter, Newsreader, Pirata_One } from "next/font/google";
import "./globals.css";
import "./mocks.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const pirataOne = Pirata_One({
  variable: "--font-pirata",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "SCALEFORM | Independent Builder Studio",
  description:
    "Scaleform — Independent builder studio. Two students crafting AI-native tools and automation systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} ${pirataOne.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
