import { HIDDEN } from "../../src/hide-sponsored/hidden-marker";
import { AD_BLOCKS } from "../../src/hide-sponsored/sponsored-selectors";
import { SPONSORED_WORDS } from "../../src/hide-sponsored/sponsored-words";
import { hidingStylesheet } from "../../src/hide-sponsored/stylesheet";

describe("sponsored markers", () => {
  it("hides Amazon's ad slots and every marked block, whatever the page's own styles say", () => {
    const stylesheet = hidingStylesheet(AD_BLOCKS, HIDDEN);

    expect(stylesheet).toContain(".AdHolder");
    expect(stylesheet).toContain('[data-component-type="sp-sponsored-result"]');
    expect(stylesheet).toContain(`[${HIDDEN}]`);
    expect(stylesheet).toContain("display: none !important");
  });

  it("builds one rule from the blocks and the attribute it is given", () => {
    expect(hidingStylesheet([".a", ".b"], "data-x")).toBe(
      ".a,\n.b,\n[data-x] {\n  display: none !important;\n}\n",
    );
  });

  it("lists each word once", () => {
    const lower = SPONSORED_WORDS.map((word) => word.toLocaleLowerCase());
    expect(new Set(lower).size).toBe(lower.length);
  });
});
