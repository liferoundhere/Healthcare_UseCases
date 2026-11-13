// Shared browser lookup for check.mjs, smoke.mjs and shoot.mjs.
// Order: the CHROME environment variable, then the usual install paths on Windows, macOS and Linux.
import { existsSync } from 'node:fs';

const known = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/snap/bin/chromium',
  '/usr/local/bin/google-chrome',
  '/opt/pw-browsers/chromium',
];

const fail = (msg) => { console.error(msg); process.exit(1); };

// Returns { executablePath, args } to spread into puppeteer.launch. Exits with a one-line message when no browser is found.
export function launchOptions(args = []) {
  const env = process.env.CHROME;
  if (env && !existsSync(env)) fail(`CHROME is set to "${env}" but no file exists there. Point CHROME at a Chrome, Chromium or Edge executable.`);
  const executablePath = env || known.find(existsSync);
  if (!executablePath) fail('No Chrome, Chromium or Edge found. Set CHROME to the path of the browser executable, for example CHROME=/usr/bin/chromium.');
  // Chromium refuses to start as root (the usual case in containers) unless the sandbox is off.
  return { executablePath, args: process.platform === 'win32' ? args : ['--no-sandbox', ...args] };
}
