import { TextLabelRule } from "../../src/hide-sponsored/text-label-rule";

const rule = new TextLabelRule(["Sponsored", "Gesponsert"], "span", ".card");

function ids(markup: string): string[] {
  document.body.innerHTML = markup;
  return rule.blocks(document.body).map((block) => block.id);
}

describe("TextLabelRule", () => {
  it("returns the card around a label that reads Sponsored in any listed language", () => {
    expect(
      ids(`
        <div class="card" id="en"><span>Sponsored</span></div>
        <div class="card" id="de"><span> gesponsert </span></div>`),
    ).toEqual(["en", "de"]);
  });

  it("needs the whole label to be the word, not just to contain it", () => {
    expect(
      ids(
        `<div class="card" id="title"><span>Sponsored by nobody, a cable</span></div>`,
      ),
    ).toEqual([]);
  });

  it("only looks at label elements", () => {
    expect(
      ids(`<div class="card" id="div"><div>Sponsored</div></div>`),
    ).toEqual([]);
  });

  it("ignores a label outside any card, and an empty one", () => {
    expect(
      ids(`<span>Sponsored</span><div class="card"><span></span></div>`),
    ).toEqual([]);
  });
});
