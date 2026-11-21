// A block is sponsored when it holds one of Amazon's ad labels. The label is
// usually small and deep inside it, so this climbs from each label to the
// nearest enclosing block.
import type { LabelFinder } from "./label-finder";
import type { SponsoredRule } from "./sponsored-rule";

export class LabelRule implements SponsoredRule {
  constructor(
    private readonly finder: LabelFinder,
    private readonly container: string,
  ) {}

  blocks(root: Element): Element[] {
    return this.finder
      .labels(root)
      .map((label) => label.closest(this.container))
      .filter((block) => block !== null);
  }
}
