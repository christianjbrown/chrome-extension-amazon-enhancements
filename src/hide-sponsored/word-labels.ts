// The fallback for a label Amazon draws without its usual classes: an element
// whose whole text is the word for "Sponsored" in one of the storefronts'
// languages. The text has to match exactly, so a product with the word in its
// title is left alone.
import type { ElementFinder } from "./element-finder";
import type { LabelFinder } from "./label-finder";
import type { TextNormalizer } from "./text-normalizer";

export class WordLabels implements LabelFinder {
  private readonly words: Set<string>;

  constructor(
    private readonly finder: ElementFinder,
    private readonly selector: string,
    words: readonly string[],
    private readonly normalizer: TextNormalizer,
  ) {
    this.words = new Set(words.map((word) => normalizer.normalize(word)));
  }

  labels(root: Element): Element[] {
    return this.finder
      .find(root, this.selector)
      .filter((label) => this.isWord(label.textContent));
  }

  private isWord(text: string): boolean {
    return this.words.has(this.normalizer.normalize(text));
  }
}
