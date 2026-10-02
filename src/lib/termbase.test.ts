import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import path from "node:path";

/** Runs the offline termbase checker against the ES content tree. */
describe("termbase consistency", () => {
  it("ES content uses termbase translations instead of banned EN terms", () => {
    const script = path.resolve(import.meta.dirname, "..", "..", "..", "scripts", "check-termbase.mjs");
    let output = "";
    try {
      output = execFileSync("node", [script], { encoding: "utf8" });
    } catch (error) {
      const detail = error instanceof Error ? `${error.message}\n${"stdout" in error ? String((error as { stdout?: unknown }).stdout ?? "") : ""}` : String(error);
      throw new Error(`Termbase check failed:\n${detail}`);
    }
    expect(output).toContain("PASSED");
  });
});