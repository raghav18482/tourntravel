import { Fraunces, Manrope } from "next/font/google";

// Headings only use weight 600, so a single static file keeps the download small.
export const display = Fraunces({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-fraunces",
  display: "swap",
});

export const body = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
