import { TrimmedLowercase } from "../../src/hide-sponsored/trimmed-lowercase";

describe("TrimmedLowercase", () => {
  it("ignores case and the space around a word", () => {
    expect(new TrimmedLowercase().normalize("  Gesponsert\n")).toBe(
      "gesponsert",
    );
  });
});
