// Reports every element Amazon adds to the page.
export interface Watcher {
  watch(changed: (element: Element) => void): void;
}
