// Every rule's blocks, in order, so main.ts can list them in one place. A
// block two rules both find is listed once, where it first appears.
import type { SponsoredRule } from "./sponsored-rule";

export class AnyRule implements SponsoredRule {
  constructor(private readonly rules: SponsoredRule[]) {}

  blocks(root: Element): Element[] {
    return [...new Set(this.rules.flatMap((rule) => rule.blocks(root)))];
  }
}
