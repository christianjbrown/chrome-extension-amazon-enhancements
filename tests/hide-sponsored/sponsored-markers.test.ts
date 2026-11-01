import {
  HIDDEN,
  SPONSORED_WORDS,
  STYLESHEET,
} from "../../src/hide-sponsored/sponsored-markers";

describe("sponsored markers", () => {
  it("hides Amazon's ad slots and every marked block, whatever the page's own styles say", () => {
    expect(STYLESHEET).toContain(".AdHolder");
    expect(STYLESHEET).toContain('[data-component-type="sp-sponsored-result"]');
    expect(STYLESHEET).toContain(`[${HIDDEN}]`);
    expect(STYLESHEET).toContain("display: none !important");
  });

  it("lists each word once", () => {
    const lower = SPONSORED_WORDS.map((word) => word.toLocaleLowerCase());
    expect(new Set(lower).size).toBe(lower.length);
  });
});
