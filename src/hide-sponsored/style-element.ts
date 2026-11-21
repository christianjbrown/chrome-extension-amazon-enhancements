// Adds one stylesheet to the page. It goes on the root element, because at
// document_start there is no head yet.
import type { PageStyle } from "./page-style";

const STYLE_TAG = "style";

export class StyleElement implements PageStyle {
  constructor(
    private readonly document: Document,
    private readonly css: string,
  ) {}

  install(): void {
    const style = this.document.createElement(STYLE_TAG);
    style.textContent = this.css;
    this.document.documentElement.append(style);
  }
}
