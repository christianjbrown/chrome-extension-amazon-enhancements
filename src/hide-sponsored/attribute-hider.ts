// Marks a block as hidden. The page stylesheet does the hiding, so a block is
// never moved or removed, and Amazon's own scripts keep working on it.
import { HIDDEN_VALUE } from "./hidden-marker";
import type { Hider } from "./hider";

export class AttributeHider implements Hider {
  constructor(private readonly attribute: string) {}

  hide(block: Element): void {
    block.setAttribute(this.attribute, HIDDEN_VALUE);
  }
}
