import { StyleElement } from "../../src/hide-sponsored/page-style";

describe("StyleElement", () => {
  it("adds its stylesheet to the root element, which exists before the head", () => {
    const doc = document.implementation.createHTMLDocument();
    doc.documentElement.replaceChildren();

    new StyleElement(doc, ".ad { display: none; }").install();

    const style = doc.documentElement.lastElementChild!;
    expect(style.tagName).toBe("STYLE");
    expect(style.textContent).toBe(".ad { display: none; }");
  });
});
