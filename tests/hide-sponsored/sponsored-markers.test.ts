import { HIDDEN } from "../../src/hide-sponsored/hidden-marker";
import { AD_BLOCKS } from "../../src/hide-sponsored/sponsored-selectors";
import { SPONSORED_WORDS } from "../../src/hide-sponsored/sponsored-words";
import {
  hidingStylesheet,
  STYLESHEET,
} from "../../src/hide-sponsored/stylesheet";

describe("sponsored markers", () => {
  it("hides Amazon's ad slots and every marked block, whatever the page's own styles say", () => {
    expect(STYLESHEET).toContain(".AdHolder");
    expect(STYLESHEET).toContain('[data-component-type="sp-sponsored-result"]');
    expect(STYLESHEET).toContain(`[${HIDDEN}]`);
    expect(STYLESHEET).toContain("display: none !important");
  });

  it("builds one rule from the blocks and the attribute it is given", () => {
    expect(hidingStylesheet([".a", ".b"], "data-x")).toBe(
      ".a,\n.b,\n[data-x] {\n  display: none !important;\n}\n",
    );
  });

  it("builds the page stylesheet from the ad blocks", () => {
    expect(STYLESHEET).toBe(hidingStylesheet(AD_BLOCKS, HIDDEN));
  });

  it("lists each word once", () => {
    const lower = SPONSORED_WORDS.map((word) => word.toLocaleLowerCase());
    expect(new Set(lower).size).toBe(lower.length);
  });
});
