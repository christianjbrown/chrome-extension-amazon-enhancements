import {
  BUILD_TARGET,
  CONTENT_ENTRY,
  CONTENT_SOURCE,
  OUTPUT_DIR,
  STATIC_DIR,
} from "../scripts/build-config.mjs";
import manifest from "../static/manifest.json";

describe("build config", () => {
  it("targets the oldest Chrome the manifest allows", () => {
    expect(BUILD_TARGET).toBe(`chrome${manifest.minimum_chrome_version}`);
  });

  it("emits the script the manifest loads", () => {
    const [script] = manifest.content_scripts;
    expect(script!.js).toEqual([`${CONTENT_ENTRY}.js`]);
  });

  it("builds the content script from main.ts into dist", () => {
    expect(CONTENT_SOURCE).toBe("src/main.ts");
    expect(OUTPUT_DIR).toBe("dist");
    expect(STATIC_DIR).toBe("static");
  });
});
