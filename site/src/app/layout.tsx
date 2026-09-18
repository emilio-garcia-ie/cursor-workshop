import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Disclaimer from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Hearthline Cursor Workshop (Unofficial)",
  description:
    "Join Hearthline on day one, clone the operator console, and ship a real feature while learning every Cursor surface. Unofficial. Cited throughout.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header>
          <Disclaimer />
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-serif text-lg font-bold">
              Hearthline <span style={{ color: "var(--cursor-orange)" }}>Cursor</span> Workshop
            </Link>
            <div className="flex gap-4 text-sm">
              <Link className="underline" href="/steps">Steps</Link>
              <Link className="underline" href="/glossary">Glossary</Link>
              <Link className="underline" href="/bibliography">Bibliography</Link>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
