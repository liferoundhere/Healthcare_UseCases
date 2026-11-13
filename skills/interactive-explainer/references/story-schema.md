# Story data model

Stories are data. The renderer never contains narrative, and the narrative never contains coordinates.

## Types (see `assets/starter/src/story/types.ts`)

```ts
type Aud = "exec" | "dir" | "eng";
type St = "ok" | "warn" | "down" | "pending" | "unknown" | "idle" | "off";

interface NodeDef { id; icon; title; sub: Record<Aud, string>; hidden?: boolean }
interface LinkDef { id: `${a}-${b}`; a; b; bend: number }
interface StepDef {
  phase: "today" | "cisco";            // rename the second phase for your product
  title: string;                        // the beat's headline
  say: Record<Aud, string>;             // one sentence, three audiences
  n?: Record<nodeId, St>;               // node states that change on this beat
  l?: Record<linkId, St>;               // link states that change
  label?: Record<nodeId, string>;       // override a node's sub line ("" clears it)
  show?: string[]; hide?: string[];     // reveal or remove nodes
  callout?: { node; text };             // a speech bubble on one node
  clock?: { label; mode: "run" | "stop" | "hide"; value? };
  modal?: { title; lines: string[]; button };   // the human approval
  facts?: { v; l; s }[];                // at most two sourced numbers
  chips?: [name, status][];             // closing beat: the combination and its availability
  fx?: { platform?, fabric?, lit?, chipLabels?, labelLayers?, cam?, zones? };  // staging directives
}
interface SceneDef { id; group; title; pillars; subtitle; nodes; links; steps; caveat; account? }
```

## Cumulative rules

`computeView(scene, staging, i)` folds steps 0..i:

- Node state defaults to `ok`; link state defaults to `idle`; a node is visible unless `hidden`.
- Each step overwrites only what it names. `hide` removes, `show` reveals.
- A node is "active" on a beat if the beat changes its state or label, shows it, calls it out, or changes a link that touches it. Active nodes are lit and labelled; the rest dim. This is the focus mechanism: write beats that touch few nodes.
- The clock persists until a later step hides it.
- A step with `modal` blocks "next" until approved.
- The platform is hidden in the first phase and assembled in the second, lighting the story's recipe.

## Staging (see `staging.ts`)

```ts
STAGING[sceneId] = {
  short: "EHR slow",                      // card label
  place: { nodeId: "ward" | "dc" | ... | "deck" },   // "deck" = on the platform
  recipe: ["canvas", "te", ...],          // catalog ids the story uses
  ask: "...", stays: "...",
};
```

Nodes that represent the product stand on the deck; everything else stands in a room. Up to six nodes per room are laid out automatically.

## Authoring checklist

- Five to seven beats. Three or four for today, two or three for the product.
- Every today beat is recognisable without the product. Name no vendor.
- The first product beat replays the event ("Same event. This time ...").
- One approval per story where a change could touch the core operation; say who approves and where the change executes.
- Two facts at most per beat, each with a short source tag. Put `, vendor-reported` in the tag when true.
- The closing beat has `chips` with honest status.
- The caveat says what is modeled and what stays with the customer.
- Run the check: it validates every node, link and catalog id you referenced.

## A complete beat, for shape

```ts
{
  phase: "today", title: "Five consoles, five partial truths",
  say: s(
    "Five teams each see one piece. Nobody can say how big the problem is, so the safe answer becomes: turn more things off.",
    "This is where the first hour goes. Every team spends it proving it is not them.",
    "SIEM, NAC, CMMS, firewall and EDR each hold a different identifier: alert ID, MAC, serial, 5-tuple, nothing.",
  ),
  show: ["soc", "nac", "biomed", "fw", "edr"],
  n: { soc: "warn", nac: "unknown", biomed: "unknown", fw: "warn", edr: "unknown" },
  l: { "soc-pump": "unknown", "nac-pump": "unknown", "biomed-pump": "unknown", "fw-pump": "unknown" },
  clock: { label: "Time to a shared picture", mode: "run" },
  facts: [{ v: "No benchmark", l: "Mean time to innocence: measure it locally", s: "Research gap" }],
}
```
