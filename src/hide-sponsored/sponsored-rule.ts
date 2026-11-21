// Finds the sponsored blocks in or around a piece of the page.
export interface SponsoredRule {
  blocks(root: Element): Element[];
}
