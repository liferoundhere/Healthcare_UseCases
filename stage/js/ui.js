// Shared UI state: the selected audience. Read by the HUD, the 3D tags, and the extras.
export const ui = {
  aud: 'exec',
  subs: [],
  set(a) { this.aud = a; this.subs.forEach((f) => f(a)); },
  on(f) { this.subs.push(f); },
};
export const AUD = [['exec', 'Executive'], ['dir', 'IT director'], ['eng', 'Engineering']];
