// Adds one stylesheet to the page. It goes on the root element, because at
// document_start there is no head yet.
export interface PageStyle {
  install(): void;
}

export class StyleElement implements PageStyle {
  constructor(
    private readonly document: Document,
    private readonly css: string,
  ) {}

  install(): void {
    const style = this.document.createElement("style");
    style.textContent = this.css;
    this.document.documentElement.append(style);
  }
}
