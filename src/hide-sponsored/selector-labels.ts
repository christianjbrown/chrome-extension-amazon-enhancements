// Labels Amazon marks with a known class or attribute.
import type { ElementFinder } from "./element-finder";
import type { LabelFinder } from "./label-finder";

export class SelectorLabels implements LabelFinder {
  constructor(
    private readonly finder: ElementFinder,
    private readonly selector: string,
  ) {}

  labels(root: Element): Element[] {
    return this.finder.find(root, this.selector);
  }
}
