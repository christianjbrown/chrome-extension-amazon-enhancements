// Hides every sponsored block a rule finds in or around a piece of the page.
import type { Hider } from "./hider";
import type { SponsoredRule } from "./sponsored-rule";

export interface Scanner {
  scan(root: Element): void;
}

export class SponsoredScanner implements Scanner {
  constructor(
    private readonly rule: SponsoredRule,
    private readonly hider: Hider,
  ) {}

  scan(root: Element): void {
    for (const block of this.rule.blocks(root)) this.hider.hide(block);
  }
}
