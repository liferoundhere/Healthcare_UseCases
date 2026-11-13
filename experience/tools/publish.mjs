// Copy the single-file build next to the sources so it can be opened straight from the repository.
import { copyFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
const src = fileURLToPath(new URL("../dist/index.html", import.meta.url));
const dst = fileURLToPath(new URL("../healthcare-cloud-control.html", import.meta.url));
copyFileSync(src, dst);
console.log(`healthcare-cloud-control.html written (${(statSync(dst).size / 1024).toFixed(0)} kB). Open it directly in a browser; no server needed.`);
