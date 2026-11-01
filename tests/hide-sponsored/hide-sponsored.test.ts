import { HideSponsored } from "../../src/hide-sponsored/hide-sponsored";

function setup() {
  const order: string[] = [];
  const page = document.createElement("html");
  const style = { install: vi.fn(() => order.push("style")) };
  const scanner = { scan: vi.fn(() => order.push("scan")) };
  let changed: (element: Element) => void = vi.fn();
  const watcher = {
    watch: vi.fn((callback: (element: Element) => void) => {
      order.push("watch");
      changed = callback;
    }),
  };
  new HideSponsored(page, style, scanner, watcher).start();
  return {
    order,
    page,
    scanner,
    changed: (element: Element) => {
      changed(element);
    },
  };
}

describe("HideSponsored", () => {
  it("installs the stylesheet before anything else, then scans the page and watches it", () => {
    const { order, page, scanner } = setup();

    expect(order).toEqual(["style", "scan", "watch"]);
    expect(scanner.scan).toHaveBeenCalledWith(page);
  });

  it("scans every element the watcher reports", () => {
    const { scanner, changed } = setup();
    const added = document.createElement("div");

    changed(added);

    expect(scanner.scan).toHaveBeenLastCalledWith(added);
  });
});
