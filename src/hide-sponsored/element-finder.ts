// Finds the elements a selector matches in a piece of the page.
export interface ElementFinder {
  find(root: Element, selector: string): Element[];
}
