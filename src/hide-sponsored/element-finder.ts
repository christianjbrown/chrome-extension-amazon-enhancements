// Finds the elements a selector matches in a piece of the page.
export interface ElementFinder {
  find(root: Element, selector: string): Element[];
}

// The root itself, when it matches, followed by every match below it, since an
// added node can be the block or label it is looking for.
export class SelectorFinder implements ElementFinder {
  find(root: Element, selector: string): Element[] {
    const below = Array.from(root.querySelectorAll(selector));
    return root.matches(selector) ? [root, ...below] : below;
  }
}
