import type { Metadata } from "next";
import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";
import LanguageToggle from "@/components/LanguageToggle";
import { strings } from "@/lib/i18n";
import { LocaleProvider } from "@/lib/i18n-client";
import "../globals.css";

export const metadata: Metadata = {
  title: "Taller de Cursor Hearthline (No oficial)",
  description:
    "Únete a Hearthline el primer día, clona la consola del operador y entrega una funcionalidad real mientras aprendes todas las superficies de Cursor. No oficial. Citado en todo el documento.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const t = strings("es");
  return (
    <LocaleProvider locale="es">
      <html lang="es">
        <body className="antialiased">
          <header>
            <Disclaimer locale="es" />
            <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3">
              <Link href="/es" className="font-serif text-lg font-bold">
                Taller de <span style={{ color: "var(--cursor-orange)" }}>Cursor</span> Hearthline
              </Link>
              <div className="flex items-center gap-4 text-sm">
                <Link className="underline" href="/es/steps">{t.navSteps}</Link>
                <Link className="underline" href="/es/glossary">{t.navGlossary}</Link>
                <Link className="underline" href="/es/bibliography">{t.navBibliography}</Link>
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