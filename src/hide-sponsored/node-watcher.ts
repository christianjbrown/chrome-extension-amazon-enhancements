// Reports every element Amazon adds to the page, as the parser streams it in
// and as later results load. Text that arrives on its own is reported as its
// parent, since that is when a label first reads "Sponsored".
export interface Watcher {
  watch(changed: (element: Element) => void): void;
}

export type ObserverFactory = (callback: MutationCallback) => MutationObserver;

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;

function reportable(node: Node): Element | null {
  if (node.nodeType === ELEMENT_NODE) return node as Element;
  if (node.nodeType === TEXT_NODE && node.textContent?.trim())
    return node.parentElement;
  return null;
}

export class NodeWatcher implements Watcher {
  constructor(
    private readonly observe: ObserverFactory,
    private readonly root: Node,
  ) {}

  watch(changed: (element: Element) => void): void {
    this.observe((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          const element = reportable(node);
          if (element) changed(element);
        });
      }
    }).observe(this.root, { childList: true, subtree: true });
  }
}
