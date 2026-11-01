import manifestJson from "../static/manifest.json";

interface Manifest {
  content_scripts: {
    matches: string[];
    js: string[];
    run_at: string;
  }[];
}

const manifest: Manifest = manifestJson;

// Every storefront the extension this replaced covered, and the newer ones.
const storefronts = [
  "com",
  "ca",
  "com.mx",
  "com.br",
  "co.uk",
  "ie",
  "de",
  "fr",
  "it",
  "es",
  "nl",
  "com.be",
  "se",
  "pl",
  "com.tr",
  "ae",
  "sa",
  "eg",
  "in",
  "co.jp",
  "com.au",
  "sg",
  "cn",
  "co.za",
];

describe("manifest", () => {
  it("runs on every Amazon storefront, from the start of the page", () => {
    expect(manifest.content_scripts).toEqual([
      {
        matches: storefronts.map((tld) => `https://www.amazon.${tld}/*`),
        js: ["content.js"],
        run_at: "document_start",
      },
    ]);
  });

  // A content script and a stylesheet hide everything, which needs no
  // permission beyond the pages it runs on.
  it("asks for no permissions or host access", () => {
    expect(manifestJson).not.toHaveProperty("permissions");
    expect(manifestJson).not.toHaveProperty("host_permissions");
    expect(manifestJson).not.toHaveProperty("optional_permissions");
    expect(manifestJson).not.toHaveProperty("background");
  });

  it("has no toolbar button, options page or keyboard shortcut", () => {
    expect(manifestJson).not.toHaveProperty("action");
    expect(manifestJson).not.toHaveProperty("options_page");
    expect(manifestJson).not.toHaveProperty("options_ui");
    expect(manifestJson).not.toHaveProperty("commands");
  });
});
