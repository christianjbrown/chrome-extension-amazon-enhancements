import { SelectorFinder } from "../../src/hide-sponsored/element-finder";
import { TrimmedLowercase } from "../../src/hide-sponsored/text-normalizer";
import { WordLabels } from "../../src/hide-sponsored/word-labels";

const labels = new WordLabels(
  new SelectorFinder(),
  "span",
  ["Sponsored", "Gesponsert"],
  new TrimmedLowercase(),
);

function ids(markup: string): string[] {
  document.body.innerHTML = markup;
  return labels.labels(document.body).map((label) => label.id);
}

describe("WordLabels", () => {
  it("returns a label that reads Sponsored in any listed language", () => {
    expect(
      ids(`<span id="en">Sponsored</span><span id="de"> gesponsert </span>`),
    ).toEqual(["en", "de"]);
  });

  it("needs the whole label to be the word, not just to contain it", () => {
    expect(ids(`<span id="title">Sponsored by nobody, a cable</span>`)).toEqual(
      [],
    );
  });

  it("only looks at the elements its selector names", () => {
    expect(ids(`<div id="div">Sponsored</div>`)).toEqual([]);
  });

  it("ignores an empty label", () => {
    expect(ids(`<span id="empty"></span>`)).toEqual([]);
  });
});
