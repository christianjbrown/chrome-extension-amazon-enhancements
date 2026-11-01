// The fallback for a label Amazon draws without its usual classes: an element
// whose whole text is the word for "Sponsored" in one of the storefronts'
// languages. The text has to match exactly, so a product with the word in its
// title is left alone.
import type { SponsoredRule } from "./sponsored-rule";
import { within } from "./within";

export class TextLabelRule implements SponsoredRule {
  private readonly words: Set<string>;

  constructor(
    words: string[],
    private readonly labels: string,
    private readonly container: string,
  ) {
    this.words = new Set(words.map((word) => word.toLocaleLowerCase()));
  }

  blocks(root: Element): Element[] {
    return within(root, this.labels)
      .filter((label) => this.isWord(label.textContent))
      .map((label) => label.closest(this.container))
      .filter((block) => block !== null);
  }

  private isWord(text: string): boolean {
    return this.words.has(text.trim().toLocaleLowerCase());
  }
}
