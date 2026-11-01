import type { SponsoredRule } from "../../src/hide-sponsored/sponsored-rule";
import { AnyRule } from "../../src/hide-sponsored/sponsored-rule";

function fixed(blocks: Element[]): SponsoredRule {
  return { blocks: () => blocks };
}

describe("AnyRule", () => {
  it("returns every rule's blocks, in order", () => {
    const [a, b, c] = ["a", "b", "c"].map((tag) => document.createElement(tag));
    const rule = new AnyRule([fixed([a!]), fixed([]), fixed([b!, c!])]);

    expect(rule.blocks(document.body)).toEqual([a, b, c]);
  });

  it("passes each rule the root it was given", () => {
    const inner = { blocks: vi.fn(() => []) };
    const root = document.createElement("div");

    new AnyRule([inner]).blocks(root);

    expect(inner.blocks).toHaveBeenCalledWith(root);
  });
});
