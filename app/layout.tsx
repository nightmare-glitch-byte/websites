import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Unbounded } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AURA — Explore. Build. Innovate. | GTBIT Technical Society",
  description:
    "AURA, the technical society of GTBIT: research, emerging technology, workshops, competitions and the national ideathon AURATHON.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${manrope.variable} ${unbounded.variable} ${jetBrainsMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
