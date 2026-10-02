"use client";

import { createContext, useContext, type ReactNode } from "react";
import { strings, type Locale, type Strings } from "./i18n";

export interface LocaleContextValue { locale: Locale; t: Strings }

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={{ locale, t: strings(locale) }}>{children}</LocaleContext.Provider>;
}

export function useStrings(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("LocaleProvider is required");
  return value;
}

export { strings };
export type { Locale, Strings };
