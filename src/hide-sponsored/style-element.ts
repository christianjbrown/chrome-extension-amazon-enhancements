// Adds one stylesheet to the page. It goes on the root element, because at
// document_start there is no head yet.
import type { PageStyle } from "./page-style";

const STYLE_TAG = "style";

// The two parts of the page a stylesheet needs: a way to make the element,
// and the root to put it on.
export type StyleHost = Pick<Document, "createElement" | "documentElement">;

export class StyleElement implements PageStyle {
  constructor(
    private readonly page: StyleHost,
    private readonly css: string,
  ) {}

  install(): void {
    const style = this.page.createElement(STYLE_TAG);
    style.textContent = this.css;
    this.page.documentElement.append(style);
  }
}
