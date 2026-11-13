import { ICON, esc } from "./util";

/** One thing the command palette can open. `hay` is the lower-case text the query is matched against. */
export interface PalItem { kind: "story" | "block" | "go"; id: string; label: string; sub: string; hay: string; tag?: string; tagCls?: string }

const KIND: Record<PalItem["kind"], string> = { story: "Stories", block: "Platform blocks", go: "Go to" };
const ORDER: PalItem["kind"][] = ["story", "block", "go"];

/** A centred search box over the stage: type to filter, Up and Down to move, Enter to open, Escape to close. */
export class Palette {
  private el: HTMLElement; private input: HTMLInputElement; private listEl: HTMLElement; private countEl: HTMLElement;
  private shown: PalItem[] = []; private cur = 0; private back: HTMLElement | null = null;

  constructor(host: HTMLElement, private source: () => PalItem[], private onPick: (it: PalItem) => void) {
    this.el = document.createElement("div"); this.el.className = "pal hidden"; this.el.id = "pal";
    this.el.innerHTML = `<div class="pal-box" role="dialog" aria-modal="true" aria-label="Search stories and platform blocks">
      <div class="pal-in">${ICON.search}<label class="vh" for="palIn">Search stories and platform blocks</label>
        <input id="palIn" type="text" placeholder="Search stories and platform blocks" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="palList" aria-autocomplete="list" /><kbd>Esc</kbd></div>
      <div class="pal-list" id="palList" role="listbox" aria-label="Results"></div>
      <div class="pal-ft"><span><kbd>&uarr;</kbd><kbd>&darr;</kbd> move</span><span><kbd>Enter</kbd> open</span><span class="n" id="palN" aria-live="polite"></span></div></div>`;
    host.appendChild(this.el);
    this.input = this.el.querySelector("input")!; this.listEl = this.el.querySelector(".pal-list")!; this.countEl = this.el.querySelector("#palN")!;
    this.input.addEventListener("input", () => { this.cur = 0; this.paint(); });
    // Keys typed here never reach the global shortcuts.
    this.el.addEventListener("keydown", (e) => {
      e.stopPropagation();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); this.close(); return; }
      if (e.key === "Escape") { e.preventDefault(); this.close(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); this.move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); this.move(-1); }
      else if (e.key === "Enter") { e.preventDefault(); this.pick(this.cur); }
      else if (e.key === "Tab") { e.preventDefault(); this.move(e.shiftKey ? -1 : 1); }
    });
    this.el.addEventListener("mousedown", (e) => { if (e.target === this.el) this.close(); });
    this.listEl.addEventListener("click", (e) => { const b = (e.target as HTMLElement).closest("[data-i]") as HTMLElement | null; if (b) this.pick(+b.dataset.i!); });
    this.listEl.addEventListener("mousemove", (e) => { const b = (e.target as HTMLElement).closest("[data-i]") as HTMLElement | null; if (b && +b.dataset.i! !== this.cur) { this.cur = +b.dataset.i!; this.mark(false); } });
  }

  get isOpen() { return !this.el.classList.contains("hidden"); }
  open(query = "") {
    if (!this.isOpen) this.back = document.activeElement as HTMLElement | null;
    this.el.classList.remove("hidden"); this.input.value = query; this.cur = 0; this.paint(); this.input.focus();
  }
  close() { if (!this.isOpen) return; this.el.classList.add("hidden"); this.input.blur(); if (this.back && this.back !== document.body && this.back.isConnected) this.back.focus(); this.back = null; }
  toggle() { this.isOpen ? this.close() : this.open(); }

  private match(q: string): PalItem[] {
    const all = this.source(); const toks = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!toks.length) return all;
    const first = toks[0];
    const score = (it: PalItem) => { const l = it.label.toLowerCase(); return l.startsWith(first) ? 0 : new RegExp("\\b" + first.replace(/[^\w]/g, "\\$&")).test(l) ? 1 : l.includes(first) ? 2 : 3; };
    return all.filter((it) => toks.every((t) => it.hay.includes(t))).map((it, i) => ({ it, s: score(it), i })).sort((a, b) => a.s - b.s || a.i - b.i).map((x) => x.it);
  }

  private paint() {
    const found = this.match(this.input.value.trim());
    // Keep the kinds together so the list reads as three short sections.
    this.shown = ORDER.flatMap((k) => found.filter((it) => it.kind === k)).slice(0, 60);
    let html = "", last = "";
    this.shown.forEach((it, i) => {
      if (it.kind !== last) { html += `<div class="pal-h">${KIND[it.kind]}</div>`; last = it.kind; }
      html += `<button class="pal-it" role="option" id="palO${i}" data-i="${i}" tabindex="-1"><span class="nm"><b>${esc(it.label)}</b><small>${esc(it.sub)}</small></span>${it.tag ? `<span class="tag ${it.tagCls ?? ""}">${esc(it.tag)}</span>` : ""}</button>`;
    });
    this.listEl.innerHTML = html || `<p class="pal-none">Nothing matches. Try a story name, a group such as "use case", or a product such as "ISE".</p>`;
    this.countEl.textContent = found.length ? `${found.length} result${found.length === 1 ? "" : "s"}` : "";
    this.cur = Math.min(this.cur, Math.max(0, this.shown.length - 1));
    this.mark(true);
  }
  private move(d: number) { if (!this.shown.length) return; this.cur = (this.cur + d + this.shown.length) % this.shown.length; this.mark(true); }
  private mark(scroll: boolean) {
    this.listEl.querySelectorAll(".pal-it").forEach((b, i) => { b.classList.toggle("on", i === this.cur); b.setAttribute("aria-selected", String(i === this.cur)); if (i === this.cur && scroll) (b as HTMLElement).scrollIntoView({ block: "nearest" }); });
    if (this.shown.length) this.input.setAttribute("aria-activedescendant", `palO${this.cur}`); else this.input.removeAttribute("aria-activedescendant");
  }
  private pick(i: number) { const it = this.shown[i]; if (!it) return; this.back = null; this.close(); this.onPick(it); }
}
