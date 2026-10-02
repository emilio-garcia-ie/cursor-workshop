/** Persistent unofficial-workshop disclaimer. Rendered in the header on every route. */
export default function Disclaimer() {
  return (
    <p
      data-testid="disclaimer"
      className="w-full bg-stone-900 px-4 py-2 text-center text-sm text-white"
    >
      Unofficial workshop — one person&apos;s version of how to teach Cursor. Not
      affiliated with, endorsed by, or sponsored by Cursor (Anysphere).
    </p>
  );
}
