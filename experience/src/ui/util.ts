/** Small helpers shared by the interface modules. */
export const $ = <T extends HTMLElement = HTMLElement>(s: string) => document.querySelector(s) as T;
export const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** Colour class of an availability tag: green for generally available, amber for beta, alpha or controlled, dashed for the rest. */
export const tagCls = (t: string) => (/GA|Available/i.test(t) && !/beta|alpha/i.test(t.split(";")[0]) ? "ga" : /beta|alpha|controlled|license|separate/i.test(t) ? "beta" : "road");
/** True when a catalog tag says generally available ("GA" or "GA (US)"). */
export const isGA = (tag: string) => /^GA\b/.test(tag);

/** "a", "a and b", "a, b and c". */
export const list = (xs: string[]) => (xs.length < 2 ? xs.join("") : xs.slice(0, -1).join(", ") + " and " + xs[xs.length - 1]);
export const plural = (n: number, one: string, many = one + "s") => `${n} ${n === 1 ? one : many}`;

/** True when the event comes from a field the user types in. */
export function isTyping(t: EventTarget | null): boolean {
  const el = t as HTMLElement | null;
  return !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable);
}

export function download(name: string, text: string, mime: string) {
  const url = URL.createObjectURL(new Blob([text], { type: mime + ";charset=utf-8" }));
  const a = document.createElement("a"); a.href = url; a.download = name; a.style.display = "none";
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export async function copyText(text: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(text); return true; } catch { /* fall through to the legacy path */ }
  const ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;left:-9999px;top:0";
  document.body.appendChild(ta); ta.select(); let ok = false; try { ok = document.execCommand("copy"); } catch { ok = false; } ta.remove(); return ok;
}

/** Ask for one file and hand back its text. */
export function pickFile(accept: string): Promise<string | null> {
  return new Promise((resolve) => {
    const inp = document.createElement("input"); inp.type = "file"; inp.accept = accept; inp.style.display = "none";
    inp.onchange = async () => { const f = inp.files?.[0]; inp.remove(); resolve(f ? await f.text() : null); };
    inp.addEventListener("cancel", () => { inp.remove(); resolve(null); });
    document.body.appendChild(inp); inp.click();
  });
}

const svg = (d: string) => `<svg class="ico" viewBox="0 0 16 16" width="1.15em" height="1.15em" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
export const ICON = {
  search: svg('<circle cx="7" cy="7" r="4.3"/><path d="M10.3 10.3 14 14"/>'),
  plan: svg('<rect x="3" y="2.6" width="10" height="11.4" rx="1.6"/><path d="M6 2.6V1.6h4v1"/><path d="m5.6 8.4 1.6 1.6 3.2-3.4"/>'),
  notes: svg('<path d="M4 1.8h5.6L12.6 5v9.2H4z"/><path d="M9.4 1.8V5.2h3.2"/><path d="M6.2 8h4.2M6.2 10.6h4.2"/>'),
  sources: svg('<path d="M2.6 3.2h4a1.6 1.6 0 0 1 1.6 1.6V13a1.4 1.4 0 0 0-1.4-1.2H2.6z"/><path d="M13.4 3.2h-4A1.6 1.6 0 0 0 7.8 4.8V13a1.4 1.4 0 0 1 1.4-1.2h4.2z"/>'),
  full: svg('<path d="M2.6 6V2.6H6M10 2.6h3.4V6M13.4 10v3.4H10M6 13.4H2.6V10"/>'),
  play: svg('<path d="M5 3.2v9.6L12.6 8z" fill="currentColor" stroke="none"/>'),
};
