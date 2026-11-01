// Finds the sponsored blocks in or around a piece of the page.
export interface SponsoredRule {
  blocks(root: Element): Element[];
}

// Every rule's blocks, in order, so main.ts can list them in one place.
export class AnyRule implements SponsoredRule {
  constructor(private readonly rules: SponsoredRule[]) {}

  blocks(root: Element): Element[] {
    return this.rules.flatMap((rule) => rule.blocks(root));
  }
}
