import type { SceneDef, St } from "./types";
import type { Staging } from "./staging";
import type { View } from "../engine/world";
import { ITEM } from "../data/catalog";

/** Fold steps 0..idx into the state the 3D world should show. Same cumulative rules as the 2D app. */
export function computeView(sc: SceneDef, st: Staging, idx: number): View {
  const ns = new Map<string, St>(), ls = new Map<string, St>(), vis = new Map<string, boolean>(), labels = new Map<string, string>();
  const nodeIds = new Set(sc.nodes.map((n) => n.id));
  for (let j = 0; j <= idx; j++) {
    const s = sc.steps[j];
    for (const [k, v] of Object.entries(s.n ?? {})) ns.set(k, v);
    for (const [k, v] of Object.entries(s.l ?? {})) ls.set(k, v);
    for (const k of s.show ?? []) vis.set(k, true);
    for (const k of s.hide ?? []) vis.set(k, false);
    for (const [k, v] of Object.entries(s.label ?? {})) { if (v) labels.set(k, v); else labels.delete(k); }
  }
  const step = sc.steps[idx];
  const active = new Set<string>();
  for (const k of Object.keys(step.n ?? {})) active.add(k);
  for (const k of step.show ?? []) active.add(k);
  for (const [k, v] of Object.entries(step.label ?? {})) if (v) active.add(k);
  for (const [k, v] of Object.entries(step.l ?? {})) if (v !== "off") { const l = sc.links.find((x) => x.id === k); if (l) { active.add(l.a); active.add(l.b); } }
  if (step.callout) active.add(step.callout.node);
  for (const k of [...active]) if (!nodeIds.has(k)) active.delete(k);

  const fx = step.fx ?? {};
  // A beat that looks only at the platform keeps the hospital pins quiet.
  if (fx.cam === "platform") { active.clear(); active.add("-"); }
  const cisco = step.phase === "cisco";
  const usesFabric = st.recipe.some((r) => ITEM.get(r)?.layer === "fabric" || r === "splunk" || r === "hospital");
  const last = idx === sc.steps.length - 1 || !!step.chips;
  const lit = new Set(fx.lit ?? (cisco ? st.recipe : []));
  return {
    ns, ls, vis, labels, active, callout: step.callout, phase: step.phase,
    platform: {
      mode: fx.platform ?? (cisco ? "ring" : "hidden"),
      fabric: fx.fabric ?? (cisco && usesFabric),
      cards: sc.id === "opening" && cisco && idx >= 5,
      partners: sc.id === "opening" && !!fx.fabric,
      ghosts: sc.id === "opening" && idx === sc.steps.length - 1,
      labels: fx.chipLabels ? "all" : cisco && last ? "lit" : "none",
      lit: sc.id === "opening" && !fx.lit ? new Set<string>() : lit,
      only: fx.labelLayers,
    },
    cam: fx.cam ?? "auto",
    zones: fx.zones ?? [],
    seed: idx + sc.id.length,
    withPlatform: cisco && last && !fx.cam,
  };
}
