import { strings, type Locale } from "@/lib/i18n";

/** Persistent unofficial-workshop disclaimer. Rendered in the header on every route. */
export default function Disclaimer({ locale = "en" }: { locale?: Locale }) {
  return (
    <p
      data-testid="disclaimer"
      className="w-full bg-stone-900 px-4 py-2 text-center text-sm text-white"
    >
      {strings(locale).disclaimer}
    </p>
  );
}