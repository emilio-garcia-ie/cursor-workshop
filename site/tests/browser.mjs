import assert from "node:assert/strict";
import { chromium, webkit, firefox } from "playwright-core";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const axeSourcePath = require.resolve("axe-core/axe.min.js");
const engine = process.env.QA_BROWSER ?? "chromium";

async function axeAudit(page, label) {
  await page.addScriptTag({ path: axeSourcePath });
  const violations = await page.evaluate(async () => {
    const results = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] } });
    return results.violations
      .filter((v) => v.impact === "critical" || v.impact === "serious")
      .map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, help: v.help, target: v.nodes[0]?.target?.join(" ") ?? "" }));
  });
  assert.deepEqual(violations, [], `${label}: axe critical/serious violations`);
}

async function contrastAudit(page, label) {
  const failures = await page.evaluate(() => {
    const parseColor = (value) => {
      const m = value.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
      return m ? [Number(m[1]), Number(m[2]), Number(m[3]), m[4] === undefined ? 1 : Number(m[4])] : null;
    };
    const luminance = ([r, g, b]) => {
      const channel = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
      return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    };
    const ratioOf = (fg, bg) => {
      const l1 = luminance(fg);
      const l2 = luminance(bg);
      return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    };
    const backgroundOf = (el) => {
      let node = el;
      while (node) {
        const color = parseColor(getComputedStyle(node).backgroundColor);
        if (color && color[3] > 0.9) return color;
        node = node.parentElement;
      }
      return [255, 255, 255, 1];
    };
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const failures = [];
    const seen = new Set();
    let textNode;
    while ((textNode = walker.nextNode())) {
      const text = textNode.textContent.trim();
      if (!text) continue;
      const el = textNode.parentElement;
      if (!el || seen.has(el)) continue;
      seen.add(el);
      const style = getComputedStyle(el);
      if (style.visibility === "hidden" || style.display === "none") continue;
      const fg = parseColor(style.color);
      if (!fg) continue;
      const bg = backgroundOf(el);
      const ratio = ratioOf(fg, bg);
      const size = parseFloat(style.fontSize);
      const bold = parseInt(style.fontWeight, 10) >= 700;
      const large = size >= 24 || (size >= 18.66 && bold);
      const needed = large ? 3 : 4.5;
      if (ratio < needed - 0.005) {
        failures.push({ text: text.slice(0, 40), ratio: Math.round(ratio * 100) / 100, needed, tag: el.tagName.toLowerCase() });
      }
    }
    return failures;
  });
  assert.deepEqual(failures, [], `${label}: text contrast below WCAG AA`);
}

const loopbackHost = process.env.QA_HOST === "localhost" ? "localhost" : "127.0.0.1";
const base = `http://${loopbackHost}:3217`;
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", process.env.QA_PRODUCTION ? "start" : "dev", "-p", "3217", "-H", loopbackHost], { stdio: "inherit" });
let browser;
try {
  for (let i = 0; i < 120; i++) {
    try { if ((await fetch(base)).ok) break; } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  browser = engine === "chromium"
    ? await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true })
    : await (engine === "webkit" ? webkit : firefox).launch({ headless: true });
  const context = await browser.newContext({ acceptDownloads: true });
  const errors = [];
  const webkitPrefetchNoise = [];
  context.on("page", opened => opened.on("pageerror", error => {
    // Known WebKit bug (engine, not app): same-origin fetches with custom
    // headers (Next.js RSC prefetches, `?_rsc=`) on non-standard ports are
    // misrouted through CORS access-control checks and fail. Navigations
    // still succeed via fallback; every functional assertion covers this.
    // Any other error — including non-prefetch access-control failures —
    // still fails the suite.
    if (engine === "webkit" && error.message.includes("due to access control checks") && error.message.includes("_rsc=")) {
      webkitPrefetchNoise.push({ url: opened.url(), message: error.message });
      return;
    }
    errors.push({ url: opened.url(), message: error.message });
  }));
  const page = await context.newPage();
  await page.goto(base);
  const legacy = { "01-day-one": { complete: true, outcome: true } };
  await page.evaluate(value => localStorage.setItem("hearthline-progress-v1", JSON.stringify(value)), legacy);
  await page.goto(`${base}/steps/01-day-one`);
  await page.getByRole("checkbox", { name: "Mark step complete (self-report)" }).waitFor();
  await page.waitForFunction(() => document.querySelector('input[type="checkbox"]:not(:disabled)'));
  assert.equal(await page.getByRole("checkbox", { name: "Mark step complete (self-report)" }).isChecked(), true);
  assert.equal(await page.locator("#expected-result").count(), 1);
  assert.equal(await page.locator('input[type="checkbox"]').count(), 1);
  const migrated = await page.evaluate(() => JSON.parse(localStorage.getItem("hearthline-progress-v2")));
  assert.deepEqual(migrated.steps["01-day-one"], { sections: {}, legacy: { complete: true, outcome: true } });
  assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem("hearthline-progress-v1"))), legacy);
  const downloadEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export progress JSON" }).click();
  const download = await downloadEvent;
  const stream = await download.createReadStream();
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  const exported = Buffer.concat(chunks);
  assert.deepEqual(JSON.parse(exported.toString()).steps, migrated.steps);
  await page.reload();
  await page.waitForFunction(() => document.querySelector('input[type="checkbox"]:not(:disabled)'));
  assert.equal(await page.getByRole("checkbox", { name: "Mark step complete (self-report)" }).isChecked(), true);
  await page.getByLabel("Import progress JSON (max 1 MB)").setInputFiles({ name: "backup.json", mimeType: "application/json", buffer: exported });
  await page.getByRole("button", { name: "Confirm replace progress" }).click();
  await page.getByText("Progress imported and saved.", { exact: true }).waitFor();
  assert.equal(await page.getByRole("checkbox", { name: "Mark step complete (self-report)" }).isChecked(), true);
  await page.reload();
  await page.waitForFunction(() => document.querySelector('input[type="checkbox"]:not(:disabled)'));
  assert.equal(await page.getByRole("checkbox", { name: "Mark step complete (self-report)" }).isChecked(), true);
  assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem("hearthline-progress-v2")).steps), migrated.steps);
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator('input[type="checkbox"][disabled]').count(), 0);
  await page.getByRole("tab", { name: "Implement", exact: true }).focus();
  await page.keyboard.press("ArrowLeft");
  assert.equal(await page.getByRole("tab", { name: "The project", exact: true }).getAttribute("aria-selected"), "true");
  await page.keyboard.press("End");
  assert.equal(await page.getByRole("tab", { name: "Quiz", exact: true }).getAttribute("aria-selected"), "true");
  await page.getByRole("tab", { name: "Implement", exact: true }).click();
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => { throw new Error("Denied"); } } }));
  await page.getByRole("button", { name: "Copy code", exact: true }).first().click();
  await page.getByText("Copy failed. Select the code and copy it manually.", { exact: true }).waitFor();
  assert.ok(await page.locator('a[href^="/bibliography#"]').count() > 0);
  const beforeInvalid = await page.evaluate(() => localStorage.getItem("hearthline-progress-v2"));
  await page.getByLabel("Import progress JSON (max 1 MB)").setInputFiles({ name: "invalid.json", mimeType: "application/json", buffer: Buffer.from('{"version":7,"steps":{}}') });
  await page.getByText(/Import rejected; existing progress unchanged/).waitFor();
  assert.equal(await page.evaluate(() => localStorage.getItem("hearthline-progress-v2")), beforeInvalid);
  await page.getByLabel("Import progress JSON (max 1 MB)").setInputFiles({ name: "backup.json", mimeType: "application/json", buffer: exported });
  await page.getByRole("button", { name: "Cancel import" }).click();
  assert.equal(await page.evaluate(() => localStorage.getItem("hearthline-progress-v2")), beforeInvalid);
  const home = await context.newPage();
  await home.goto(base);
  await home.getByRole("link", { name: "Continue: Step 1 · Implement", exact: true }).waitFor();
  await home.getByText(/32 steps remaining · 5 points earned/).waitFor();
  const validStored = await page.evaluate(() => localStorage.getItem("hearthline-progress-v2"));
  const malformed = '  {"version":2, broken é\r\n';
  await page.evaluate(raw => localStorage.setItem("hearthline-progress-v2", raw), malformed);
  await home.locator('p[role="alert"]').waitFor();
  await home.getByText(/32 steps remaining · 5 points earned/).waitFor();
  await home.getByRole("button", { name: "Export last valid snapshot JSON", exact: true }).waitFor();
  const recoveryEvent = home.waitForEvent("download");
  await home.getByRole("button", { name: "Download raw recovery data (hearthline-progress-v2)", exact: true }).click();
  const recoveryDownload = await recoveryEvent;
  const recoveryStream = await recoveryDownload.createReadStream();
  const recoveryChunks = [];
  for await (const chunk of recoveryStream) recoveryChunks.push(chunk);
  assert.deepEqual(Buffer.concat(recoveryChunks), Buffer.from(malformed));
  const recoveryPage = await context.newPage();
  await recoveryPage.goto(base);
  await recoveryPage.locator('p[role="alert"]').waitFor();
  assert.equal(await recoveryPage.getByRole("button", { name: "Export progress JSON", exact: true }).isDisabled(), true);
  await recoveryPage.getByRole("button", { name: "Download raw recovery data (hearthline-progress-v2)", exact: true }).waitFor();
  assert.equal(await recoveryPage.evaluate(() => localStorage.getItem("hearthline-progress-v2")), malformed);
  await page.evaluate(raw => localStorage.setItem("hearthline-progress-v2", raw), validStored);
  await home.getByRole("button", { name: "Export progress JSON", exact: true }).waitFor();
  await recoveryPage.close();
  await page.getByRole("checkbox", { name: "Mark step complete (self-report)" }).uncheck();
  await home.getByText(/33 steps remaining · 0 points earned/).waitFor();
  await page.goto(`${base}/steps/02-clone-and-run`);
  await page.waitForFunction(() => document.querySelector('input[type="checkbox"]:not(:disabled)'));
  assert.equal(await page.getByRole("tab", { name: "Learn", exact: true }).getAttribute("aria-selected"), "true");
  assert.equal(await page.getByRole("checkbox", { name: "Mark step complete (self-report)" }).isChecked(), false);
  await home.getByRole("link", { name: "Continue: Step 2 · Learn", exact: true }).waitFor();
  for (const [version, points, count] of [["short", 215, 10], ["medium", 355, 20], ["long", 520, 33]]) {
    await home.goto(`${base}/?version=${version}`);
    await home.getByText(`${count} steps · ${points} points · ${version}.`, { exact: true }).waitFor();
    assert.equal(await home.locator('li[data-step="6"]').innerText().then(text => text.includes("25 pts")), true);
  }
  await home.goto(`${base}/?version=short&persona=ai-engineers`);
  await home.getByRole("link", { name: "Start next unfinished: Step 6 · Learn", exact: true }).waitFor();
  assert.deepEqual(await home.locator("li[data-step]").evaluateAll(items => items.map(i => Number(i.dataset.step))), [6, 7, 8, 9]);
  await home.getByRole("link", { name: "Start next unfinished: Step 6 · Learn", exact: true }).click();
  await home.getByRole("tab", { name: "Learn", exact: true }).waitFor();
  assert.equal(await home.getByRole("tab", { name: "Learn", exact: true }).getAttribute("aria-selected"), "true");
  const diagrams = await context.newPage();
  await diagrams.goto(`${base}/diagrams`);
  assert.equal(await diagrams.locator('img[src^="/diagrams/"]').count(), 10);
  assert.equal(await diagrams.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), true);
  const nextStep = await context.newPage();
  await nextStep.goto(`${base}/steps/01-day-one`);
  await nextStep.getByRole("link", { name: "Next: Step 2: Clone It and Run It", exact: true }).waitFor();
  await nextStep.getByRole("link", { name: "Next: Step 2: Clone It and Run It", exact: true }).click();
  await nextStep.getByRole("heading", { name: "Step 2: Clone It and Run It" }).waitFor();
  const quizPage = await context.newPage();
  await quizPage.goto(`${base}/steps/01-day-one`);
  await quizPage.getByRole("tab", { name: "Quiz", exact: true }).click();
  await quizPage.getByRole("radiogroup").nth(0).waitFor();
  for (let i = 0; i < 5; i++) await quizPage.locator('[role="radiogroup"]').nth(i).locator('input[type="radio"]').nth(0).check();
  await quizPage.getByRole("button", { name: "Grade my answers" }).click();
  await quizPage.getByText(/Your score: 0 \/ 5/).waitFor();
  await quizPage.reload();
  await quizPage.getByRole("tab", { name: "Quiz", exact: true }).click();
  await quizPage.getByText(/Your score: 0 \/ 5/).waitFor();
  const quizStored = await quizPage.evaluate(() => JSON.parse(localStorage.getItem("hearthline-progress-v2")).quiz?.["01-day-one"]);
  assert.equal(quizStored.score, 0);
  assert.equal(quizStored.graded, true);
  const filePage = await context.newPage();
  await filePage.addInitScript(() => {
    const readFile = () => sessionStorage.getItem("fakeProgressFile") ?? "";
    window.__savedTextRef = readFile;
    const fakeHandle = {
      id: "fake-progress-file",
      getFile: async () => ({ text: async () => readFile() }),
      createWritable: async () => { let pendingText = ""; return { write: async value => { pendingText = value; }, close: async () => { sessionStorage.setItem("fakeProgressFile", pendingText); } }; },
      queryPermission: async () => "granted",
      requestPermission: async () => "granted",
    };
    window.showSaveFilePicker = async () => { window.__pickerCalls = (window.__pickerCalls ?? 0) + 1; return fakeHandle; };
    window.showOpenFilePicker = async () => [fakeHandle];
    const remembered = () => sessionStorage.getItem("fakeHandleRemembered") === "1";
    const backing = new Map(remembered() ? [["current", fakeHandle]] : []);
    const makeRequest = result => { const req = { result, onsuccess: null, onerror: null }; Promise.resolve().then(() => req.onsuccess?.({ target: req })); return req; };
    const fakeDB = {
      transaction: () => ({
        objectStore: () => ({
          get: key => makeRequest(backing.get(key)),
          put: (value, key) => { if (key === "current") sessionStorage.setItem("fakeHandleRemembered", "1"); backing.set(key, value); return makeRequest(undefined); },
          delete: key => { if (key === "current") sessionStorage.removeItem("fakeHandleRemembered"); backing.delete(key); return makeRequest(undefined); },
        }),
      }),
    };
    Object.defineProperty(window, "indexedDB", { configurable: true, value: { open: () => makeRequest(fakeDB) } });
  });
  await filePage.goto(`${base}/steps/01-day-one`);
  await filePage.getByRole("checkbox", { name: "Mark step complete (self-report)" }).waitFor();
  await filePage.evaluate(() => { localStorage.clear(); sessionStorage.removeItem("fakeProgressFile"); sessionStorage.removeItem("fakeHandleRemembered"); });
  await filePage.reload();
  await filePage.getByRole("checkbox", { name: "Mark step complete (self-report)" }).waitFor();
  await filePage.getByRole("button", { name: "Save to hearthline-progress.json" }).waitFor();
  await filePage.getByRole("checkbox", { name: "Mark step complete (self-report)" }).check();
  await filePage.getByRole("button", { name: "Save to hearthline-progress.json" }).click();
  await filePage.getByText(/chosen and saved/).waitFor();
  assert.equal(await filePage.evaluate(() => window.__pickerCalls), 1);
  assert.equal(JSON.parse(await filePage.evaluate(() => window.__savedTextRef())).steps["01-day-one"].complete, true);
  await filePage.evaluate(() => localStorage.clear());
  await filePage.reload();
  await filePage.getByRole("checkbox", { name: "Mark step complete (self-report)" }).waitFor();
  assert.equal(await filePage.getByRole("checkbox", { name: "Mark step complete (self-report)" }).isChecked(), false);
  await filePage.getByRole("button", { name: "Load from saved progress file" }).click();
  await filePage.getByRole("button", { name: "Confirm replace progress" }).click();
  await filePage.getByText("Progress imported and saved.", { exact: true }).waitFor();
  assert.equal(await filePage.getByRole("checkbox", { name: "Mark step complete (self-report)" }).isChecked(), true);
  assert.equal(await filePage.evaluate(() => window.__pickerCalls ?? 0), 0);
  await filePage.getByRole("checkbox", { name: "Mark step complete (self-report)" }).uncheck();
  await filePage.getByRole("button", { name: "Overwrite progress file" }).click();
  await filePage.getByText(/Progress overwritten in hearthline-progress\.json/).waitFor();
  assert.equal(await filePage.evaluate(() => window.__pickerCalls ?? 0), 0);
  assert.equal(JSON.parse(await filePage.evaluate(() => window.__savedTextRef())).steps["01-day-one"].complete, false);
  const esPage = await context.newPage();
  await esPage.goto(`${base}/es/steps/01-day-one`);
  assert.equal(await esPage.evaluate(() => document.documentElement.lang), "es");
  await esPage.getByRole("tab", { name: "El proyecto", exact: true }).waitFor();
  await esPage.getByRole("checkbox", { name: "Marcar el paso completo (autoinforme)" }).waitFor();
  await esPage.getByRole("tab", { name: "Comprobación", exact: true }).click();
  await esPage.getByRole("button", { name: "Calificar mis respuestas" }).waitFor();
  const esNext = esPage.getByRole("link", { name: "Siguiente: Paso 2: Clone It and Run It", exact: true });
  await esNext.waitFor();
  assert.equal(await esNext.getAttribute("href"), "/es/steps/02-clone-and-run");
  await esPage.getByRole("button", { name: "English" }).click();
  await esPage.getByRole("heading", { name: "Step 1: Day One: Meet the Team" }).waitFor();
  assert.equal(await esPage.evaluate(() => document.documentElement.lang), "en");
  assert.equal(await esPage.evaluate(() => localStorage.getItem("hearthline-locale")), "en");
  const esGlossary = await context.newPage();
  await esGlossary.goto(`${base}/es/glossary`);
  assert.equal(await esGlossary.locator("h1").innerText(), "Glosario");
  assert.ok(await esGlossary.locator('a[href^="/es/steps/"]').count() > 0);
  const esBiblio = await context.newPage();
  await esBiblio.goto(`${base}/es/bibliography`);
  assert.equal(await esBiblio.locator("h1").innerText(), "Bibliografía");
  assert.equal(await esBiblio.locator('li[id="1"]').count(), 1);
  assert.ok(await esGlossary.getByRole("link", { name: "Bibliografía" }).count() > 0);
  const esStep = await context.newPage();
  await esStep.goto(`${base}/es/steps/01-day-one`);
  assert.ok(await esStep.locator('a[href^="/es/bibliography#"]').count() > 0);
  await esGlossary.close();
  await esBiblio.close();
  await esStep.close();
  for (const [label, url] of [
    ["EN home", "/"],
    ["ES home", "/es"],
    ["EN step 01", "/steps/01-day-one"],
    ["ES step 01", "/es/steps/01-day-one"],
    ["ES glossary", "/es/glossary"],
    ["ES bibliography", "/es/bibliography"],
  ]) {
    const auditPage = await context.newPage();
    await auditPage.goto(`${base}${url}`);
    await auditPage.locator("main").waitFor();
    await contrastAudit(auditPage, label);
    await axeAudit(auditPage, label);
    await auditPage.close();
  }
  const lastStep = await context.newPage();
  await lastStep.goto(`${base}/steps/33-improvement-loop`);
  await lastStep.getByRole("link", { name: "All steps complete", exact: true }).waitFor();
  assert.equal(await lastStep.getByRole("link", { name: /^Next:/ }).count(), 0);
  await lastStep.getByRole("link", { name: "All steps complete", exact: true }).click();
  await lastStep.getByRole("heading", { name: /Join Hearthline on day one/ }).waitFor();
  await home.getByText("Building · 25 pts", { exact: true }).waitFor();
  await home.setViewportSize({ width: 390, height: 844 });
  assert.equal(await home.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  if (process.env.QA_SCREENSHOT_DIR) {
    await home.screenshot({ path: `${process.env.QA_SCREENSHOT_DIR}/phase-c-mobile.png`, fullPage: true });
    await home.setViewportSize({ width: 1440, height: 1000 });
    await home.screenshot({ path: `${process.env.QA_SCREENSHOT_DIR}/phase-c-desktop.png`, fullPage: true });
    const esHome = await context.newPage();
    await esHome.goto(`${base}/es`);
    await esHome.setViewportSize({ width: 390, height: 844 });
    assert.equal(await esHome.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await esHome.screenshot({ path: `${process.env.QA_SCREENSHOT_DIR}/phase-c-es-mobile.png`, fullPage: true });
    await esHome.setViewportSize({ width: 1440, height: 1000 });
    await esHome.screenshot({ path: `${process.env.QA_SCREENSHOT_DIR}/phase-c-es-desktop.png`, fullPage: true });
    const esStepShot = await context.newPage();
    await esStepShot.goto(`${base}/es/steps/01-day-one`);
    await esStepShot.setViewportSize({ width: 390, height: 844 });
    assert.equal(await esStepShot.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await esStepShot.screenshot({ path: `${process.env.QA_SCREENSHOT_DIR}/phase-c-es-step-mobile.png`, fullPage: true });
    await esStepShot.setViewportSize({ width: 1440, height: 1000 });
    await esStepShot.screenshot({ path: `${process.env.QA_SCREENSHOT_DIR}/phase-c-es-step-desktop.png`, fullPage: true });
    await esHome.close();
    await esStepShot.close();
  }
  assert.deepEqual(errors, []);
  if (webkitPrefetchNoise.length > 0) console.log(`note: ${webkitPrefetchNoise.length} WebKit RSC-prefetch fetches rejected by the engine's access-control bug (functional impact: prefetch-only, navigations verified)`);
  console.log(`PASS (engine=${engine}): migration/retained legacy, single whole-step self-report with expected-result anchor and no per-tab checkboxes, snapshot preserved on malformed v2 with raw recovery byte-exact and disabled empty export, section reconciliation, export/import/reload, invalid/cancel import, keyboard tabs, copy failure, single H1, citations/diagrams, Resume/filter fallback, step footer next/previous with finished state on step 33, quiz grading with persistence across reload, progress file overwrite-in-place and reload pickup without a picker, ES locale with lang attribute, localized UI, locale-correct footer, persistent language toggle, ES glossary/bibliography routes with locale-aware citations and step links, axe + contrast audits on 6 pages, totals 215/355/520 with step 6 at 25 pts, 390px overflow; pageerror listeners on every context page; no client errors`);
} finally {
  await browser?.close();
  server.kill("SIGTERM");
}