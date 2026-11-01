// A block is sponsored when it holds one of Amazon's ad markers. The marker is
// usually a small label or attribute deep inside it, so this climbs from the
// marker to the nearest enclosing block.
import type { SponsoredRule } from "./sponsored-rule";
import { within } from "./within";

export class LabelRule implements SponsoredRule {
  constructor(
    private readonly labels: string,
    private readonly container: string,
  ) {}

  blocks(root: Element): Element[] {
    return within(root, this.labels)
      .map((label) => label.closest(this.container))
      .filter((block) => block !== null);
  }
}
