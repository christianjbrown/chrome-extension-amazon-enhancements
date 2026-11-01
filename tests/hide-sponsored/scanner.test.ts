import { SponsoredScanner } from "../../src/hide-sponsored/scanner";

describe("SponsoredScanner", () => {
  it("hides every block the rule finds in the root", () => {
    const [root, a, b] = ["div", "p", "p"].map((tag) =>
      document.createElement(tag),
    );
    const rule = { blocks: vi.fn(() => [a!, b!]) };
    const hider = { hide: vi.fn() };

    new SponsoredScanner(rule, hider).scan(root!);

    expect(rule.blocks).toHaveBeenCalledWith(root);
    expect(hider.hide.mock.calls).toEqual([[a], [b]]);
  });
});
