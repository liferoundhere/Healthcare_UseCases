import type { IconKind } from "./icons";

export type Aud = "exec" | "dir" | "eng";
export type St = "ok" | "warn" | "down" | "pending" | "unknown" | "idle" | "off";

export interface NodeDef {
  id: string;
  x: number;
  y: number;
  icon: IconKind;
  title: string;
  sub: Record<Aud, string>;
  hidden?: boolean;
  r?: number;
}

export interface ZoneDef {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  hidden?: boolean;
  cisco?: boolean;
}

export interface LinkDef {
  id: string;
  a: string;
  b: string;
  bend: number;
}

export interface Fact {
  v: string;
  l: string;
  s: string;
}

export interface ModalDef {
  title: string;
  lines: string[];
  button: string;
}

export interface ClockDef {
  label: string;
  mode: "run" | "stop" | "hide";
  value?: string;
}

export interface StepDef {
  phase: "today" | "cisco";
  title: string;
  say: Record<Aud, string>;
  n?: Record<string, St>;
  l?: Record<string, St>;
  label?: Record<string, string>;
  show?: string[];
  hide?: string[];
  modal?: ModalDef;
  clock?: ClockDef;
  callout?: { node: string; text: string };
  focus?: { x: number; y: number; zoom: number };
  facts?: Fact[];
  chips?: [string, string][];
}

export interface SceneDef {
  id: string;
  group: "Flagship" | "Use case";
  title: string;
  pillars: string;
  subtitle: string;
  zones: ZoneDef[];
  nodes: NodeDef[];
  links: LinkDef[];
  steps: StepDef[];
  caveat: string;
}
