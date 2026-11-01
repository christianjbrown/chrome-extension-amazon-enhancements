// Sponsored results, carousels and ad blocks disappear from Amazon's pages.
// The stylesheet goes in first, so a block marked while the page is still
// arriving is never drawn.
import type { Enhancement } from "../enhancement";
import type { Watcher } from "./node-watcher";
import type { PageStyle } from "./page-style";
import type { Scanner } from "./scanner";

export class HideSponsored implements Enhancement {
  constructor(
    private readonly page: Element,
    private readonly style: PageStyle,
    private readonly scanner: Scanner,
    private readonly watcher: Watcher,
  ) {}

  start(): void {
    this.style.install();
    this.scanner.scan(this.page);
    this.watcher.watch((element) => {
      this.scanner.scan(element);
    });
  }
}
