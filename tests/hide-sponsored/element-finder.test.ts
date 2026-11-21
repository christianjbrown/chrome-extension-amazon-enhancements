import { SelectorFinder } from "../../src/hide-sponsored/element-finder";

function html(markup: string): Element {
  const host = document.createElement("div");
  host.innerHTML = markup;
  return host.firstElementChild!;
}

describe("SelectorFinder", () => {
  it("includes the root when it matches, ahead of matches below it", () => {
    const root = html(`<p class="x"><b class="x"></b><i></i></p>`);

    expect(new SelectorFinder().find(root, ".x")).toEqual([
      root,
      root.firstElementChild,
    ]);
  });

  it("leaves the root out when it does not match", () => {
    const root = html(`<p><b class="x"></b></p>`);

    expect(new SelectorFinder().find(root, ".x")).toEqual([
      root.firstElementChild,
    ]);
  });
});
