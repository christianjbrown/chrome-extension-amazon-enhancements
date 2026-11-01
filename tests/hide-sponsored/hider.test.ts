import { AttributeHider } from "../../src/hide-sponsored/hider";

describe("AttributeHider", () => {
  it("marks the block with its attribute and leaves it in place", () => {
    document.body.innerHTML = `<div id="ad"></div>`;
    const block = document.getElementById("ad")!;

    new AttributeHider("data-hidden").hide(block);

    expect(block.getAttribute("data-hidden")).toBe("");
    expect(document.getElementById("ad")).toBe(block);
  });
});
