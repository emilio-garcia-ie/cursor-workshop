import { describe, expect, it } from "vitest";
import * as adapter from "./fileProgress";

interface FakeHandle {
  kind: "file";
  name: string;
  id: string;
  content: string;
  writes: string[];
}

function makeHandle(name: string, id: string, content = ""): FakeHandle {
  return { kind: "file", name, id, content, writes: [] };
}

function stubFileApi(handles: FakeHandle[]) {
  const window = globalThis as unknown as {
    showSaveFilePicker?: () => Promise<unknown>;
    showOpenFilePicker?: () => Promise<unknown[]>;
  };
  window.showSaveFilePicker = async () => {
    const handle = makeHandle("hearthline-progress.json", `saved-${handles.length}`);
    handles.push(handle);
    return handle;
  };
  window.showOpenFilePicker = async () => {
    if (!handles.length) throw new Error("No files");
    return [handles[handles.length - 1]];
  };
}

function stubHandleOps() {
  adapter.__setHandleOpsForTest({
    queryPermission: async (handle: unknown) => {
      const h = handle as FakeHandle;
      return h.id.startsWith("saved-") ? "granted" : "prompt";
    },
    requestPermission: async (handle: unknown) => {
      const h = handle as FakeHandle;
      h.id = `saved-${h.id}`;
      return "granted";
    },
    readText: async (handle: unknown) => (handle as FakeHandle).content,
    writeText: async (handle: unknown, text: string) => {
      const h = handle as FakeHandle;
      h.content = text;
      h.writes.push(text);
    },
  });
  adapter.__setHandleStoreForTest(new Map<string, unknown>());
}

describe("progress file adapter", () => {
  it("picks a save target and returns its id (RED: missing pickFile)", async () => {
    const handles: FakeHandle[] = [];
    stubFileApi(handles); stubHandleOps();
    const target = await adapter.pickSaveFile();
    expect(target).toBeTruthy();
    expect(handles).toHaveLength(1);
  });

  it("saves by overwriting the same remembered handle (RED: missing saveToFile)", async () => {
    const handles: FakeHandle[] = [];
    stubFileApi(handles); stubHandleOps();
    const first = await adapter.pickSaveFile();
    await adapter.saveToFile(first, "one");
    await adapter.saveToFile(first, "two");
    expect(handles[0].content).toBe("two");
    expect(handles[0].writes).toEqual(["one", "two"]);
    expect(handles).toHaveLength(1);
  });

  it("remembers the handle so a revisit auto-loads without a picker (RED: missing readRemembered)", async () => {
    const handles: FakeHandle[] = [];
    stubFileApi(handles); stubHandleOps();
    const target = await adapter.pickSaveFile();
    await adapter.saveToFile(target, '{"version":2,"steps":{}}');
    await adapter.remember(target);
    const restored = await adapter.readRemembered();
    expect(restored).toBe(target);
    expect(restored).toBeTruthy();
  });

  it("reads the remembered file content (RED: missing readFile)", async () => {
    const handles: FakeHandle[] = [];
    stubFileApi(handles); stubHandleOps();
    const target = await adapter.pickSaveFile();
    await adapter.saveToFile(target, '{"version":2,"steps":{}}');
    await adapter.remember(target);
    const text = await adapter.readRememberedFile();
    expect(text).toBe('{"version":2,"steps":{}}');
  });

  it("returns null for readRemembered when nothing is remembered", async () => {
    stubHandleOps();
    adapter.__setHandleStoreForTest(new Map());
    expect(await adapter.readRemembered()).toBeNull();
  });

  it("forgets the remembered handle", async () => {
    const handles: FakeHandle[] = [];
    stubFileApi(handles); stubHandleOps();
    const target = await adapter.pickSaveFile();
    await adapter.remember(target);
    await adapter.forget();
    expect(await adapter.readRemembered()).toBeNull();
  });

  it("reports no FS Access support when the picker APIs are absent", async () => {
    const window = globalThis as unknown as { showSaveFilePicker?: unknown; showOpenFilePicker?: unknown };
    delete window.showSaveFilePicker; delete window.showOpenFilePicker;
    expect(adapter.isFileSystemAccessSupported()).toBe(false);
  });
});