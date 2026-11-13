/**
 * Discovery capture, kept in this browser only (localStorage), one record per account workspace.
 * Per story: how much it hurts (0 = not rated, 1 to 5) and what the customer said.
 * Per account: the catalog blocks the customer already owns, the customer contact and the agreed next step.
 */
export interface StoryNote { rating: number; note: string; updated: string }
export interface AccountMeta { owned: string[]; contact: string; nextStep: string }
export interface AccountState extends AccountMeta { stories: Record<string, StoryNote> }
export interface AccountExport extends AccountState { app: typeof APP; version: 1; account: string; exported: string }

export const APP = "healthcare-connected";
const KEY = (acct: string) => `${APP}:v1:${acct}`;
const PREF = `${APP}:workspace`;

const empty = (): AccountState => ({ stories: {}, owned: [], contact: "", nextStep: "" });
const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");
const clampRating = (v: unknown) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.max(0, Math.min(5, n)) : 0; };

/** Accept anything that was once valid JSON and return a well-formed state. */
function sanitize(raw: unknown): AccountState {
  const out = empty();
  if (!raw || typeof raw !== "object") return out;
  const r = raw as Record<string, unknown>;
  if (r.stories && typeof r.stories === "object") {
    for (const [id, v] of Object.entries(r.stories as Record<string, unknown>)) {
      if (!v || typeof v !== "object" || !/^[\w-]{1,64}$/.test(id)) continue;
      const s = v as Record<string, unknown>;
      const note: StoryNote = { rating: clampRating(s.rating), note: str(s.note, 4000), updated: str(s.updated, 40) };
      if (note.rating || note.note) out.stories[id] = note;
    }
  }
  if (Array.isArray(r.owned)) out.owned = [...new Set(r.owned.filter((x): x is string => typeof x === "string" && /^[\w-]{1,64}$/.test(x)))];
  out.contact = str(r.contact, 400); out.nextStep = str(r.nextStep, 2000);
  return out;
}

// localStorage can be missing or blocked (private mode, some file:// setups): fall back to memory for the session.
const mem = new Map<string, string>();
function read(k: string): string | null { try { return localStorage.getItem(k); } catch { return mem.get(k) ?? null; } }
function write(k: string, v: string) { try { localStorage.setItem(k, v); } catch { mem.set(k, v); } }
function drop(k: string) { try { localStorage.removeItem(k); } catch { /* memory only */ } mem.delete(k); }

const cache = new Map<string, AccountState>();
const subs = new Set<(acct: string) => void>();
try { addEventListener("storage", () => cache.clear()); } catch { /* not in a window */ }

function get(acct: string): AccountState {
  let s = cache.get(acct);
  if (!s) { let raw: unknown; try { raw = JSON.parse(read(KEY(acct)) ?? "null"); } catch { raw = null; } s = sanitize(raw); cache.set(acct, s); }
  return s;
}
function save(acct: string) { write(KEY(acct), JSON.stringify(get(acct))); for (const f of subs) f(acct); }
function touch(acct: string, id: string): StoryNote { const s = get(acct); const n = (s.stories[id] ??= { rating: 0, note: "", updated: "" }); n.updated = new Date().toISOString(); return n; }
function prune(acct: string, id: string) { const s = get(acct), n = s.stories[id]; if (n && !n.rating && !n.note.trim()) delete s.stories[id]; }

export const store = {
  /** The whole record for one account. Treat it as read-only; change it through the setters. */
  get,
  /** One story's capture, or an empty one. */
  story(acct: string, id: string): StoryNote { return get(acct).stories[id] ?? { rating: 0, note: "", updated: "" }; },
  setRating(acct: string, id: string, rating: number) { touch(acct, id).rating = clampRating(rating); prune(acct, id); save(acct); },
  setNote(acct: string, id: string, note: string) { touch(acct, id).note = str(note, 4000); prune(acct, id); save(acct); },
  /** Stories with a rating or a note, highest rating first, then most recently updated. */
  rated(acct: string): [string, StoryNote][] { return Object.entries(get(acct).stories).filter(([, n]) => n.rating > 0 || n.note.trim()).sort((a, b) => b[1].rating - a[1].rating || b[1].updated.localeCompare(a[1].updated)); },
  isOwned(acct: string, item: string) { return get(acct).owned.includes(item); },
  setOwned(acct: string, item: string, on: boolean) { const s = get(acct); s.owned = s.owned.filter((x) => x !== item); if (on) s.owned.push(item); save(acct); },
  setMeta(acct: string, patch: Partial<Pick<AccountMeta, "contact" | "nextStep">>) { const s = get(acct); if (patch.contact !== undefined) s.contact = str(patch.contact, 400); if (patch.nextStep !== undefined) s.nextStep = str(patch.nextStep, 2000); save(acct); },
  /** Everything stored for this account, as a JSON document. */
  exportJSON(acct: string): string { const doc: AccountExport = { app: APP, version: 1, account: acct, exported: new Date().toISOString(), ...get(acct) }; return JSON.stringify(doc, null, 2); },
  /** The account id a JSON export was made from, or "" when the text is not one of our exports. */
  peekAccount(json: string): string { try { const d = JSON.parse(json); return d && d.app === APP && typeof d.account === "string" ? d.account : ""; } catch { return ""; } },
  /** Replace this account's record with an exported one. Returns how many stories it holds; throws on a file that is not ours. */
  importJSON(acct: string, json: string): number {
    let d: unknown; try { d = JSON.parse(json); } catch { throw new Error("That file is not valid JSON."); }
    if (!d || typeof d !== "object" || (d as Record<string, unknown>).app !== APP) throw new Error("That file is not an export from this tool.");
    cache.set(acct, sanitize(d)); save(acct); return Object.keys(get(acct).stories).length;
  },
  clear(acct: string) { cache.delete(acct); drop(KEY(acct)); for (const f of subs) f(acct); },
  /** Called after every change with the account id. Returns the function that unsubscribes. */
  subscribe(fn: (acct: string) => void) { subs.add(fn); return () => { subs.delete(fn); }; },
  /** The workspace the presenter last chose. */
  lastWorkspace(): string { return read(PREF) ?? ""; },
  rememberWorkspace(acct: string) { write(PREF, acct); },
};
