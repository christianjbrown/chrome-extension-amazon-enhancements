// The root itself, when it matches, followed by every match below it, since an
// added node can be the block or label it is looking for.
import type { ElementFinder } from "./element-finder";

export class SelectorFinder implements ElementFinder {
  find(root: Element, selector: string): Element[] {
    const below = Array.from(root.querySelectorAll(selector));
    return root.matches(selector) ? [root, ...below] : below;
  }
}
