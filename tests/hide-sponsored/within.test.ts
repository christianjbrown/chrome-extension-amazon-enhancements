import { within } from "../../src/hide-sponsored/within";

function html(markup: string): Element {
  const host = document.createElement("div");
  host.innerHTML = markup;
  return host.firstElementChild!;
}

describe("within", () => {
  it("includes the root when it matches, ahead of matches below it", () => {
    const root = html(`<p class="x"><b class="x"></b><i></i></p>`);

    expect(within(root, ".x")).toEqual([root, root.firstElementChild]);
  });

  it("leaves the root out when it does not match", () => {
    const root = html(`<p><b class="x"></b></p>`);

    expect(within(root, ".x")).toEqual([root.firstElementChild]);
  });
});
