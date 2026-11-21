// Bundles the content script and copies the static files into dist/, which is
// the folder Chrome loads with "Load unpacked".
import { build } from "esbuild";
import { cp, mkdir, rm } from "node:fs/promises";
import {
  BUILD_TARGET,
  CONTENT_ENTRY,
  CONTENT_SOURCE,
  OUTPUT_DIR,
  STATIC_DIR,
} from "./build-config.mjs";

await rm(OUTPUT_DIR, { recursive: true, force: true });
await mkdir(OUTPUT_DIR, { recursive: true });
await build({
  entryPoints: { [CONTENT_ENTRY]: CONTENT_SOURCE },
  outdir: OUTPUT_DIR,
  bundle: true,
  format: "iife",
  target: BUILD_TARGET,
  minify: false,
  sourcemap: false,
  legalComments: "none",
  logLevel: "info",
});
await cp(STATIC_DIR, OUTPUT_DIR, { recursive: true });
