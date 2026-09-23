import type { Metadata } from "next";
import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";
import LanguageToggle from "@/components/LanguageToggle";
import { strings } from "@/lib/i18n";
import { LocaleProvider } from "@/lib/i18n-client";
import "../globals.css";

export const metadata: Metadata = {
  title: "Hearthline Cursor Workshop (Unofficial)",
  description:
    "Join Hearthline on day one, clone the operator console, and ship a real feature while learning every Cursor surface. Unofficial. Cited throughout.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const t = strings("en");
  return (
    <LocaleProvider locale="en">
      <html lang="en">
        <body className="antialiased">
          <header>
            <Disclaimer locale="en" />
            <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3">
              <Link href="/" className="font-serif text-lg font-bold">
                Hearthline <span style={{ color: "var(--cursor-orange)" }}>Cursor</span> Workshop
              </Link>
              <div className="flex items-center gap-4 text-sm">
                <Link className="underline" href="/steps">{t.navSteps}</Link>
                <Link className="underline" href="/glossary">{t.navGlossary}</Link>
                <Link className="underline" href="/bibliography">{t.navBibliography}</Link>
                <LanguageToggle />
              </div>
            </nav>
          </header>
          {children}
        </body>
      </html>
    </LocaleProvider>
  );
}