# The renderer

About 1,600 lines of TypeScript on Canvas 2D, no runtime dependencies. Files are in `assets/starter/src/engine/`.

## Contents
1. Projections
2. Drawing primitives
3. Rooms and baking
4. The platform layer
5. Pins, links and labels
6. Camera and framing
7. Layouts
8. Drawing a new room

## 1. Projections (`iso.ts`)

World axes: x and z on the ground, y up. Two projections share every primitive:

- **Plan** (default): `screen = (x, z)`. Height is ignored; a box is its top face plus a soft offset shadow. Anything painted on a wall collapses to a coloured line along that wall, which is how windows, screens and signs still read from above.
- **Isometric** (`?view=iso`): `screen = ((x - z) * 0.866, (x + z) * 0.5 - y)`. A box shows three faces in three tones: top lightest, +z face mid, +x face darkest, with shadows shifted slightly cool.

`PLAN`, `proj()`, `EX` and `EY` (the screen radii of a ground circle) are the only places the projection is decided. The view is chosen at load from the URL, and switching reloads the page, so nothing has to migrate state between layouts.

## 2. Drawing primitives (`Pen`)

`box`, `cyl`, `disc`, `sph`, `poly`, `line`, `fz`/`fx` (rectangles on walls), `circ` (circle on a wall), `gtext` (text painted on the floor), `wtext` (text on a wall), `shadow`. `pen.at(x, z)` returns a pen with a local origin so a room is drawn in its own 9 x 9 coordinates. `tone(base)` returns the three-tone palette for a colour.

## 3. Rooms and baking (`rooms.ts`)

Each room is a function that queues draw calls with a depth key (`x + z`), so furniture sorts back to front. Rooms are baked to bitmaps at the current zoom and re-baked one per frame once the camera settles; while it moves, the bitmap is scaled. This keeps the picture sharp at rest and fast in motion, and makes dimming a room a single `globalAlpha`. Small moving details (LEDs, fans, ECG traces) are drawn live on top.

Rooms outside the current story are drawn at reduced alpha; active rooms get a glowing outline in the phase colour and a brighter floor label.

## 4. The platform layer (`platform.ts`)

A deck (where people and agents work) sitting on a data disc, domain tiles in orbit, data-layer items and third-party tiles on arcs, announced items as dashed outlines. Modes: `hidden`, `scattered` (today's separate consoles, each tethered to the room it manages) and `ring` (assembled). Items the story uses are lit and labelled. When everything is labelled (the explorer), data-layer and third-party items are called out in tidy columns with leader lines instead of fighting for space around the disc.

## 5. Pins, links and labels (`world.ts`, `pin.ts`)

- **Pins** are rounded tiles with a line icon at a fixed screen size, on a stem above a floor ring. White tiles are the customer's things; glass tiles in the brand colour are the product's. State changes the tile colour and adds a small badge.
- **Links** are quadratic curves between tiles with a dark casing (so they read over light floors), a glow, and moving dashes whose speed encodes state. Unknown is dotted grey; down is dashed red with a break marker.
- **Labels** are DOM elements positioned every frame, so text stays crisp and selectable. A de-clutter pass pushes overlapping labels apart vertically; crowded rooms and wide shots drop the second line.

## 6. Camera and framing

`stage.frame(points, { pad, maxS })` fits world points into the area the interface leaves free (`setSafe(top, bottom, left, right)`). For each beat the world frames the active pins, the rooms they stand in, and both ends of any live link between the deck and a room, so a decision and where it lands stay in one shot. Closing and approval beats reserve extra space on the right for the taller side column. Drag pans, wheel zooms about the pointer, double-click resets.

## 7. Layouts

- Plan: a wide band, 60 x 20 units. Two columns of rooms each side of a 16-unit court, the platform over the court, the outside world on the left, remote sites on the right. It matches the wide, short area above a lower-third caption, so the whole world shows at about 17 pixels per unit on a 1600 x 900 screen.
- Isometric: a 3 x 3 diamond with 11.6 units between room origins (9-unit rooms plus a lane), the platform above and behind the top corner.

If you change the interface so the free area has a different shape, change the layout to match it. A square grid under a lower third wastes half the screen.

## 8. Drawing a new room

Copy an existing room. Call `shell(r)` for floor and walls, then add furniture with the helpers (`bed`, `desk`, `rack`, `cabinet`, `chair`, `plantPot`, `person`, `monitorPole`). Keep furniture near the walls and the middle open. Use three or four accent colours at most. Add two to four people in role colours. Then look at it in both projections: a thin object that reads in isometric can vanish in plan, and a wall sign that reads on a wall becomes floor text in plan.
