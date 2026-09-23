export const PROGRESS_FILE_NAME = "hearthline-progress.json";
export const HANDLE_STORE_DB = "hearthline-progress-file";
export const HANDLE_STORE = "handles";
export const HANDLE_KEY = "current";

interface HandleOps {
  queryPermission(handle: unknown): Promise<string>;
  requestPermission(handle: unknown): Promise<string>;
  readText(handle: unknown): Promise<string>;
  writeText(handle: unknown, text: string): Promise<void>;
}
interface HandleStore {
  get(key: string): Promise<unknown>;
  set(key: string, value: unknown): Promise<void>;
  delete(key: string): Promise<void>;
}

function defaultOps(): HandleOps {
  return {
    async queryPermission(handle) {
      const h = handle as { queryPermission?: (o: { mode: string }) => Promise<string> };
      return h.queryPermission?.({ mode: "readwrite" }) ?? "granted";
    },
    async requestPermission(handle) {
      const h = handle as { requestPermission?: (o: { mode: string }) => Promise<string> };
      return h.requestPermission?.({ mode: "readwrite" }) ?? "granted";
    },
    async readText(handle) {
      const h = handle as { getFile(): Promise<{ text(): Promise<string> }> };
      return (await h.getFile()).text();
    },
    async writeText(handle, text) {
      const h = handle as { createWritable(): Promise<{ write(t: string): Promise<void>; close(): Promise<void> }> };
      const writable = await h.createWritable();
      await writable.write(text);
      await writable.close();
    },
  };
}

function memoryStore(backing = new Map<string, unknown>()): HandleStore {
  return {
    async get(key) { return backing.get(key); },
    async set(key, value) { backing.set(key, value); },
    async delete(key) { backing.delete(key); },
  };
}

function idbStore(): HandleStore {
  const idb = (globalThis as { indexedDB?: IDBFactory }).indexedDB;
  if (!idb) return memoryStore();
  let dbPromise: Promise<IDBDatabase> | null = null;
  const db = () => {
    if (!dbPromise) {
      dbPromise = new Promise((resolve, reject) => {
        const request = idb.open(HANDLE_STORE_DB, 1);
        request.onupgradeneeded = () => { request.result.createObjectStore(HANDLE_STORE); };
        request.onsuccess = () => { resolve(request.result); };
        request.onerror = () => { reject(request.error); };
      });
    }
    return dbPromise;
  };
  const tx = async (mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest) => {
    const database = await db();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(HANDLE_STORE, mode);
      const request = run(transaction.objectStore(HANDLE_STORE));
      request.onsuccess = () => { resolve(request.result); };
      request.onerror = () => { reject(request.error); };
    });
  };
  return {
    async get(key) { return tx("readonly", store => store.get(key)); },
    async set(key, value) { await tx("readwrite", store => store.put(value, key)); },
    async delete(key) { await tx("readwrite", store => store.delete(key)); },
  };
}

let ops: HandleOps | null = null;
let store: HandleStore | null = null;
let currentHandle: unknown = null;

function handleOps(): HandleOps { return ops ?? (ops = defaultOps()); }
function handleStore(): HandleStore { return store ?? (store = idbStore()); }

/** Injectable seams used by the unit tests. */
export function __setHandleOpsForTest(value: HandleOps) { ops = value; }
export function __setHandleStoreForTest(value: Map<string, unknown>) {
  store = memoryStore(value);
  currentHandle = null;
}

export function isFileSystemAccessSupported(): boolean {
  return typeof globalThis !== "undefined" &&
    typeof (globalThis as { showSaveFilePicker?: unknown }).showSaveFilePicker === "function" &&
    typeof (globalThis as { showOpenFilePicker?: unknown }).showOpenFilePicker === "function";
}

/** Ask the user to pick/create the single progress file. Returns the handle id. */
export async function pickSaveFile(): Promise<string> {
  if (!isFileSystemAccessSupported()) throw new Error("File System Access API is not supported in this browser");
  const picker = (globalThis as unknown as { showSaveFilePicker: (options: unknown) => Promise<unknown> }).showSaveFilePicker;
  const handle = await picker({
    suggestedName: PROGRESS_FILE_NAME,
    types: [{ description: "Progress JSON", accept: { "application/json": [".json"] } }],
  });
  const api = handleOps();
  if ((await api.queryPermission(handle)) !== "granted") await api.requestPermission(handle);
  currentHandle = handle;
  return describe(handle);
}

/** Overwrite the file that a previously picked id refers to. */
export async function saveToFile(id: string, text: string): Promise<void> {
  const handle = await handleFor(id);
  await handleOps().writeText(handle, text);
}

/** Persist the current handle so future visits auto-load it without a picker. */
export async function remember(id: string): Promise<void> {
  const handle = await handleFor(id);
  await handleStore().set(HANDLE_KEY, handle);
}

/** Return the remembered handle id, or null. Re-requests permission when needed. */
export async function readRemembered(): Promise<string | null> {
  const handle = (await handleStore().get(HANDLE_KEY)) ?? currentHandle;
  if (!handle) return null;
  const api = handleOps();
  if ((await api.queryPermission(handle)) === "prompt") {
    const granted = await api.requestPermission(handle);
    if (granted !== "granted") return null;
  }
  currentHandle = handle;
  return describe(handle);
}

/** Read the remembered file's text (auto-pickup without a file chooser). */
export async function readRememberedFile(): Promise<string | null> {
  const handle = (await handleStore().get(HANDLE_KEY)) ?? currentHandle;
  if (!handle) return null;
  return handleOps().readText(handle);
}

/** Clear the remembered handle. */
export async function forget(): Promise<void> {
  await handleStore().delete(HANDLE_KEY);
  currentHandle = null;
}

async function handleFor(id: string): Promise<unknown> {
  if (currentHandle && describe(currentHandle) === id) return currentHandle;
  const handle = await handleStore().get(HANDLE_KEY);
  if (!handle) throw new Error("No remembered progress file");
  if (describe(handle) !== id) throw new Error("Remembered file id does not match the requested target");
  currentHandle = handle;
  return handle;
}

function describe(handle: unknown): string {
  const h = handle as { id?: string; name?: string };
  return h.id ?? h.name ?? String(handle);
}