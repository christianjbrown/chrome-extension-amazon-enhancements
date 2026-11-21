// Reports every element Amazon adds to the page, as the parser streams it in
// and as later results load. Text that arrives on its own is reported as its
// parent, since that is when a label first reads "Sponsored".
import { isElement } from "../node-guards";
import type { Watcher } from "./watcher";

// The one thing the watcher asks of a MutationObserver: to start watching.
interface NodeObserver {
  observe(target: Node, options: MutationObserverInit): void;
}

// Makes an observer that hands each batch of changes to the callback.
export type ObserverFactory = (
  callback: (records: MutationRecord[]) => void,
) => NodeObserver;

const TEXT_NODE = 3;

// Added nodes anywhere below the root, not attribute or text edits.
const OBSERVED_CHANGES: MutationObserverInit = {
  childList: true,
  subtree: true,
};

function reportable(node: Node): Element | null {
  return isElement(node) ? node : textParent(node);
}

// Text with words in it stands for its parent. Anything else is not reported.
function textParent(node: Node): Element | null {
  return isWordedText(node) ? node.parentElement : null;
}

function isWordedText(node: Node): boolean {
  return node.nodeType === TEXT_NODE && hasWords(node);
}

function hasWords(node: Node): boolean {
  return Boolean(node.textContent?.trim());
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
    }).observe(this.root, OBSERVED_CHANGES);
  }
}
