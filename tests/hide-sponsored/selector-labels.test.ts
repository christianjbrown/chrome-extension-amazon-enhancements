import { SelectorFinder } from "../../src/hide-sponsored/element-finder";
import { SelectorLabels } from "../../src/hide-sponsored/selector-labels";

describe("SelectorLabels", () => {
  it("returns the elements its selector matches, root included", () => {
    document.body.innerHTML = `<p class="label" id="a"><b class="label" id="b"></b><i></i></p>`;
    const labels = new SelectorLabels(new SelectorFinder(), ".label");

    const found = labels.labels(document.body.firstElementChild!);

    expect(found.map((label) => label.id)).toEqual(["a", "b"]);
  });
});
