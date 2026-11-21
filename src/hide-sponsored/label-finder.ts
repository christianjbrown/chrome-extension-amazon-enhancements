// Finds the ad labels in or around a piece of the page.
export interface LabelFinder {
  labels(root: Element): Element[];
}
