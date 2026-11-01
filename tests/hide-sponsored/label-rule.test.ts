import { LabelRule } from "../../src/hide-sponsored/label-rule";

const rule = new LabelRule(".label, [data-ad]", ".card");

function page(markup: string): HTMLElement {
  document.body.innerHTML = markup;
  return document.body;
}

describe("LabelRule", () => {
  it("returns the card around each label", () => {
    const root = page(`
      <div class="card" id="one"><span class="label">Sponsored</span></div>
      <div class="card" id="two"><div><i data-ad></i></div></div>
      <div class="card" id="organic"><span>Great cable</span></div>`);

    expect(rule.blocks(root).map((block) => block.id)).toEqual(["one", "two"]);
  });

  it("returns the nearest card, so a label in a carousel card hides only that card", () => {
    const root = page(`
      <div class="card" id="carousel">
        <div class="card" id="ad"><span class="label">Sponsored</span></div>
        <div class="card" id="deal"></div>
      </div>`);

    expect(rule.blocks(root).map((block) => block.id)).toEqual(["ad"]);
  });

  it("climbs out of the root, for a label added inside a card already on the page", () => {
    page(`<div class="card" id="one"><p></p></div>`);
    const label = document.createElement("span");
    label.className = "label";
    document.querySelector("p")!.append(label);

    expect(rule.blocks(label).map((block) => block.id)).toEqual(["one"]);
  });

  it("ignores a label outside any card", () => {
    const root = page(`<span class="label">Sponsored</span>`);

    expect(rule.blocks(root)).toEqual([]);
  });
});
