// What the build produces and for which Chrome. Kept apart from build.mjs so
// a test can pin it to the manifest.
import { readFileSync } from "node:fs";

export const OUTPUT_DIR = "dist";
export const STATIC_DIR = "static";
export const CONTENT_ENTRY = "content";
export const CONTENT_SOURCE = "src/main.ts";

const manifest = JSON.parse(
  readFileSync(`${STATIC_DIR}/manifest.json`, "utf8"),
);

// The oldest Chrome the manifest allows is the oldest one the bundle targets.
export const BUILD_TARGET = `chrome${manifest.minimum_chrome_version}`;
