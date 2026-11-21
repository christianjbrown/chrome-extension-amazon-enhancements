import { isElement } from "../src/node-guards";

describe("isElement", () => {
  it("takes an element", () => {
    expect(isElement(document.createElement("div"))).toBe(true);
  });

  it("refuses text and comments", () => {
    expect(isElement(document.createTextNode("x"))).toBe(false);
    expect(isElement(document.createComment("x"))).toBe(false);
  });
});
